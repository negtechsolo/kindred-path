import {adminUser,json,sameOrigin,privateHeaders} from '../../../../lib/admin';
import {database} from '../../../../lib/records';
import {csvCell,feedbackLabels} from '../../../../lib/feedback-schema';
export async function GET(request:Request){
 if(!await adminUser())return json({error:'Please sign in again.'},401);
 const p=new URL(request.url).searchParams;const query=new URLSearchParams({select:'*,enquiry:kp_main_enquiries(name,email,phone)',order:'created_at.desc',limit:p.get('export')==='csv'?'1000':'50',offset:p.get('export')==='csv'?'0':String(Math.max(0,Math.min(100000,Math.floor(Number(p.get('page'))||0)))*50)});
 if(['registration','visit'].includes(p.get('kind')||''))query.set('kind',`eq.${p.get('kind')}`);
 if(['new','reviewed','follow_up','closed'].includes(p.get('status')||''))query.set('status',`eq.${p.get('status')}`);
 for(const [key,op]of [['from','gte'],['to','lte']]){const d=p.get(key);if(d&&/^\d{4}-\d{2}-\d{2}$/.test(d))query.append('created_at',`${op}.${d}T${key==='from'?'00:00:00':'23:59:59.999'}+01:00`);}
 if(p.get('service'))query.set('answers->>service',`eq.${p.get('service')!.slice(0,120)}`);
 try{const r=await database(`kp_main_feedback?${query}`,{headers:{Prefer:'count=exact'}});const records=await r.json();
 if(p.get('export')==='csv'){const keys=Object.keys(feedbackLabels);const rows=[['Received','Survey','Anonymous','Status','Notes','Enquiry name','Enquiry email','Enquiry phone',...keys.map(k=>feedbackLabels[k])],...records.map((x:Record<string,any>)=>[x.created_at,x.kind,x.anonymous,x.status,x.notes,x.enquiry?.name,x.enquiry?.email,x.enquiry?.phone,...keys.map(k=>x.answers[k])])];return new Response('\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n'),{headers:{...privateHeaders,'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="kindred-feedback.csv"'}});}
 const invitations=await (await database('kp_main_feedback_invites?select=id,kind,status,due_at,sent_at&order=due_at.desc&limit=50')).json();
 return json({records,total:Number(r.headers.get('content-range')?.split('/')[1])||0,invitations});
 }catch{return json({error:'Feedback is unavailable. Check the Supabase connection and run migrations/002_feedback.sql.'},503);}
}
export async function PATCH(request:Request){
 if(!sameOrigin(request))return json({error:'Invalid origin.'},403);const user=await adminUser();if(!user)return json({error:'Please sign in again.'},401);
 let b;try{b=await request.json();}catch{return json({error:'Invalid request.'},400);}
 if(!/^[0-9a-f-]{36}$/i.test(b.id||''))return json({error:'Invalid record.'},400);
 try{if(b.action==='attended'){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(b.visit_date||'')||!Number.isFinite(Date.parse(b.visit_date))||b.visit_date>new Date().toISOString().slice(0,10))return json({error:'Please select a valid visit date.'},400);
 await database('rpc/kp_main_attended',{method:'POST',body:JSON.stringify({record_id:b.id,visit_date:b.visit_date,actor_id:user.id})});
 }else{
 if(!['new','reviewed','follow_up','closed'].includes(b.status)||typeof b.notes!=='string'||b.notes.length>5000)return json({error:'Check the status and notes.'},400);
 await database(`kp_main_feedback?id=eq.${b.id}`,{method:'PATCH',body:JSON.stringify({status:b.status,notes:b.notes})});
 }return json({ok:true});}catch{return json({error:'The change could not be saved. Check the feedback database setup.'},503);}
}

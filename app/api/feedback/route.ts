import {createHash} from 'node:crypto';
import {json,sameOrigin} from '../../../lib/admin';
import {database} from '../../../lib/records';
import {validateFeedback} from '../../../lib/feedback-schema';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Invalid request origin.'},403);
 let raw:string;try{raw=await request.text();}catch{return json({error:'Invalid form.'},400);}if(raw.length>22000)return json({error:'The response is too long.'},413);
 let b:Record<string,unknown>,data:ReturnType<typeof validateFeedback>;
 try{b=JSON.parse(raw);data=validateFeedback(b);if(!/^[0-9a-f-]{36}$/i.test(String(b.submission_id))||(b.token&&!/^[0-9a-f-]{36}$/i.test(String(b.token))))throw Error('Invalid submission.');}catch(e){return json({error:e instanceof Error?e.message:'Please check your answers.'},400);}
 const answers=data.answers;
 // Generic registration links need an explicit contact; invitation links provide the enquiry association server-side.
 if(data.kind==='registration'&&!b.token&&!answers.email&&!answers.phone)return json({error:'Please provide your email or phone so we can match your enquiry.'},400);
 if(!data.anonymous&&answers.callback==='Yes'&&!b.token&&!answers.email&&!answers.phone)return json({error:'Please enter your contact details.'},400);
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
 const key=createHash('sha256').update(`${process.env.SUPABASE_SERVICE_ROLE_KEY}:${ip}:${new Date().toISOString().slice(0,13)}`).digest('hex');
 try{await database('rpc/kp_main_submit_feedback',{method:'POST',body:JSON.stringify({payload:{...data,submission_id:b.submission_id,token:data.anonymous?null:b.token||null},rate_key:`feedback:${key}`})});return json({ok:true});}
 catch{return json({error:'Your response was not saved. Please check your invitation is still valid and try again shortly, or contact the centre.'},503);}
}

import {timingSafeEqual} from 'node:crypto';
import {database} from '../../../../lib/records';
import {json} from '../../../../lib/admin';
import {sendFeedbackMail} from '../../../../lib/feedback-mail';
export const maxDuration=300;
export async function GET(request:Request){
 const expected=`Bearer ${process.env.CRON_SECRET||''}`,actual=request.headers.get('authorization')||'';
 if(!process.env.CRON_SECRET||actual.length!==expected.length||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return json({error:'Unauthorised'},401);
 if(process.env.FEEDBACK_EMAILS_ENABLED!=='true')return json({enabled:false});
 if(!process.env.RESEND_API_KEY||!process.env.ENQUIRY_FROM_EMAIL||!process.env.SITE_URL||!process.env.ADMIN_EMAIL)return json({error:'Feedback email configuration incomplete.'},503);
 try{
 const invites=await (await database('rpc/kp_main_claim_feedback',{method:'POST',body:'{}'})).json();let sent=0,failed=0;
 for(const inv of invites){try{
 const records=await (await database(`kp_main_enquiries?id=eq.${inv.enquiry_id}&select=email`)).json();const email=records[0]?.email;
 if(!email){await database(`kp_main_feedback_invites?id=eq.${inv.id}`,{method:'PATCH',body:JSON.stringify({status:'skipped'})});continue;}
 const link=`${process.env.SITE_URL.replace(/\/$/,'')}/feedback/${inv.kind}#invite=${inv.token}`;
 await sendFeedbackMail(email,inv.kind==='registration'?'Have we been in touch?':'Tell us about your care',`Thank you for contacting Kindred Path Fertility Centre, Institute of Fertility Medicine at LASUTH.\n\n${inv.kind==='registration'?'Has our team been in touch? Please share a short update about the support you received. This response will be linked to your enquiry so we can follow up.':'We would value your feedback about your visit. You can choose to submit anonymously.'}\n\nShare your feedback: ${link}\n\nTaking part is optional and will not affect your care. This is a one-time feedback invitation. If this does not apply to you, please disregard it.\n\nKindred Path Fertility Centre · IFM LASUTH`, `kp-feedback-${inv.id}`);
 await database(`kp_main_feedback_invites?id=eq.${inv.id}`,{method:'PATCH',body:JSON.stringify({status:'sent',sent_at:new Date().toISOString()})});sent++;
 }catch{failed++;await database(`kp_main_feedback_invites?id=eq.${inv.id}`,{method:'PATCH',body:JSON.stringify({status:'failed'})});}}
 // Staff notices contain no answers or personal details. Record an attempt before sending to avoid duplicate notices after an uncertain delivery.
 const notices=await (await database('kp_main_feedback?notified_at=is.null&select=id&limit=5')).json();
 for(const row of notices){try{await database(`kp_main_feedback?id=eq.${row.id}&notified_at=is.null`,{method:'PATCH',body:JSON.stringify({notified_at:new Date().toISOString()})});await sendFeedbackMail(process.env.ADMIN_EMAIL!, 'New private feedback received',`New feedback is available in your private workspace: ${process.env.SITE_URL}/admin/feedback`, `kp-feedback-notice-${row.id}`);await database(`kp_main_feedback?id=eq.${row.id}`,{method:'PATCH',body:JSON.stringify({notified_at:new Date().toISOString()})});}catch{/* Review uncertain notices in Resend; feedback remains saved in the dashboard. */}}
 return json({sent,failed});
 }catch{return json({error:'Feedback processing unavailable. Check database migration and configuration.'},503);}
}

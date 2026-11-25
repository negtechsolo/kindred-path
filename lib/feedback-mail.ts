export async function sendFeedbackMail(to:string,subject:string,text:string,key:string){
 if(!process.env.RESEND_API_KEY||!process.env.ENQUIRY_FROM_EMAIL)throw Error('Feedback mail is not configured');
 const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify({from:process.env.ENQUIRY_FROM_EMAIL,to:[to],subject,text}),signal:AbortSignal.timeout(10000)});
 if(!r.ok)throw Error('Feedback mail not accepted');
}

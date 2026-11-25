import {notFound} from 'next/navigation';
import {database} from '../../../lib/records';
import {FeedbackForm} from '../survey';
export default async function Page({params}:{params:Promise<{kind:string}>}){const {kind}=await params;if(kind!=='registration'&&kind!=='visit')notFound();let available=false;try{await database('kp_main_feedback?select=id&limit=0');available=true;}catch{}return <FeedbackForm kind={kind} available={available}/>;}

import {adminUser,authConfig} from '../../../lib/admin';
import {Login} from '../workspace';
import FeedbackWorkspace from './workspace';
import '../workspace.css';
import './style.css';
export const dynamic='force-dynamic';
export const metadata={title:'Private feedback',robots:{index:false,follow:false}};
export default async function Page(){return await adminUser()?<FeedbackWorkspace/>:<Login configured={!!authConfig()}/>;}

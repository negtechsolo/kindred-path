import type {Metadata} from 'next';
import './feedback.css';
export const metadata:Metadata={title:'Share your experience',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function Layout({children}:{children:React.ReactNode}){return children;}

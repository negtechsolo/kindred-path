import type { Metadata } from 'next';
import { adminUser, authConfig } from '../../lib/admin';
import { Dashboard, Login } from './workspace';
import './workspace.css';
export const metadata: Metadata = { title: 'Private workspace', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  const user = await adminUser();
  return user ? <Dashboard email={user.email}/> : <Login configured={!!authConfig()}/>;
}

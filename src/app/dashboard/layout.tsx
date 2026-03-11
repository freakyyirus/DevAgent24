import { createClient } from '@/lib/supabase/server';
import DashboardLayoutClient from './layout-client';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  // We use a Server Component wrapper to fetch the auth state, 
  // then pass it down to the Client Component layout
  const profile = {
    full_name: user?.user_metadata?.full_name || 'Demo User',
    avatar_url: user?.user_metadata?.avatar_url || '',
    email: user?.email || 'demo@example.com'
  };

  // Try to fetch custom profile extensions if user exists
  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single();
      
    if (profileData) {
      profile.full_name = profileData.full_name || profile.full_name;
      profile.avatar_url = profileData.avatar_url || profile.avatar_url;
    }
  }

  return <DashboardLayoutClient userProfile={profile}>{children}</DashboardLayoutClient>;
}

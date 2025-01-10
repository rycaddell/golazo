import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function DashboardPage() {
  console.log('Dashboard page loading...');
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Dashboard session check:', session ? 'Session exists' : 'No session found');

  if (!session) {
    console.log('No session, redirecting to home');
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Hello World!</h1>
        <p className="text-muted-foreground">
          Welcome, {session.user.email}! You are successfully logged in.
        </p>
      </div>
    </div>
  )
}


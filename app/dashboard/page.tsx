import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Logout from './_actions/logout';
import { auth } from '@/auth';
import { User } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  let user = undefined
  const session = await auth()
  
  if(session) {
    user = session.user
  } else {
    return redirect("/login")
  }

  return (
    <main className="container p-20 mx-auto text-center">
      <div>
        <h1 className="font-extrabold text-slate-600 dark:text-transparent text-7xl dark:bg-gradient-to-r dark:from-slate-50 dark:via-slate-400 dark:to-slate-200 bg-clip-text">
          Dashboard
        </h1>
        <h3 className="mt-4 font-bold text-muted-foreground">Boas vindas! - {user?.name ?? ''}</h3>
        {user?.email && (
          <p className="text-xs text-muted-foreground">email: {user.email}</p>
        )}
        <hr className="w-1/4 mx-auto mt-5 mb-16" />

        <section className='flex flex-wrap items-center justify-center gap-3'>
          <form action={Logout}>
            <Button>Logout</Button>
          </form>
          <Link href="/" className={cn(buttonVariants({variant: 'outline'}))}>Home</Link>
        </section>
      </div>
    </main>
  );
}

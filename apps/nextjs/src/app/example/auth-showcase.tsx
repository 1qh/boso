import { auth, signIn, signOut } from '@a/auth'
import { Button } from '@a/ui/button'

export const AuthShowcase = async () => {
  const session = await auth()

  if (!session)
    return (
      <form>
        <Button
          formAction={async () => {
            'use server'
            await signIn('google')
          }}
          size='lg'>
          Sign in with Google
        </Button>
      </form>
    )

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <p className='text-2xl text-center'>
        <span>Logged in as {session.user.name}</span>
      </p>
      <form>
        <Button
          formAction={async () => {
            'use server'
            await signOut()
          }}
          size='lg'>
          Sign out
        </Button>
      </form>
    </div>
  )
}

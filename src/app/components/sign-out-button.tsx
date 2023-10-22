'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton({ email }: { email: string }) {
  return (
    <>
      Signed in as {email} <br />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign Out
      </button>
    </>
  )
}

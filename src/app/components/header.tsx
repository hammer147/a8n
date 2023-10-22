import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import SignOutButton from './sign-out-button'
import SignInButton from './sign-in-button'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className='bg-gray-800 text-white px-4'>
      <nav className='flex justify-between items-center py-4'>
        <div>
          <Link href='/' className='text-2xl font-bold'>
            A8N
          </Link>
        </div>
        <ul className='flex'>
          <li className='ml-6'>
            <Link href='/' className='hover:text-gray-400'>
              Home
            </Link>
          </li>
          <li className='ml-6'>
            <Link href='/contact' className='hover:text-gray-400'>
              Contact
            </Link>
          </li>
        </ul>
        <div>
          {session ? (
            <SignOutButton email={session.user?.email ?? ''} />
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  )
}

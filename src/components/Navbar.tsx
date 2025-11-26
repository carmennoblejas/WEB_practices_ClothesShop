import {
  ArrowRightStartOnRectangleIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import NavbarButton from '@/components/NavbarButton'
import Link from 'next/link'
import { getSession } from '@/lib/auth'

export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className='fixed top-0 z-50 w-full bg-gray-950 bg-opacity-95 shadow-lg backdrop-blur-lg'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo + title */}
          <div className='flex items-center space-x-3'>
            {/* SVG bolso como logo */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-7 w-7 text-pink-200'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8 7V6a4 4 0 118 0v1m3 0a1 1 0 011 1v2.5a1 1 0 01-.13.5L18 20.5a2 2 0 01-1.87 1.25H7.87A2 2 0 016 20.5L3.13 11a1 1 0 01-.13-.5V8a1 1 0 011-1h16z'
              />
            </svg>
            <Link href='/' className='text-2xl font-serif tracking-wide text-pink-100 hover:text-white transition'>
              Bag Shop
            </Link>
          </div>

          {/* Botones */}
          <div className='flex items-center space-x-4'>
            {session ? (
              <>
                <NavbarButton href='/cart'>
                  <span className='sr-only'>Cart</span>
                  <ShoppingCartIcon className='h-6 w-6 text-gray-300 hover:text-white transition' />
                </NavbarButton>
                <NavbarButton href='/profile'>
                  <span className='sr-only'>User profile</span>
                  <UserIcon className='h-6 w-6 text-gray-300 hover:text-white transition' />
                </NavbarButton>
                <NavbarButton href='#'>
                  <span className='sr-only'>Sign out</span>
                  <ArrowRightStartOnRectangleIcon className='h-6 w-6 text-gray-300 hover:text-white transition' />
                </NavbarButton>
              </>
            ) : (
              <>
                <Link
                  href='/auth/signup'
                  className='rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition'
                >
                  Sign up
                </Link>
                <Link
                  href='/auth/signin'
                  className='rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition'
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

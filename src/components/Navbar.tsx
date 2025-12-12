import {
  ArrowRightStartOnRectangleIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import NavbarButton from '@/components/NavbarButton'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import NavbarSignOutButton from './NavbarSignOutButton'


export default async function Navbar() {
  const session = await getSession()

  return (
    <nav className='fixed top-0 z-50 w-full bg-background dark:bg-background-dark bg-opacity-95 dark:bg-opacity-95 shadow-lg backdrop-blur-lg border-b border-border-light dark:border-border-dark'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-10'>
        <div className='flex h-16 items-center justify-between'>
          
          <div className='flex items-center space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-7 w-7 text-secondary dark:text-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8 7V6a4 4 0 118 0v1m3 0a1 1 0 011 1v2.5a1 1 0 01-.13.5L18 20.5a2 2 0 01-1.87 1.25H7.87A2 2 0 016 20.5L3.13 11a1 1 0 01-.13-.5V8a1 1 0 011-1h16z'
              />
            </svg>
            <Link href='/' className='text-2xl font-serif tracking-wide text-text-main dark:text-text-dark-main hover:text-secondary dark:hover:text-accent transition'>
              Bag Shop
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
            <ThemeSwitcher />

            {session ? (
              <>
                <NavbarButton href='/cart'>
                  <span className='sr-only'>Cart</span>
                  <ShoppingCartIcon className='h-6 w-6 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main transition' />
                </NavbarButton>
                <NavbarButton href='/profile'>
                  <span className='sr-only'>User profile</span>
                  <UserIcon className='h-6 w-6 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main transition' />
                </NavbarButton>
                <NavbarSignOutButton href='Signed out'>
                  <span className='sr-only'>Sign out</span>
                  <ArrowRightStartOnRectangleIcon className='h-6 w-6 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main transition' />
                </NavbarSignOutButton>
              </>
            ) : (
              <>
                <Link
                  href='/auth/signup'
                  className='rounded-md px-4 py-2 text-sm font-medium text-text-muted dark:text-text-dark-muted hover:bg-background-secondary dark:hover:bg-background-dark-secondary hover:text-text-main dark:hover:text-text-dark-main transition'
                >
                  Sign up
                </Link>
                <Link
                  href='/auth/signin'
                  className='rounded-md px-4 py-2 text-sm font-medium text-text-muted dark:text-text-dark-muted hover:bg-background-secondary dark:hover:bg-background-dark-secondary hover:text-text-main dark:hover:text-text-dark-main transition'
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

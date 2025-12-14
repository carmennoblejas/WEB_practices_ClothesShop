'use client'

import SignInForm from '@/components/SignInForm'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black px-6 py-12 text-gray-800 dark:text-yellow-300">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V6a4 4 0 118 0v1m3 0a1 1 0 011 1v2.5a1 1 0 01-.13.5L18 20.5a2 2 0 01-1.87 1.25H7.87A2 2 0 016 20.5L3.13 11a1 1 0 01-.13-.5V8a1 1 0 011-1h16z"
            />
          </svg>
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-gray-800 dark:text-gray-300 hover:text-yellow-400 transition"
          >
            ESSENZA
          </Link>
        </div>

        <h2 className="mt-10 text-center text-3xl font-extrabold tracking-tight text-gray-800 dark:text-yellow-300">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          to access your wishlist and orders
        </p>
      </div>
     
      <div className="mt-10 w-full max-w-sm">
        <SignInForm />
      </div>
     <div className="mt-6 text-sm font-medium text-gray-700 dark:text-gray-300">
  <span className="mr-1">You don&apos;t have an account yet?</span>
  <Link
    href="/auth/signup"
    className="font-semibold text-neutral-400 dark:text-yellow-400 hover:text-neutral-600 dark:hover:text-yellow-300 transition"
  >
    Sign up in here
  </Link>
</div>

    </div>
  )
}

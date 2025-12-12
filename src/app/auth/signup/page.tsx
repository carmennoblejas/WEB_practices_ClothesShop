'use client'

import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-yellow-300 px-6 py-12 transition-colors">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 text-secondary dark:text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V6a4 4 0 118 0v1m3 0a1 1 0 011 1v2.5a1 1 0 01-.13.5L18 20.5a2 2 0 01-1.87 1.25H7.87A2 2 0 016 20.5L3.13 11a1 1 0 01-.13-.5V8a1 1 0 011-1h16z"
            />
          </svg>
          <Link
            href="/"
            className="text-2xl font-serif tracking-wide text-text-main dark:text-gray-300 hover:text-secondary dark:hover:text-gray-400 transition"
          >
            Bag Shop
          </Link>
        </div>

        <h2 className="mt-10 text-center text-3xl font-extrabold tracking-tight text-text-main dark:text-yellow-300">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-500">
          and start collecting your dream bags
        </p>
      </div>

      <div className="mt-10 w-full max-w-sm">
        <SignUpForm />

        <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-500">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="font-semibold text-neutral-400 dark:text-yellow-400 hover:text-neutral-600 dark:hover:text-yellow-300 transition"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

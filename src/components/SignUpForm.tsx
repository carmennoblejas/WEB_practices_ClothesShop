'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormValues {
  email: string
  password: string
  name: string
  surname: string
  birthdate: string
  address: string // ✅ nuevo campo
}

export default function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    name: '',
    surname: '',
    birthdate: '',
    address: '', // ✅ inicializar campo
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) return

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      const data = await res.json()

      if (res.ok) {
        setError('')
        router.push('/')
        router.refresh()
      } else {
        if (data?.error === 'SIGNUP_FAIL') {
          setError(data.message || 'E-mail already exists.')
        } else {
          setError('Unexpected error. Please try again.')
        }
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Network error. Please try again.')
    }
  }

  return (
    <form className='group space-y-6' onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div>
        <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='John'
          required
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* Surname */}
      <div>
        <label htmlFor='surname' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          Surname
        </label>
        <input
          id='surname'
          name='surname'
          type='text'
          placeholder='Doe'
          required
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.surname}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, surname: e.target.value }))
          }
        />
      </div>

      {/* Birthdate */}
      <div>
        <label htmlFor='birthdate' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          Birthdate
        </label>
        <input
          id='birthdate'
          name='birthdate'
          type='date'
          required
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.birthdate}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor='address' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          Address
        </label>
        <input
          id='address'
          name='address'
          type='text'
          placeholder='123 Main St, City, Country'
          required
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.address}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          E-mail address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          placeholder='johndoe@example.com'
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          placeholder='********'
          className='peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white'
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      {/* Error */}
      {error && (
        <p className='mt-2 text-sm text-red-500'>{error}</p>
      )}

      {/* Submit */}
      <button
        type='submit'
        className='mt-6 w-full bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-gray-400 dark:hover:bg-gray-500 dark:text-black px-6 py-3 rounded font-semibold shadow-md transition'
      >
        Sign up
      </button>
    </form>
  )
}

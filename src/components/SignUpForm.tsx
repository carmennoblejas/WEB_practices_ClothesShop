'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormValues {
  email: string
  password: string
  name: string
  surname: string
  birthdate: string
  address: string 
}

export default function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false) // cuando mostrar errores

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    name: '',
    surname: '',
    birthdate: '',
    address: '', 
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true) // marcamos que se intento enviar

    if (!event.currentTarget.checkValidity()) {
      setError('Please fill in all required fields correctly.')
      return
    }

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
        router.push('/auth/signin')
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

  // clase base para inputs
  const inputClasses = `peer mt-2 block w-full rounded-md border-0 bg-white dark:bg-zinc-800 px-1.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary dark:focus:ring-accent sm:text-sm sm:leading-6 ${
    isSubmitted ? 'invalid:ring-red-500' : ''
  }`

  return (
    <form className='group space-y-6' onSubmit={handleSubmit} noValidate>
      
      <div>
        <label htmlFor='name' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          Name
        </label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='John'
          required
          className={inputClasses}
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
          {isSubmitted && !formValues.name && "Name is required"}
        </p>
      </div>

      <div>
        <label htmlFor='surname' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          Surname
        </label>
        <input
          id='surname'
          name='surname'
          type='text'
          placeholder='Doe'
          required
          className={inputClasses}
          value={formValues.surname}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, surname: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
          {isSubmitted && !formValues.surname && "Surname is required"}
        </p>
      </div>

      <div>
        <label htmlFor='birthdate' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          Birthdate
        </label>
        <input
          id='birthdate'
          name='birthdate'
          type='date'
          required
          className={inputClasses}
          value={formValues.birthdate}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
          {isSubmitted && !formValues.birthdate && "Birthdate is required"}
        </p>
      </div>

      <div>
        <label htmlFor='address' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          Address
        </label>
        <input
          id='address'
          name='address'
          type='text'
          placeholder='123 Main St, City, Country'
          required
          className={inputClasses}
          value={formValues.address}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, address: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
          {isSubmitted && !formValues.address && "Address is required"}
        </p>
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          E-mail address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          placeholder='johndoe@example.com'
          className={inputClasses}
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
           {isSubmitted && !formValues.email && "Valid email is required"}
        </p>
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium leading-6 text-text-main dark:text-text-dark-main'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          minLength={6}
          placeholder='********'
          className={inputClasses}
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p className="mt-1 hidden text-xs text-red-500 peer-invalid:block">
          {isSubmitted && !formValues.password && "Password is required (min 6 chars)"}
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className='text-sm text-red-600 dark:text-red-400 text-center font-medium'>{error}</p>
        </div>
      )}

      <button
        type='submit'
        className='mt-6 w-full bg-primary hover:bg-primary-hover text-white dark:text-text-dark-main font-bold py-3 rounded-lg transition duration-300 shadow-md'
      >
        Sign up
      </button>
    </form>
  )
}

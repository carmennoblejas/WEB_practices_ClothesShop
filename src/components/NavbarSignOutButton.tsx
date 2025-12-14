'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface NavbarSignOutButtonProps {
  children: ReactNode;
  href?: string; // Lo definimos opcional para que no de error en Navbar.tsx
}

export default function NavbarSignOutButton({ children }: NavbarSignOutButtonProps) {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (res.ok) {
        router.push('/auth/signin'); 
        router.refresh();
      } else {
        console.error('Sign-out failed');
      }
    } catch (error) {
      console.error('Error during sign-out', error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full p-2 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main focus:text-text-main dark:focus:text-text-dark-main focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition"
    >
      {children}
    </button>
  );
}

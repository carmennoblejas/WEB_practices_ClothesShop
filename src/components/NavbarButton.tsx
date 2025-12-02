import { ReactNode } from 'react'
import Link from 'next/link'

export const navbarButtonClasses =
  'rounded-full p-2 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main focus:text-text-main dark:focus:text-text-dark-main focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition';

interface NavbarButtonProps {
  href: string;
  children: ReactNode;
}

export default function NavbarButton({ href, children }: NavbarButtonProps) {
  return (
    <Link href={href} className={navbarButtonClasses}>
      {children}
    </Link>
  )
}
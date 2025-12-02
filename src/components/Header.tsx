export default function Header() {
  return (
    <header className='mx-auto w-full bg-background-secondary dark:bg-background-dark-secondary px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32 border-b border-border-light dark:border-border-dark'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='text-6xl font-bold text-text-main dark:text-text-dark-main sm:text-7xl lg:text-8xl'>
          ESSENZA
        </h1>
        <p className='mt-4 text-sm leading-8 text-text-muted dark:text-text-dark-muted sm:mt-6 sm:text-base lg:text-lg'>
          Your perfect shop to find your dream bag
        </p>
      </div>
    </header>
  )
}
'use client'

import { useEffect, useState } from 'react'

export default function SampleClientComponent() {
  const [leftCount, setLeftCount] = useState(0)
  const [rightCount, setRightCount] = useState(0)

  /*useEffect(() =>
    alert("Component rendered!")
  )*/

  /*useEffect(() =>
    alert("Component rendered!")
  , [])*/

   /*useEffect(() =>
    alert("Component rendered!")
  , [leftCount])*/
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://get.geojs.io/v1/ip/country.json')
      const json = await data.json()
  
      if (data?.ok) {
        console.log(json)
      } else {
        // Handle error
      }
    }
  
    fetchData()
      .catch(console.error)
  }, [])

  function handleLeftClick() {
    setLeftCount((count) => count + 1)
  }

  function handleRightClick() {
    setRightCount((count) => count + 1)
  }

  return (
    <div className="space-y-4">
      <p className="text-text-main dark:text-text-dark-main">
        You clicked {leftCount} and {rightCount} times
      </p>
      <div className="flex gap-3">
        <button
          className='rounded-md bg-primary hover:bg-primary-hover px-4 py-2 text-center text-white dark:text-text-dark-main font-medium transition'
          onClick={handleLeftClick}
        >
          Left button
        </button>
        <button
          className='rounded-md bg-secondary hover:bg-secondary-hover px-4 py-2 text-center text-white dark:text-text-dark-main font-medium transition'
          onClick={handleRightClick}
        >
          Right button
        </button>
      </div>
    </div>
  )
}
import MainNav from '@/components/navigation/MainNav'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div className='h-full  '>
        <div
        className='hidden md:flex h-full w-[72px] fixed left-0 z-50'
        >
            <MainNav />
        </div>
        <main className='md:pl-[72px]'>
             {children}
             </main>
       
    </div>
  )
}

export default layout
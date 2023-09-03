import React from 'react'

type Props = {
    children:React.ReactNode
}

const authLayout = ({children}: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
        {children}
    </div>
  )
}


export default authLayout
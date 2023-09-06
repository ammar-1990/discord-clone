import React from 'react'

type Props = {
    params:{serverId:string}
}

const page = ({params}: Props) => {
    const serverId = params.serverId
  return (

   
    <div>{serverId}</div>
  )
}

export default page
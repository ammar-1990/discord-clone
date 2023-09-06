'use client'


import React from 'react'
import ActionTooltip from '../action-tooltip'
import {useRouter,useParams} from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
    id:string,
    name:string,
    imageUrl:string
}

const ItemNav = ({id,name,imageUrl}: Props) => {
    const router = useRouter()
    const params = useParams()
    console.log(params.serverId===id)
  return (
<ActionTooltip label={name} side='right' align='center'>
<button onClick={()=>router.push(`/servers/${id}`)} className='group relative flex items-center  '>
    <div className={cn('absolute left-0   bg-primary w-[4px] rounded-r-full duration-150',
     params?.serverId === id ? "h-[36px]" : 'h-[8px]',
      params.serverId !== id && 'group-hover:h-[20px]')} />
      <div className={cn('relative w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[19px] mx-3 duration-150 ',params.serverId===id && 'bg-primary/10 text-primary rounded-[16px]')}>
        <Image fill src={imageUrl} alt='server-img' />
      </div>

   


</button>
</ActionTooltip>
  )
}

export default ItemNav
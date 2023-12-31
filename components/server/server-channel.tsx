'use client'


import { cn } from '@/lib/utils'
import { ChanelType, Channel, MemberRole,Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import ActionTooltip from '../action-tooltip'
import { modalType, useModal } from '@/app/hooks/useModal'

type Props = {
    channel:Channel,
    server:Server,
    role?:MemberRole
}

const ServerChannel = ({channel,server,role}: Props) => {

    const {openModal} = useModal()

    const iconMap = {
        [ChanelType.TEXT]:Hash ,
        [ChanelType.AUDIO]:Mic,
        [ChanelType.VIDEO]:Video 
        }
const router = useRouter()
const params = useParams()

const Icon = iconMap[channel.type]

const onClick = ()=>{
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
}


const onAction = (e:React.MouseEvent,action:modalType)=>{
    openModal(action,{channel,server});
    e.stopPropagation()


}

  return (
<button
onClick={onClick}
className={cn('group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700')}
>
    <Icon className='flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400' />
    <p className={cn('line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',params?.channelId === channel.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white')}>{channel.name}</p>
    {channel.name !=='general' && role !=='GUEST' && (
        <div className='ml-auto flex items-center gap-x-2'>
            <ActionTooltip label='Edit'>
                <Edit onClick={(e)=>onAction(e,'edit-channel')} className='hidden group-hover:block w-4 h-4 text-zinc-500 hover-text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition ' />

            </ActionTooltip>
            <ActionTooltip label='Delete'>
                <Trash onClick={(e)=>onAction(e,'channel-delete')} className='hidden group-hover:block w-4 h-4 text-zinc-500 hover-text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition ' />

            </ActionTooltip>

        </div>
    
    )}
        {channel.name === 'general' && <Lock className='ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400' />}

</button>
  )
}

export default ServerChannel
import { Hash, Menu } from 'lucide-react'
import React from 'react'
import MobileToggle from '../mobile-toggle'
import MemberAvatar from '../MemberAvatar'

type Props = {
    serverId:string,
    name:string,
    type: "channel" | "conversation",
    imageUrl?:string
}

const ChatHeader = ({serverId,name,type,imageUrl}: Props) => {
  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
<MobileToggle serverId={serverId} />
        {type === 'channel' && <Hash className='w-5 h-5 text-zinc-500  dark:text-zinc-400 mr-2' />}
        {type ==='conversation' && <MemberAvatar src={imageUrl} className='w-8 h-8 mr-2' />}
        <p className={`font-semibold text-black text-md dark:text-white ${type ==='conversation' && 'capitalize'}`}>{name}</p>
    </div>
  )
}

export default ChatHeader
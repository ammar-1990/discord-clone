'use client'

import { ServerWithMembersAndProfiles } from '@/types'
import { ChanelType, MemberRole } from '@prisma/client'
import React from 'react'
import ActionTooltip from '../action-tooltip'
import { Plus, Settings } from 'lucide-react'
import { useModal } from '@/app/hooks/useModal'

type Props = {
    label:string,
    role?:MemberRole,
    sectionType:'channels' | "members",
    channelType?:ChanelType,
    server?:ServerWithMembersAndProfiles

}

const ServerSection = ({label,role,sectionType,channelType,server}: Props) => {
const {openModal} = useModal()


  return (
    <div className='flex items-center justify-between py-2'>
        <p className='text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold'>{label}</p>
        {role==="ADMIN" && sectionType==='channels' &&(
            <ActionTooltip label='Create channel' side='top'>
                <button onClick={()=>openModal('channel',{server})} className='text-zinc-500 hover:text-zinc-600  dark:text-zinc-400 dark:hover:text-zinc-300 transition'>
                <Plus className='w-4 h-4 ' />
                </button>
               

            </ActionTooltip>
        )}
        {role==="ADMIN" && sectionType==='members' &&(
            <ActionTooltip label='Manage members' side='top'>
                <button onClick={()=>openModal('manage',{server})} className='text-zinc-500 hover:text-zinc-600  dark:text-zinc-400 dark:hover:text-zinc-300 transition'>
                <Settings className='w-4 h-4 ' />
                </button>
               

            </ActionTooltip>
        )}

    </div>
  )
}

export default ServerSection
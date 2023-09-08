'use client'
import { ServerWithMembersAndProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronDown, LogOut, PlusCircle, Settings, TrashIcon, UserPlus, Users } from 'lucide-react'
import { useModal } from '@/app/hooks/useModal'

type Props = {
    server:ServerWithMembersAndProfiles,
    role?:MemberRole
}

const ServerHeader = ({server,role}: Props) => {
const isAdmin = role ===MemberRole.ADMIN
const isModerater = isAdmin || role===MemberRole.MODERATOR 
const {openModal} = useModal()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='focus:outline-none'>
            <button className='flex text-md font-semibold items-center w-full px-3 border-b-2 border-neutral-200  dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition h-12 '>
{server.name}
<ChevronDown className='h-5 w-5 ml-auto' />
            </button>

        </DropdownMenuTrigger >
        <DropdownMenuContent 
        className='w-56 text-sm font-medium text-black dark:text-neutral-400 spac-y-[2px]'
        >
            {isModerater && <DropdownMenuItem onClick={()=>{openModal('invite',{server})}} className='text-indigo-600 dark:text-indigo-400 px-3 py-2 cursor-pointer text-sm'>
                Invite People
                <UserPlus  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem onClick={()=>{openModal('edit',{server})}} className=' px-3 py-2 cursor-pointer text-sm'>
               Server Settings
                <Settings  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem className=' px-3 py-2 cursor-pointer text-sm'>
               Manage Members
                <Users  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}
            {isModerater && <DropdownMenuItem className=' px-3 py-2 cursor-pointer text-sm'>
               Create Channel
                <PlusCircle  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}
            {isModerater && <DropdownMenuSeparator />}

            {isAdmin && <DropdownMenuItem className='text-rose-500 px-3 py-2 cursor-pointer text-sm'>
               Delete Server
                <TrashIcon  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}
            {!isAdmin && <DropdownMenuItem className=' px-3 py-2 cursor-pointer text-sm'>
              Leave Server
                <LogOut  className='w-4 h-4 ml-auto'/>
                </DropdownMenuItem>}

               

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader
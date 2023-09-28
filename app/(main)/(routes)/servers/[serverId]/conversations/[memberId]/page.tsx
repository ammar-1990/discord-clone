import ChatHeader from '@/components/chat/chat-header'
import ChatMessages from '@/components/chat/chat-messages'
import { currentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import { getOrCreateConversation } from '@/lib/find-conversation'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
params: { serverId:string,
  memberId:string}
}

const page = async ({params}: Props) => {
const {serverId,memberId} = params
const profile = await currentUser()

if(!profile) return redirectToSignIn()


const currentMember = await db.member.findFirst({
  where:{
    serverId,
    profileId:profile.id
  },
  include:{profile:true}
})

if(!currentMember) return redirect('/')

const conversation = await getOrCreateConversation(currentMember.id,memberId)

if(!conversation) return redirect(`/servers/${serverId}`)

const {memberOne, memberTwo} = conversation


const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
<ChatHeader name={otherMember.profile.name} serverId={serverId} type='conversation' imageUrl={otherMember.profile.imgUrl}  />


    </div>
  )
}

export default page
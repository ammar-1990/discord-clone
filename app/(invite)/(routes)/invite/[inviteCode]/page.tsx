import { currentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {params:{inviteCode:string}}

const page =async ({params}: Props) => {
const profile = await currentUser()

if(!profile) return redirectToSignIn()

if(!params.inviteCode) return redirect('/')

const isInServer = await db.server.findFirst({
    where:{
        inviteCode:params.inviteCode,
        members:{
            some:{
                profileId:profile.id
            }
        }
    }
})

if(isInServer)return redirect(`/servers/${isInServer.id}`)

const server = await db.server.update({
    where:{
        inviteCode:params.inviteCode
    },
    data:{
        members:{
            create:[{profileId:profile.id}]
        }
    }
})
if(server) return redirect(`/servers/${server.id}`)

  return null
}

export default page
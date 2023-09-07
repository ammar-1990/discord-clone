import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
import { ChanelType } from "@prisma/client"
import {redirect} from 'next/navigation'
import ServerHeader from "./server-header"


type Props = {
    serverId:string
}

const ServerSidebar =async ({serverId}: Props) => {
const profile = await currentUser()
const server = await db.server.findUnique({
    where:{
        id:serverId,
        
    },
    include:{
        members:{
            include:{
                profile:true
            },
            orderBy:{
                role:'asc'
            }
        },
        channels:{
            orderBy:{
                createdAt:'asc'
            }
        }
    }
})


const textChannels = server?.channels.filter((channel)=>channel.type===ChanelType.TEXT)
const audioChannels = server?.channels.filter((channel)=>channel.type===ChanelType.AUDIO)
const videoChannels = server?.channels.filter((channel)=>channel.type===ChanelType.VIDEO)

const members = server?.members.filter((member)=>member.profileId !==profile?.id)

if(!server) return redirect('/')

const role = server.members.find((member)=>member.profileId === profile?.id)?.role


  return (
    <div
    className="h-full flex flex-col text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]"
    >
        <ServerHeader role={role} server={server} />
    </div>
  )
}

export default ServerSidebar
import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
import { ChanelType, MemberRole } from "@prisma/client"
import {redirect} from 'next/navigation'
import ServerHeader from "./server-header"
import ServerSearch from "./server-search"
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import ServerSection from "./server-section"
import ServerChannel from "./server-channel"
import ServerMember from "./server-member"


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


 const iconMap = {
[ChanelType.TEXT]:<Hash className="h-4 w-4 mr-2"/>,
[ChanelType.AUDIO]:<Mic className="h-4 w-4 mr-2"/>,
[ChanelType.VIDEO]:<Video className="h-4 w-4 mr-2"/>
}


const roleIconMap = {
    [MemberRole.GUEST]:null,
    [MemberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]:<ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
}


  return (
    <div
    className="h-full flex flex-col text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]"
    >
        <ServerHeader role={role} server={server} />
        <ScrollArea className="flex-1 mt-2 px-3">
        <ServerSearch  data={[
            {
                label:'Text Channel',
                type:'channel',
              data:textChannels?.map((channel)=>({
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
              }))
            },
            {
                label:'Voice Channel',
                type:'channel',
              data:audioChannels?.map((channel)=>({
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
              }))
            },
            {
                label:'Video Channel',
                type:'channel',
              data:videoChannels?.map((channel)=>({
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
              }))
            },
            {
                label:'Members',
                type:'member',
              data:members?.map((member)=>({
                id:member.id,
                name:member.profile.name,
                icon:roleIconMap[member.role]
              }))
            },
        ]}/>

        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      { !!textChannels?.length && <div className="mb-2">
            <ServerSection server={server} sectionType="channels" channelType={ChanelType.TEXT} role={role} label="Text Channels" />
            <div className="py-[2px]">   {textChannels.map((channel)=><ServerChannel key={channel.id} channel={channel} server={server} role={role} />)}</div>
         
        </div>}
      { !!audioChannels?.length && <div className="mb-2">
            <ServerSection server={server} sectionType="channels" channelType={ChanelType.AUDIO} role={role} label="Voice Channels" />
          <div className="py-[2px]"> {audioChannels.map((channel)=><ServerChannel key={channel.id} channel={channel} server={server} role={role} />)}</div> 
        </div>}
      { !!videoChannels?.length && <div className="mb-2">
            <ServerSection server={server} sectionType="channels" channelType={ChanelType.VIDEO} role={role} label="Video Channels" />
           <div className="py-[2px]">{videoChannels.map((channel)=><ServerChannel key={channel.id} channel={channel} server={server} role={role} />)}</div>
        </div>}
      { !!members?.length && <div className="mb-2">
            <ServerSection server={server} sectionType="members" channelType={ChanelType.VIDEO} role={role} label="Members" />
        <div className="py-[2px]">  {members.map((member)=><ServerMember key={member.id} member={member} server={server}/>)}</div>
        </div>}
        </ScrollArea>

    </div>
  )
}

export default ServerSidebar
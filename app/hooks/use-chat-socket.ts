import { useSocket } from "@/components/providers/socket-provider"
import { Member, Message, Profile } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"



type chatSocketProps = {
    addKey:string,
    updateKey:string,
    queryKey:string
}

type MessageMemberProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

export const useChatSocket = ({addKey,updateKey,queryKey}:chatSocketProps)=>{

const {socket} = useSocket()
const queryClient = useQueryClient()


useEffect(()=>{

if(!socket) return ;

socket.on(updateKey,(message:MessageMemberProfile)=>{
queryClient.setQueriesData([queryKey],(odlData:any)=>{
if(!odlData || !odlData.pages || odlData.pages.length ===0 ) {
    return odlData
}

const newData = odlData.pages.map((page:any)=>{
    return { ...page,items:page.items.map((item:MessageMemberProfile)=>{
        if(item.id===message.id){
            return message
        }
        return item
    })}
})
return {
    ...odlData,pages:newData
}
})
})


socket.on(addKey,(message:MessageMemberProfile)=>{
queryClient.setQueryData([queryKey],(odlData:any)=>{
if(!odlData || !odlData.pages || odlData.pages.length === 0){
    return {
        pages:[
            {
                items:[message]
            }
        ]
    }
}

const newData = [...odlData.pages]

newData[0] = {
    ...newData[0],
    items:[
        message,...newData[0].items
    ]
}

return {
    ...odlData,
    pages:newData
}

})
})

return ()=>{
    socket.off(addKey);
    socket.off(updateKey)
}

},[queryClient,socket,updateKey,queryKey,addKey])

}
'use client'

import { Member } from "@prisma/client"
import ChatWelcome from "./chat-welcome"

type Props = {
    name:string,
    member:Member,
    chatId:string,
    apiUrl:string,
    socketUrl:string,
    socketQuery:Record<string,string>,
    paramKey:'conversationId' | 'channelId' ,
    paramValue:string,
    type:'channel' | 'conversation'
}

const ChatMessages = ({name,member,chatId,apiUrl,socketUrl,socketQuery,paramKey,paramValue,type}: Props) => {
  return (
    <div className='flex-1 flex flex-col overflow-y-auto py-4'>
        <div className="flex-1" />
            <ChatWelcome name={name} type={type} />
        
    </div>
  )
}

export default ChatMessages
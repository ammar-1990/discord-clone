import { ChanelType, Channel, Server } from '@prisma/client'
import { create } from 'zustand'


export type modalType = 'createServer' |"invite" |"edit"|"manage" | "channel" | 'leave' |'delete' |'channel-delete' | 'edit-channel' | 'messageFile'
export type data = {
    server?: Server,
    channel?:Channel,
    channelType?:ChanelType,
    apiUrl?:string,
    query?:Record<string,any>


}

interface modalInterface {
type:modalType | null,
data:data,
isOpen:boolean,
openModal:(type:modalType,data?:data)=>void,
closeModal:()=>void
}

export const useModal = create<modalInterface>()((set) => ({
 type:null,
 isOpen:false,
data:{},
 openModal:(type,data={})=>set({isOpen:true,type,data}),
 closeModal:()=>set({isOpen:false,type:null})
}))
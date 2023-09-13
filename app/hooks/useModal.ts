import { ChanelType, Server } from '@prisma/client'
import { create } from 'zustand'


export type modalType = 'createServer' |"invite" |"edit"|"manage" | "channel" | 'leave' |'delete'
export type data = {server?: Server,
    channelType?:ChanelType

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
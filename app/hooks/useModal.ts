import { create } from 'zustand'


export type modalType = 'createServer'

interface modalInterface {
type:modalType | null,
isOpen:boolean,
openModal:(type:modalType)=>void,
closeModal:()=>void
}

export const useModal = create<modalInterface>()((set) => ({
 type:null,
 isOpen:false,

 openModal:(type)=>set({isOpen:true,type:type}),
 closeModal:()=>set({isOpen:false,type:null})
}))
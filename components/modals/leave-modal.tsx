"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogFooter,

    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"




import { useModal } from "@/app/hooks/useModal"

import { Button } from "../ui/button"

import {  useState } from "react"

import axios from "axios"
import { useRouter } from "next/navigation"


type Props = {}

const LeaveModal = (props: Props) => {



    const {openModal,isOpen,type,closeModal,data} = useModal()
    const isModalOpen = isOpen && type==='leave'

  

const [isLoading, setIsLoading] = useState(false)
 




const handleClose = ()=>{
    
    closeModal()
}



const router = useRouter()

const onConfirm = async ()=>{
  try {
    setIsLoading(true)

    await axios.patch(`/api/servers/${data.server?.id}/leave`)

    closeModal()
    router.push('/')
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
}

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500 p-0">
      <DialogHeader className="px-6 py-5" >
        <DialogTitle className="text-black text-center font-bold text-xl">Leave Server</DialogTitle>
   
      </DialogHeader>
      <DialogDescription className="px-6 text-zinc-500">
        Are you sure you want to leave <span className="text-indigo-500 font-semibold">{data.server?.name}</span> ?
      </DialogDescription>
      
 <DialogFooter className="bg-zinc-100 px-4 py-3">
  <div className="flex items-center justify-between w-full">
    <Button 
    variant={'ghost'}
    onClick={closeModal}
disabled={isLoading}
    >
      Cancel
    </Button>
    <Button
    variant={"primary"}
    onClick={onConfirm}
    disabled={isLoading}
    >
      Confirm
    </Button>

  </div>

 </DialogFooter>
    </DialogContent>
  </Dialog>
  )}


export default LeaveModal 
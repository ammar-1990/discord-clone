"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogFooter,

    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

  import qs from 'query-string'




import { useModal } from "@/app/hooks/useModal"

import { Button } from "../ui/button"

import {  useState } from "react"

import axios from "axios"




type Props = {}

const DeleteMessage = (props: Props) => {



    const {openModal,isOpen,type,closeModal,data} = useModal()
    const isModalOpen = isOpen && type==='deleteMessage'

  

const [isLoading, setIsLoading] = useState(false)
 




const handleClose = ()=>{
    
    closeModal()
}

const {apiUrl,query} = data



const onConfirm = async ()=>{
  try {
    setIsLoading(true)
    const url = qs.stringifyUrl({
        url:apiUrl || '',
        query:query
    })

    await axios.delete(url)

    closeModal()
   

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
        <DialogTitle className="text-black text-center font-bold text-xl">Delete Message</DialogTitle>
   
      </DialogHeader>
      <DialogDescription className="px-6 text-zinc-500 text-center">
    Are you sure you want to do this ? <br/>
    The message will be permenantly deleted.
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


export default DeleteMessage 
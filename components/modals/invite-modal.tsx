"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"




import { useModal } from "@/app/hooks/useModal"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import useOrigin from "@/app/hooks/useOrigin"
import ActionTooltip from "../action-tooltip"
import axios from "axios"


type Props = {}

const InviteModal = (props: Props) => {



    const {openModal,isOpen,type,closeModal,data} = useModal()
    const isModalOpen = isOpen && type==='invite'
const origin = useOrigin()

const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`
  
const [copied, setCopied] = useState(false)
const [isLoading, setIsLoading] = useState(false)
 




const handleClose = ()=>{
    
    closeModal()
}

const onCopy = ()=>{
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(()=>{setCopied(false)},1500)
    
}

const regenerateInviteCode = async ()=>{

    try {
        setIsLoading(true)
const res = await axios.patch(`/api/servers/${data.server?.id}/invite-code`)
console.log(res.data)
openModal("invite",{server:res.data})



    } catch (error) {
        console.log(error)
    } finally{
        setIsLoading(false)
    }
}

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500 p-0">
      <DialogHeader className="pt-5" >
        <DialogTitle className="text-black text-center font-bold text-xl">Invite Friends</DialogTitle>
   
      </DialogHeader>
      
  <div className="p-6">
<Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
server invite link
</Label>
<div className="flex items-center gap-x-3 mt-2">
    <Input disabled={isLoading} title={inviteUrl} className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-300 text-black" 
    value={inviteUrl}
    />
   <Button onClick={onCopy} title={copied ? 'copied' : 'copy'} size={'icon'}>
    {
        copied? <Check  className="w-4 h-4" /> :   <Copy className="w-4 h-4" />
    }
  </Button>

</div>
<Button disabled={isLoading} onClick={regenerateInviteCode} size={'sm'} variant={'link'} className="text-xs text-zinc-500 mt-4 "> 
    Generate a new link <RefreshCw className="w-4 h-4 ml-2" /> 
</Button>
  </div>
    </DialogContent>
  </Dialog>
  )}


export default InviteModal 
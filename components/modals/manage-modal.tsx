"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

  import qs from 'query-string'




import { useModal } from "@/app/hooks/useModal"
import { ServerWithMembersAndProfiles } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import MemberAvatar from "../MemberAvatar"
import { Check, Gavel, Loader, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"
import {   DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger, } from "../ui/dropdown-menu"
import { useState } from "react"
import { MemberRole } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import ActionTooltip from "../action-tooltip"



type Props = {}

const ManageModal = (props: Props) => {



    const {openModal,isOpen,type,closeModal,data} = useModal()
    const {server} = data as {server:ServerWithMembersAndProfiles}
    const [loadingId,setLoadingId] = useState('')
    const isModalOpen = isOpen && type==='manage'



  

 




const handleClose = ()=>{
    
    closeModal()
}



const memberIcon={
    GUEST:null,
    MODERATOR:<ShieldCheck className="w-4 h-4 text-indigo-500" />,
    ADMIN:<ShieldAlert  className="w-4 h-4 text-rose-500"/>
}

const router = useRouter()
const memberChange = async(memberId:string,role:MemberRole)=>{
    try {
        setLoadingId(memberId)
const url = qs.stringifyUrl({
    url:`/api/members/${memberId}`,
    query:{
        serverId:server?.id
    }
})

const res = await axios.patch(url,{role})
router.refresh()
openModal('manage',{server:res.data})


    } catch (error) {
        console.log(error)
    }finally{
        setLoadingId('')
    }
}


const onDelete = async (memberId:string)=>{

    try {
        setLoadingId(memberId)

        const url = qs.stringifyUrl({
            url:`/api/members/${memberId}`,
            query:{
                serverId:server.id
            }
        })

const res = await axios.delete(url)
router.refresh()
openModal('manage',{server:res.data})

    } catch (error) {
        
    }finally{
        setLoadingId('')
    }

}

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500">
      <DialogHeader className="pt-5" >
        <DialogTitle className="text-black text-center font-bold text-xl">Manage Members</DialogTitle>
   

      <DialogDescription
      className="text-center text-zinc-500"
      >
{server?.members?.length} Member(s)
      </DialogDescription>
      </DialogHeader>
      
 <ScrollArea className="mt-5 max-h-[400px]">
    {server?.members?.map((member)=><div key={member.id} className="mb-6 flex items-center gap-x-4">
        <MemberAvatar src={member.profile.imgUrl}  />
        <div className="flex flex-col gap-y-1 ">
            <p className="text-xs font-semibold flex items-center gap-x-2 capitalize">{member.profile.name}{memberIcon[member.role]}</p>
            <p className="text-xs text-zinc-500">{member.profile.email}</p>

        </div>
        {server.profileId !==member.profileId && <div className="ml-auto">
       {!loadingId && <DropdownMenu >
            <DropdownMenuTrigger  title="options">
       
                    <MoreVertical className="w-4 h-4 text-zinc-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                   
                
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
            <DropdownMenuSub >
            <DropdownMenuSubTrigger className="cursor-pointer" >
            <ShieldQuestion className="w-4 h-4 mr-2" />
                Role
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
            <DropdownMenuSubContent >
            <DropdownMenuItem onClick={()=>memberChange(member.id,'GUEST')} className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>GUEST</span>
                  {member.role==='GUEST' && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>memberChange(member.id,'MODERATOR')} className="cursor-pointer">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span className="pr-2">MODERATOR</span>
                  {member.role==='MODERATOR' && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
            </DropdownMenuSubContent>
            </DropdownMenuPortal>
              
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>onDelete(member.id)} className="cursor-pointer">
                <Gavel className="w-4 h-4 mr-2" />
                 Kick
                 </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>}
            </div>}
        {loadingId === member.id && <Loader2 className="animate-spin w-4 h-4 text-zinc-500 ml-auto" />}
        </div>)}

 </ScrollArea>
    </DialogContent>
  </Dialog>
  )}


export default ManageModal 
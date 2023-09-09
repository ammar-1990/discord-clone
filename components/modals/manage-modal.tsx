"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"




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
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical className="w-4 h-4 text-zinc-500 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
            <DropdownMenuSub >
            <DropdownMenuSubTrigger >
            <ShieldQuestion className="w-4 h-4 mr-2" />
                Role
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
            <DropdownMenuSubContent >
            <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>GUEST</span>
                  {member.role==='GUEST' && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
            <DropdownMenuItem>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>MODERATOR</span>
                  {member.role==='MODERATOR' && <Check className="w-4 h-4 ml-auto" />}
                </DropdownMenuItem>
            </DropdownMenuSubContent>
            </DropdownMenuPortal>
              
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Gavel className="w-4 h-4 mr-2" />
                 Kick
                 </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
            </div>}
        {loadingId === member.profileId && <Loader2 className="animate-spin w-4 h-4 text-zinc-500 ml-auto" />}
        </div>)}

 </ScrollArea>
    </DialogContent>
  </Dialog>
  )}


export default ManageModal 
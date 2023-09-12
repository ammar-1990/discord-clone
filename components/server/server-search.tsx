'use client'

import { Search, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { CommandInput } from "cmdk"
import { useRouter ,useParams} from "next/navigation"

type Props = {
    data:{
        label:string,
        type:'member' | 'channel',
        data:{
            icon:React.ReactNode,
            name:string,
            id:string
        }[] | undefined
    }[] 
}

const ServerSearch = ({data}: Props) => {


    const [open, setOpen] = useState(false)


    useEffect(()=>{

        const toOpen =(e:KeyboardEvent)=>{
            if(e.key ==='k' && (e.metaKey || e.ctrlKey)){
                e.preventDefault()
                setOpen(open=>!open)
            }

        }

        document.addEventListener('keydown',toOpen)


        return ()=>document.removeEventListener('keydown',toOpen)
    },[])
const params = useParams()
    const router = useRouter()

const onClick=(id:string,type:'member' | 'channel')=>{
    console.log('working')
setOpen(false)
    if(type ==='member'){
router.push(`/servers/${params?.serverId}/conversation/${id}`)
    }
    if(type === 'channel'){
        router.push(`/servers/${params?.serverId}/channels/${id}`)
    }

}

  return (
<>
<button onClick={()=>{setOpen(true)}} className="group flex items-center gap-x-2 px-2 py-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md">
    <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> 
    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">Search</p>
    <kbd className="pointer-events-none  inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto ">
        <span className="text-xs">Ctrl</span>K
    </kbd>
</button>
<CommandDialog open={open} onOpenChange={setOpen}>
    <div className="flex  items-center gap-x-3 px-4 py-1">
        <SearchIcon className="h-4 w-4 text-zinc-300 " />
    <CommandInput className="bg-transparent border-0 w-full focus:ring-0 focus:ring-offset-0 outline-none  text-sm" placeholder="Search All Channels and Members" />
    </div>

<CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    {data.map((el)=>{if(!el.data?.length) return null 
    return <CommandGroup key={el.label} heading={el.label}>
        {el.data?.map((inf)=>   <CommandItem className="cursor-pointer " key={inf.id} >
            <div onClick={()=>onClick(inf.id,el.type)} className="flex items-center gap-x-2 w-full">
            {inf.icon}
            <span className="text-sm">{inf.name}</span>
            </div>
       
        </CommandItem>)}

    </CommandGroup>})}
    </CommandList>

</CommandDialog>
</>
  )
}

export default ServerSearch
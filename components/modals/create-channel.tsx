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

  import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter} from 'next/navigation'
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import FileUpload from "../file-upload"
import axios from 'axios'
import { useModal } from "@/app/hooks/useModal"
import { ChanelType } from "@prisma/client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect } from "react"

type Props = {}

const CreateChannel = (props: Props) => {


    const router = useRouter()
    const {isOpen,type,closeModal,data} = useModal()
    const isModalOpen = isOpen && type==='channel'

    const formSchema = z.object({
        name: z.string().min(1,{message:'Name is required'}).refine(name=>name!=='general',{message:"channel name can't be 'general'"}),
        type:z.nativeEnum(ChanelType)
 
      })

    const form = useForm({
resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            type:data.channelType ||  ChanelType.TEXT
       
        }
    })



const isLoading = form.formState.isSubmitting

const onSubmit=async(values: z.infer<typeof formSchema>) =>{
  console.log(data.server)
try {
    const url = qs.stringifyUrl({
        url:`/api/channels`,
        query:{
            serverId:data.server?.id
        }
    })
  await axios.post(url,values)
  form.reset()
  closeModal()
router.refresh()
} catch (error) {
  console.log(error)
}

  }

const handleClose = ()=>{
    form.reset()
    closeModal()
}

useEffect(()=>{
  if(data.channelType){
      form.setValue('type',data.channelType)
  }
  else{
    form.setValue('type',ChanelType.TEXT)
  }
  
  },[data.channelType,form])
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500 p-0">
      <DialogHeader className="pt-5" >
        <DialogTitle className="text-black text-center font-bold text-xl capitalize">create channel</DialogTitle>

      </DialogHeader>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
      
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="px-5">
              <FormLabel className="text-xs text-zinc-500 font-bold dark:text-secondary/70">CHANNEL NAME</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Enter channel name" className="bg-zinc-300  placeholder:text-zinc-500 text-black outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0" {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="px-5">
              <FormLabel className="text-xs text-zinc-500 font-bold dark:text-secondary/70">CHANNEL TYPE</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-zinc-500/50 focus:ring-0 focus:ring-offset-0 ring-0 border-0 text-black ring-offset-0 capitalize outline-none">
                  <SelectValue placeholder="Select a channel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                 {Object.values(ChanelType).map((value)=><SelectItem className="capitalize cursor-pointer" value={value} key={value}>{value.toLowerCase()}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage  />
            </FormItem>
          )}
        />
     <DialogFooter className="px-4 py-4 bg-gray-100 mt-8">
        <Button disabled={isLoading} variant={'primary'}>Create</Button>
    </DialogFooter>
      </form>
    </Form>
  
    </DialogContent>
  </Dialog>
  )}


export default CreateChannel
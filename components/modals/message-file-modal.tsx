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

  FormField,
  FormItem,
 
} from "@/components/ui/form"

import { useRouter} from 'next/navigation'
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import FileUpload from "../file-upload"
import axios from 'axios'
import { useModal } from "@/app/hooks/useModal"

type Props = {}

const MessageFileModal = (props: Props) => {

   const {isOpen,closeModal,type,data} = useModal()

   const isModalOpen = isOpen && type ==='messageFile'

    const router = useRouter()

    const formSchema = z.object({
  
        fileUrl:z.string().min(1,{message:'Attachment is required'})
      })

    const form = useForm({
resolver:zodResolver(formSchema),
        defaultValues:{
          
           fileUrl:''
        }
    })

const isLoading = form.formState.isSubmitting

const {query,apiUrl} = data

const handleClose = ()=>{
    form.reset()
    closeModal()
  }
const onSubmit=async(values: z.infer<typeof formSchema>) =>{
try {
    const url = qs.stringifyUrl({
        url:apiUrl || '',
        query
    })
  await axios.post(url,{...values,content:values.fileUrl})
  form.reset()
router.refresh()
handleClose()
} catch (error) {
  console.log(error)
}

  }

  


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500 p-0">
      <DialogHeader className="pt-5" >
        <DialogTitle className="text-black text-center font-bold text-xl">Add an attachment</DialogTitle>
        <DialogDescription className="text-zinc-600 text-center">
          Send a file as a message
        </DialogDescription>
      </DialogHeader>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="px-6 flex items-center justify-center">
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
           <FormItem >
            <FormControl >
           <FileUpload  endPoint="messageFile" onChange={field.onChange} value={field.value}/>
            </FormControl>
           </FormItem>
          )}
        />

        </div>
     
     <DialogFooter className="px-4 py-4 bg-gray-100 mt-8">
        <Button disabled={isLoading} variant={'primary'}>Send</Button>
    </DialogFooter>
      </form>
    </Form>
  
    </DialogContent>
  </Dialog>
  )}


export default MessageFileModal
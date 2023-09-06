"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

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

type Props = {}

const CreateModal = (props: Props) => {


    const router = useRouter()
    const {isOpen,type,closeModal} = useModal()
    const isModalOpen = isOpen && type==='createServer'

    const formSchema = z.object({
        name: z.string().min(1,{message:'Name is required'}),
        imageUrl:z.string()
      })

    const form = useForm({
resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            imageUrl:''
        }
    })

const isLoading = form.formState.isSubmitting

const onSubmit=async(values: z.infer<typeof formSchema>) =>{
try {
  await axios.post('/api/servers',values)
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
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
   
    <DialogContent className="bg-white text-zinc-500 p-0">
      <DialogHeader className="pt-5" >
        <DialogTitle className="text-black text-center font-bold text-xl">Costumize your server</DialogTitle>
        <DialogDescription className="text-zinc-600 text-center">
          Give your server a personality with a name and an image.You can always change it later
        </DialogDescription>
      </DialogHeader>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="px-6 flex items-center justify-center">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
           <FormItem >
            <FormControl >
           <FileUpload  endPoint="serverImage" onChange={field.onChange} value={field.value}/>
            </FormControl>
           </FormItem>
          )}
        />

        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="px-5">
              <FormLabel className="text-xs text-zinc-500 font-bold dark:text-secondary/70">SERVER NAME</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Enter server name" className="bg-zinc-300  placeholder:text-zinc-500 text-black outline-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0" {...field} />
              </FormControl>
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


export default CreateModal
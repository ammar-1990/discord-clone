'use client'
import {FileIcon, X} from 'lucide-react'
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import '@uploadthing/react/styles.css'
import { Button } from './ui/button'

type Props = {
    endPoint:'serverImage'|'messageFile',
    onChange:(url?:string)=>void,
    value:string
}

const FileUpload = ({endPoint,onChange,value}: Props) => {

    const fileType = value.split('.').pop()

    if(value && fileType !=='pdf') return (
        <div className='relative h-32 w-32  '>
      
            <Image
            fill
            className='rounded-full object-contain '
            src={value}
            alt='uploaded image' />
            <Button onClick={()=>onChange('')}  className='absolute top-1 right-1 bg-rose-500 text-white  rounded-full p-1 w-6 h-6 shadow-sm hover:bg-rose-400' >
            <X className=' w-4 h-4'/>
            </Button>

        </div>
    )

    if(value && fileType ==='pdf'){
     return (  <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10 '>
            <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
            <a href={value} target='_blank' rel='noopener noreferrer' className='hover:underline ml-2 text-sm text-indigo-500 dark:text-indigo-400 '>{value}</a>
            <Button onClick={()=>onChange('')}  className='absolute -top-2 -right-2 bg-rose-500 text-white  rounded-full p-1 w-6 h-6 shadow-sm hover:bg-rose-400' >
            <X className=' w-4 h-4'/>
            </Button>
        </div>)
    }

  return (
<UploadDropzone
endpoint={endPoint}
onClientUploadComplete={(res)=>{
onChange(res?.[0].url)
}}
onUploadError={(error:Error)=>{
    console.log(error)
}}

/>
  )
}

export default FileUpload
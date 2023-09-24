'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Smile } from "lucide-react"

import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {useTheme} from 'next-themes'

type Props = {
    onChange:(value:string)=>void
}

const EmojiPicker = ({onChange}: Props) => {
  return (
<Popover>
    <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
    </PopoverTrigger>
    <PopoverContent
     side="right" 
     sideOffset={40}
     className="bg-transparent shadow-none drop-shadow-none border-none mb-16"
     >
<Picker />
    </PopoverContent>
</Popover>
  )
}

export default EmojiPicker
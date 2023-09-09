import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

type Props = {
    src?:string,
    className?:string
}

const MemberAvatar = ({src,className}: Props) => {
  return (
  <Avatar className={cn('w-6 h-6 md:w-8 md:h-8 ', className)}>
    <AvatarImage src={src} />
  </Avatar>
  )
}

export default MemberAvatar
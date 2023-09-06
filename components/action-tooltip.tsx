'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type Props = {
    label:string,
    children:React.ReactNode,
    side?:'top' | "bottom" | "right" | 'left',
    align?:'start'|'center'|'end'
}

const ActionTooltip = ({label,children,align,side}: Props) => {
  return (
<TooltipProvider>
  <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent align={align} side={side}>
      <p className="font-semibold capitalize text-sm">{label.toLowerCase()}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
  )
}

export default ActionTooltip
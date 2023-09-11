'use client'


import { Plus } from 'lucide-react'
import React from 'react'
import ActionTooltip from '../action-tooltip'
import { useModal } from '@/app/hooks/useModal'

type Props = {}

const ActionNav = (props: Props) => {

  const {openModal} = useModal()
  return (
    <div>
        <ActionTooltip
        label='add a server'
        align='center'
        side='right'
        >
        <button type='button' className='group' onClick={()=>openModal('createServer')}>
            <div className='w-[38px] h-[38px] rounded-[24px] flex items-center justify-center dark:bg-neutral-700 group-hover:rounded-[16px] duration-150 group-hover:bg-emerald-500'>
<Plus  size={25} className='text-emerald-500 group-hover:text-white duration-150'/>
            </div>
        </button>
        </ActionTooltip>
   
    </div>
  )
}

export default ActionNav
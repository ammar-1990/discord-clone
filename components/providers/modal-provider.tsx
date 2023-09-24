'use client'

import CreateModal from "../modals/create-modal"
import {useEffect , useState} from 'react'
import InviteModal from "../modals/invite-modal"
import EditModal from "../modals/edit-modatl"
import ManageModal from "../modals/manage-modal"
import CreateChannel from "../modals/create-channel"
import LeaveModal from "../modals/leave-modal"
import DeleteModal from "../modals/delete-modal"
import DeleteChannel from "../modals/delete-channel"
import EditChannel from "../modals/edit-channel"
import MessageFileModal from "../modals/message-file-modal"


export const ModalProvider = ()=>{

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{setIsMounted(true)},[])

    if(!isMounted) return null
    return (
        <>
        <CreateModal />
        <InviteModal />
        <EditModal />
        <ManageModal />
        <CreateChannel />
        <LeaveModal />
        <DeleteModal />
        <DeleteChannel />
        <EditChannel />
        <MessageFileModal />
        </>
 )
}
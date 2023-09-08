import { currentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import {NextResponse} from 'next/server'
import {v4 as uuidv4} from 'uuid'


export async function PATCH(req:Request,{params}:{params:{serverId:string}}){


    try {
        const profile = await currentUser()
        if(!profile) return new NextResponse('Unaothoriazed',{status:401})

        if(!params.serverId) return new NextResponse('ServerId is missing',{status:400})


        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id
            },
            data:{
                inviteCode:uuidv4()
            }
        })

        return  NextResponse.json(server)
    } catch (error) {
        console.log(error)
        return new NextResponse('[SERVER_ID_ERROR]',{status:500})
    }
   

}
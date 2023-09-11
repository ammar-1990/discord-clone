import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{serverId:string}}){

try {

    console.log('work')
    const profile = await currentUser()
    if(!profile) return new NextResponse('Unauthorized',{status:401})

    const {serverId} = params
    if(!serverId) return new NextResponse('server ID is required',{status:400})


    const server = await db.server.update({
        where:{
            id:serverId,
            profileId:{not:profile.id},
            members:{some:{
                profileId:profile.id
            }}
        },
        data:{
            members:{
                deleteMany:{
                    profileId:profile.id
                }
            }
        }
    })

    return NextResponse.json(server)
} catch (error) {
    console.log(error)
    return new NextResponse('[SERVER_ERROR_LEAVE]',{status:500})
}

    

}
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request){

    try {
        const profile = await currentUser()
        if(!profile) return new NextResponse('Unauthorized',{status:401})
        const {searchParams} = new URL(req.url)

        const serverId = searchParams.get('serverId')
        if(!serverId) return new NextResponse('server ID is required',{status:400})
        const {name,type} = await req.json()

        if(!name || !type) return new NextResponse('channel infos are required',{status:400})

        if(name ==='general') return new NextResponse("channel name can't be 'general' ",{status:400})

        const server = await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                            profileId:profile.id,
                            name,
                            type
                        }
                    
                }
            }
        }) 

        return NextResponse.json(server)




    } catch (error) {
        console.log(error)
        return new NextResponse('[SERVER_ERROR_CREATE_CHANNEL]',{status:500})
    }

}
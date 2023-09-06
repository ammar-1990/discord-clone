import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'


export async function POST(request:Request) {






    try {
        const {name,imageUrl} = await request.json()
        const profile = await currentUser()

        if(!profile) return new NextResponse('unauthorized',{status:401})

       const server =  await db.server.create({
            data:{
                name,
                imgUrl:imageUrl,
                inviteCode:uuidv4(),
                profileId:profile.id,
                channels:{
                    create:[{name:'general',profileId:profile.id}]
                },
                members:{
                    create:[{profileId:profile.id,role:MemberRole.ADMIN}]
                }

            }
        })

        return  NextResponse.json(server)
    } catch (error) {
        
console.log('[SERVERS_POST]',error)
        return new NextResponse('Internal Error',{status:500})
    }
    
}
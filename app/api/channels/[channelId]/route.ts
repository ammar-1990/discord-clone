import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function DELETE(req:Request,{params}:{params:{channelId:string}}){

    try {

        const profile = await currentUser()
        if(!profile) return new NextResponse('Unauthorized',{status:401})

        const {channelId} = params
        if(!channelId) return new NextResponse('channel ID is required',{status:400})

        const {searchParams} = new URL(req.url)

        const serverId = searchParams.get('serverId')
        if(!serverId) return new NextResponse('server ID is required',{status:400})


      const server =  await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.MODERATOR,MemberRole.ADMIN]
                        }
                    }
                }
            },
            data:{
                channels:{
                    delete:{
                        id:channelId,
                        name:{
                            not:'general'
                        }
                    }
                }
            }
        })


        return NextResponse.json(server)
        
    } catch (error) {
        console.log(error)

 return new NextResponse('[SERVER_DELETE_CHANNEL_ERROR]',{status:500})
        
    }

}
export async function PATCH(req:Request,{params}:{params:{channelId:string}}){

    try {

        const {name,type} = await req.json()
        if(name === 'general' ) return new NextResponse("name can't be 'general'",{status:400})
        const profile = await currentUser()
        if(!profile) return new NextResponse('Unauthorized',{status:401})

        const {channelId} = params
        if(!channelId) return new NextResponse('channel ID is required',{status:400})

        const {searchParams} = new URL(req.url)

        const serverId = searchParams.get('serverId')
        if(!serverId) return new NextResponse('server ID is required',{status:400})


      const server =  await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.MODERATOR,MemberRole.ADMIN]
                        }
                    }
                }
            },
            data:{
                channels:{
                  update:{
                    where:{
                        id:channelId,
                        NOT:{
                            name:'general'
                        }
                    },
                    data:{
                        name,
                        type
                    }
                  },
                  
                }
            }
        })


        return NextResponse.json(server)
        
    } catch (error) {
        console.log(error)

 return new NextResponse('[SERVER_EDIT_CHANNEL_ERROR]',{status:500})
        
    }

}
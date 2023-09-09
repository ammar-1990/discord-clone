import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{memberId:string}}) {


    try {
        const profile = await currentUser()
        if(!profile) return new NextResponse('Unauthorized',{status:400})
const {searchParams} = new URL(req.url)

const serverId = searchParams.get('serverId')
if(!serverId) return new NextResponse('server ID is required',{status:400})

const {role} = await req.json()
if(!role) return new NextResponse('role is required',{status:400})

const {memberId} = params

if(!memberId) return  new NextResponse('member ID is required',{status:400})

const server = await db.server.update({
    where:{
        id:serverId,
        profileId:profile.id,

    },
    data:{
        members:{
            update:{
                where:{
                  id:memberId,
                  profileId:{
                    not:profile.id
                  }
                },
                data:{
                    role
                },
                
            }
        }
    },
    include:{
        members:{
            include:{profile:true},
            orderBy:{role:'asc'}
        },
        
    }
  
})
return NextResponse.json(server)
    } catch (error) {
        return new NextResponse('[SERVER_ERROR_ROLE]',{status:500}) 
    }
    
}



export async function DELETE(req:Request,{params}:{params:{memberId:string}}){


    try {
       const profile = await currentUser() 
       if(!profile)return new NextResponse('Unauthorized',{status:401})
const {memberId} = params

if(!memberId) return new NextResponse('member ID is required',{status:400})

const {searchParams} = new URL(req.url)

const serverId = searchParams.get('serverId')

if(!serverId) return new NextResponse('server ID is required',{status:400})

const server = await db.server.update({
    where:{
        id:serverId,
        profileId:profile.id
    },
    data:{
        members:{
            deleteMany:{
                id:memberId,
                profileId:{not:profile.id}
            }
        }
    },
    include:{
        members:{
            include:{
                profile:true
            },
            orderBy:{
                role:'asc'
            }
        }
    }
})

return NextResponse.json(server)
 

    } catch (error) {
        console.log(error)

        return new NextResponse('[SERVER_ERROR_DELETE_MEMBER]',{status:500})
    }

}
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{serverId:string}}){

    const values = await req.json()
try {
    const server = await db.server.update({
        where:{
            id:params.serverId
        },
        data:{
            name:values.name,
            imgUrl:values.imageUrl
        }
    })


    return NextResponse.json(server)
} catch (error) {
    console.log(error)
    return new NextResponse('[INTERNAL_ERROR_EDIT',{status:500})
}
    

}
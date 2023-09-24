import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";


export async function currentUserPages (req:NextApiRequest){

    const { userId} = getAuth(req)

    if(!userId) return null

    try {
        const profile = await db.profile.findUnique({
            where:{
                userId:userId
            }
        })  
return profile

    } catch (error) {
        console.log(error)
       return null
    }

}
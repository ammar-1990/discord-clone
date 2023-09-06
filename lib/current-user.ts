import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { NextResponse } from "next/server";


export async function currentUser (){

    const { userId} = auth()

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
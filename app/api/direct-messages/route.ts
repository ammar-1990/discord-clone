import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentUser();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    if (!conversationId)
      return new NextResponse("conversation ID is required", { status: 400 });

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
            conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }else{

        messages = await db.directMessage.findMany({
            take:MESSAGES_BATCH,
            where:{
                conversationId
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

    let nextCursor = null

    if(messages.length===MESSAGES_BATCH){
        nextCursor = messages[MESSAGES_BATCH-1].id
    }

    return NextResponse.json({
        items:messages,
        nextCursor
    })

  } catch (error) {
    console.log("[SERVER_DIRECT_MESSAGES_GET_ERROR]", error);

    return new NextResponse("InternalError", { status: 500 });
  }
}

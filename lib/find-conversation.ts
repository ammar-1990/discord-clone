import { db } from "./db"

export const findConversation = async(memberOneId:string,memberTwoId:string)=>{

    try {
        return await db.conversation.findFirst({
            where:{
                AND:[{memberOneId:memberOneId}
                    ,{memberTwoId:memberTwoId}
                ]
            },
            include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
                    }
    
                }
            }
        })
    
    } catch (error) {
        console.log(error)
        return null
    }
   
}


export const createConversation = async(memberOneId:string,memberTwoId:string)=>{
    console.log(memberOneId,memberTwoId)
try {
    return db.conversation.create({
        data:{
            memberOneId,
            memberTwoId
        },
        include:{
            memberOne:{include:{profile:true}},
            memberTwo:{include:{profile:true}},
        }
    })
} catch (error) {
    console.log(error)
    return null
}
}


export const getOrCreateConversation = async (memberOneId:string,memberTwoId:string)=>{

    let conversation = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId)

    if(!conversation){

        conversation = await createConversation(memberOneId,memberTwoId)
    }

    return conversation 

}
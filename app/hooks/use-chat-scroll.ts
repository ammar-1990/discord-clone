import { useEffect, useState } from "react";


type chatScrollProps = {
    chatRef:React.RefObject<HTMLDivElement>;
    bottomRef:React.RefObject<HTMLDivElement>;
    shouldLoad:boolean;
    loadMore:()=>void;
    count:number
}


export const useChatScroll = ({chatRef,bottomRef,shouldLoad,loadMore,count}:chatScrollProps)=>{

    const [hasInitialized, setHasInitialized] = useState(false)

    useEffect(()=>{
        const topDiv = chatRef?.current

        const handleScroll =()=>{
            const scrollTop = topDiv?.scrollTop

            if(scrollTop === 0 && shouldLoad ){
                loadMore()
            }
        }

        topDiv?.addEventListener('scroll',handleScroll)


        return ()=>{
            topDiv?.removeEventListener('scroll',handleScroll)
        }
    },[shouldLoad,loadMore,chatRef,])


    useEffect(()=>{

        const bottomDiv = bottomRef.current
        bottomDiv?.scrollIntoView({behavior:'smooth'})
   
    },[count,bottomRef])

}
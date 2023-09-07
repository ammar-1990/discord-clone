import { currentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import {redirect} from 'next/navigation'
import ActionNav from './ActionNav'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import ItemNav from './ItemNav'
import { ModeToggle } from '../mode-toggle'
import { UserButton } from '@clerk/nextjs'
import { redirectToSignIn } from '@clerk/nextjs'

type Props = {}

const MainNav = async(props: Props) => {
    const profile = await currentUser()
    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId:profile?.id
                }
            }
        },
        orderBy:{
            createdAt:'asc'
        }
    })



if(!profile) return redirectToSignIn()

  return (
    <div className='flex items-center flex-col space-y-4 w-full text-primary dark:bg-[#1E1F22] py-4'>
    <ActionNav />
    <Separator
    className='h-[2px] bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto rounded-md' />
    <ScrollArea className='flex-1 w-fll'>
        {servers.map((server,i)=><ItemNav key={server.id} id={server.id} name={server.name} imageUrl={server.imgUrl} />)}

    </ScrollArea>
    <div className='pb-3 mt-auto flex flex-col items-center gap-y-4'>
        <ModeToggle />
        <UserButton afterSignOutUrl='/'
        appearance={
            {
                elements:{
                    avatarBox:'h-[48px] w-[48px]'
                }
            }
        } />

    </div>
   
        </div>
  )
}

export default MainNav
import ServerSidebar from '@/components/server/server-sidebar'
import { currentUser } from '@/lib/current-user'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import {redirect} from 'next/navigation'

type Props = {
    children:React.ReactNode,
    params:{serverId:string}
}

const layout =async ({children,params}: Props) => {

    const profile = await currentUser()
    const server = await db.server.findUnique({
        where:{
            id:params.serverId,
            members:{
                some:{
                    profileId:profile?.id
                }
            }
        }
    })

if(!profile) return redirectToSignIn()
if(!server) return redirect('/')

  return (
    <div className='h-full'>
        <div className='hidden fixed inset-y-0 w-60 h-full  md:flex flex-col'>
<ServerSidebar  serverId={params.serverId} />
        </div>
        <main className='md:pl-60'>
        {children}
        </main>
   
    </div>
  )
}

export default layout
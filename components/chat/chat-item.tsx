"use client";

import { Member, Profile } from "@prisma/client";
import MemberAvatar from "../MemberAvatar";
import { MemberRole } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams,useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/app/hooks/useModal";

type Props = {
  id: string;
  content: string;
  member: Member & { profile: Profile };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketQuery,
  socketUrl,
}: Props) => {
  const iconMap = {
    ADMIN: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    MODERATOR: <ShieldCheck className="w-4 h-4 text-blue-500" />,
    GUEST: null,
  };

  const [isEditing, setIsEditing] = useState(false);
 const {openModal} = useModal()

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const fileType = fileUrl?.split(".").pop() === "pdf";
  const isPdf = fileType && fileUrl;
  const isImage = !isPdf && fileUrl;

  const formSchema = z.object({
    content: z.string().min(1, {
      message: "you must enter a content",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  useEffect(() => {
    form.reset({
      content,
    });
  }, [content]);

  const isLoading = form.formState.isSubmitting

 async function onSubmit(values: z.infer<typeof formSchema>) {

try {
const url = qs.stringifyUrl({
url:`${socketUrl}/${id}`,
query:socketQuery
})

await axios.patch(url,values)

setIsEditing(false)
} catch (error) {
    console.log(error)
}
  }

useEffect(()=>{
    const handleKeyDown = (e:KeyboardEvent)=>{

      

        if(e.key === 'Escape' ){
          
            setIsEditing(false)
        }

    }


    document.addEventListener('keydown',handleKeyDown)

    return ()=>document.removeEventListener('keydown',handleKeyDown)
},[])

const params = useParams()
const router = useRouter()

const onMemberClick = ()=>{
if(member.id === currentMember.id) return ;

router.push(`/servers/${params?.serverId}/conversations/${member.id}`)

}

  return (
    <div className="flex p-4 gap-x-4 group relative hover:bg-black/10 dark:hover-black/20">
      <div onClick={onMemberClick} className="cursor-pointer transition">
        <MemberAvatar src={member.profile.imgUrl} />
      </div>
      <div className="flex flex-col gap-y-1 relative flex-1 ">
        <div className="flex items-center gap-x-2">
          <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer capitalize">
            {member.profile.name}
          </p>
          <ActionTooltip label={member.role}>
            {iconMap[member.role]}
          </ActionTooltip>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {timestamp}
          </p>
        </div>
        {isImage && (
          <a
            href={fileUrl}
            target="_blank"
            className="w-48 h-48 aspect-square rounded-lg border flex items-center justify-center bg-secondary relative"
          >
            <Image
              src={fileUrl}
              alt={content}
              fill
              className="object-contain"
            />
          </a>
        )}

        {isPdf && (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 w-full ">
            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-2 text-sm w-full text-indigo-500 dark:text-indigo-400 "
            >
              PDF File
            </a>
          </div>
        )}

        {!fileUrl && !isEditing && (
          <p
            className={cn(
              "text-sm text-zinc-600 dark:text-zinc-300 ",
              deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs"
            )}
          >
            {content}
            {isUpdated && !deleted && (
              <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                (edited)
              </span>
            )}
          </p>
        )}
        {!fileUrl && isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-x-2 pt-2 w-full"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className=" relative">
                        <Input
                    disabled={isLoading}
                          className="p-2
                           bg-zinc-200/90
                            dark:bg-zinc-700/75
                             border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                          {...field}
                          placeholder="Edited message"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} size={'sm'} variant={'primary'} >Save</Button>
            </form>
            <span className="text-[10px] mt-1 text-zinc-400">press escape to cancel, enter to save</span>
          </Form>
        )}
      </div>

    <div className={`absolute group-hover:flex items-center -top-2 right-5  p-1 hidden gap-x-2 bg-white dark:bg-zinc-800 rounded-sm`}>
        {canEditMessage && (
          <ActionTooltip label="Edit">
            <Edit onClick={()=>setIsEditing(true)} className="w-4 h-4 ml-auto cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        )}
      {canDeleteMessage&&  <ActionTooltip label="Delete">
          <Trash onClick={()=>openModal('deleteMessage',{apiUrl:`${socketUrl}/${id}`,query:socketQuery})} className="w-4 h-4 ml-auto cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
        </ActionTooltip>}
      </div>
    </div> 
  );
};

export default ChatItem;

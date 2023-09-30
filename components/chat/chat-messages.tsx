"use client";

import { Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/app/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns";
import ChatItem from "./chat-item";
import { useChatSocket } from "@/app/hooks/use-chat-socket";

type Props = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "conversationId" | "channelId";
  paramValue: string;
  type: "channel" | "conversation";
};

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: Props) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  useChatSocket({ queryKey, addKey, updateKey });

  const DATE_FORMAT = "d MMM yyyy, HH:mm";

  if (status === "loading") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-zinc-500 my-4" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading Messages...
        </p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <ServerCrash className="w-7 h-7  text-zinc-500 my-4" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  type MessageMemberProfile = Message & {
    member: Member & {
      profile: Profile;
    };
  };

  return (
    <div ref={chatRef} className="flex-1 flex flex-col overflow-y-auto py-4">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome name={name} type={type} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
            onClick={()=>fetchNextPage()}
            className="text-zinc-500 hover:text-zinc-600 my-4 dark:text-zinc-400 text-xs dark:hover:text-zinc-300 transition"
            >Load previous messages</button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageMemberProfile) => (
              <ChatItem
                key={message.id}
                currentMember={member}
                member={message.member}
                id={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.createdAt !== message.updatedAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;

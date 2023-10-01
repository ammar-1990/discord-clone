import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChanelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const page = async ({ params: { channelId, serverId } }: Props) => {
  const profile = await currentUser();

  if (!profile) return redirectToSignIn();
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type ===ChanelType.TEXT && (
        <>
           <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        type="channel"
        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
      />
      <ChatInput
        name={channel.name}
        query={{ channelId: channel.id, serverId: channel.serverId }}
        type="channel"
        apiUrl="/api/socket/messages"
      /></>
      )}

      {channel.type === ChanelType.AUDIO && (
        <MediaRoom
        chatId={channel.id}
        audio={true}
        video={false}
        />
      )}

      {channel.type === ChanelType.VIDEO && (
        <MediaRoom
        chatId={channel.id}
        audio={true}
        video={true}
        />
      )}
   
    </div>
  );
};

export default page;

"use client";

import { Member, Profile } from "@prisma/client";
import MemberAvatar from "../MemberAvatar";
import { MemberRole } from "@prisma/client";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import Image from "next/image";

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

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const fileType = fileUrl?.split(".").pop() === "pdf";
  const isPdf = fileType && fileUrl;
  const isImage = !isPdf && fileUrl;

  return (
    <div className="flex p-4 gap-x-4 ">
      <div className="cursor-pointer transition">
        <MemberAvatar src={member.profile.imgUrl} />
      </div>
      <div className="flex flex-col gap-y-1 ">
        <div className="flex items-center gap-x-2">
          <p className="font-semibold text-sm hover:underline cursor-pointer">
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
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-2 text-sm text-indigo-500 dark:text-indigo-400 "
            >
              {fileUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;

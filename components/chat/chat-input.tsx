"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../ui/form";
import { Button } from "../ui/button";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
import qs from 'query-string'
import axios from "axios";
import { useModal } from "@/app/hooks/useModal";
import EmojiPicker from "../emoji-picker";
import { useRouter } from "next/navigation";



type Props = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
};

const ChatInput = ({ apiUrl, query, name, type }: Props) => {

  const formSchema = z.object({
    content: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
 try {
      const url = qs.stringifyUrl({
        url:apiUrl,
        query
      })
await axios.post(url,values)

form.reset()
router.refresh()

 } catch (error) {
    console.log(error)
 }
  };

  const {openModal} = useModal()

  return (
    <div className="mt-auto">


    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Button
                    type="button"
                    onClick={() => {openModal('messageFile',{query,apiUrl})}}
                    className="absolute top-7 left-8 w-[24px] h-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </Button>
                  <Input
                  autoComplete="off"
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-zinc-600 dark:text-zinc-200 "
                    placeholder={`Message ${type === 'conversation' ? name : '#' + name}`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                <EmojiPicker onChange={(emoji:string)=>field.onChange(`${field.value}${emoji}` )} />
                  </div>
                </div>
              </FormControl>

            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
  );
};

export default ChatInput;

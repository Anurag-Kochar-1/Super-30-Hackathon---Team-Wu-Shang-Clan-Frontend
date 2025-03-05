"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/chat";
import { motion } from "framer-motion";

// Form schema for chat messages
const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type FormData = z.infer<typeof formSchema>;

interface ChatSidebarProps {
  interviewId: string;
  onClose: () => void;
}

export default function ChatSidebar({ interviewId, onClose }: ChatSidebarProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChatStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Scroll to bottom when new messages come in
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = (data: FormData) => {
    if (currentUser) {
      sendMessage({
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatarUrl,
        content: data.message,
        timestamp: new Date().toISOString(),
        interviewId,
      });
    }
    reset();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages
            .filter((msg) => msg.interviewId === interviewId)
            .map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.senderId === currentUser?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.senderId !== currentUser?.id && (
                  <Avatar className="mr-2 h-8 w-8">
                    {message.senderAvatar ? (
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                    ) : null}
                    <AvatarFallback>
                      {message.senderName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.senderId === currentUser?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.senderId !== currentUser?.id && (
                    <p className="mb-1 text-xs font-medium">{message.senderName}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t p-4"
      >
        <div className="flex gap-2">
          <Input
            {...register("message")}
            placeholder="Type a message..."
            className={errors.message ? "border-destructive" : ""}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </form>
    </div>
  );
}
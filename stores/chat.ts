import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    timestamp: string;
    interviewId: string;
}

interface ChatState {
    messages: Message[];
    sendMessage: (message: Message) => void;
    clearMessages: (interviewId: string) => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            messages: [],
            sendMessage: (message) =>
                set((state) => ({
                    messages: [...state.messages, message],
                })),
            clearMessages: (interviewId) =>
                set((state) => ({
                    messages: state.messages.filter((msg) => msg.interviewId !== interviewId),
                })),
        }),
        {
            name: "interview-chat",
        }
    )
);
import { Interview } from "@/types";
import { create } from "zustand";

interface InterviewState {
    currentInterview: Interview | null;
    setCurrentInterview: (interview: Interview) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useInterviewStore = create<InterviewState>()((set) => ({
    currentInterview: null,
    setCurrentInterview: (interview) => set({ currentInterview: interview }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));
import { Interview, InterviewSession } from "@/types";
import { create } from "zustand";

interface InterviewState {
    currentInterview: Interview | null;
    setCurrentInterview: (interview: Interview) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;

    currentInterviewSession: InterviewSession | null;
    setCurrentInterviewSession: (interviewSession: InterviewSession) => void;
    interviewSessionId: string | null;
    setInterviewSessionId: (interviewSessionId: string | null) => void;
}

export const useInterviewStore = create<InterviewState>()((set) => ({
    currentInterview: null,
    setCurrentInterview: (interview) => set({ currentInterview: interview }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    currentInterviewSession: null,
    setCurrentInterviewSession: (interviewSession) => set({ currentInterviewSession: interviewSession }),
    interviewSessionId: null,
    setInterviewSessionId: (interviewSessionId) => set({ interviewSessionId }),

}));
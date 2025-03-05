import { create } from "zustand";
import { Question } from "@/types";
import { useCameraStore } from "./camera";

interface InterviewControlState {
    // Microphone state
    isMicOn: boolean;
    toggleMicrophone: () => void;

    // Chat sidebar state
    isChatOpen: boolean;
    toggleChat: () => void;

    // Question navigation
    currentQuestion: Question | null;
    setCurrentQuestion: (question: Question | null) => void;
    questionIndex: number;
    totalQuestions: number;
    nextQuestion: () => void;
    prevQuestion: () => void;
    setInitialQuestions: (questions: Question[]) => void;

    // Call control
    endCall: () => void;
    setEndCallHandler: (handler: () => void) => void;
}

export const useInterviewControlStore = create<InterviewControlState>((set, get) => ({
    // Microphone state
    isMicOn: true,
    toggleMicrophone: () => {
        const { isMicOn } = get();

        // Get the mediaStream from the camera store
        // This assumes you have a camera store similar to your previous implementation
        const mediaStream = useCameraStore?.getState()?.mediaStream;

        if (mediaStream) {
            mediaStream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicOn;
            });
        }

        set({ isMicOn: !isMicOn });
    },

    // Chat sidebar state
    isChatOpen: false,
    toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

    // Question navigation
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 0,

    nextQuestion: () => {
        const { questionIndex, totalQuestions } = get();

        if (questionIndex < totalQuestions - 1) {
            // Get questions from the interview store
            // This assumes you have an interview store similar to your previous implementation
            const questions = useCameraStore?.getState()?.currentInterview?.questions || [];

            set({
                questionIndex: questionIndex + 1,
                currentQuestion: questions[questionIndex + 1] || null,
            });
        }
    },

    prevQuestion: () => {
        const { questionIndex } = get();

        if (questionIndex > 0) {
            // Get questions from the interview store
            const questions = useCameraStore?.getState()?.currentInterview?.questions || [];

            set({
                questionIndex: questionIndex - 1,
                currentQuestion: questions[questionIndex - 1] || null,
            });
        }
    },
    setCurrentQuestion(question) {
        set({ currentQuestion: question });
    },

    setInitialQuestions: (questions: Question[]) => {
        set({
            currentQuestion: questions.length > 0 ? questions[0] : null,
            questionIndex: 0,
            totalQuestions: questions.length,
        });
    },

    // Call control
    endCall: () => {
        // This will be set by the parent component
        // Default is a no-op function
    },
    setEndCallHandler: (handler: () => void) => {
        set({ endCall: handler });
    },
}));
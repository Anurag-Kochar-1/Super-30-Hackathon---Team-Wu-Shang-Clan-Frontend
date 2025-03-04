import { create } from "zustand";

interface State {
    isDialogOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    isGenerated: boolean;
    setIsGenerated: (isGenerated: boolean) => void;
    interviewLink: string;
    setInterviewLink: (link: string) => void;
    clearInterviewLink: () => void;

}

export const useGenerateMockInterviewStore = create<State>()((set) => ({
    isDialogOpen: false,
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => {
        set({ isDialogOpen: false })
        set({ isGenerated: false })
        set({ interviewLink: "" })
    },
    isGenerated: false,
    setIsGenerated: (isGenerated: boolean) => set({ isGenerated }),
    interviewLink: "",
    clearInterviewLink: () => set({ interviewLink: "" }),
    setInterviewLink(link) {
        set({ interviewLink: link })
    },
}));

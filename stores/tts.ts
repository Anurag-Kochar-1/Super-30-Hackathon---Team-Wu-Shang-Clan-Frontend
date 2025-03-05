import { create } from 'zustand';

interface TtsState {
    isSpeaking: boolean;
    voices: SpeechSynthesisVoice[];
    selectedVoice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;

    speak: (text: string) => void;
    stop: () => void;
    setVoices: (voices: SpeechSynthesisVoice[]) => void;
    setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
    setRate: (rate: number) => void;
    setPitch: (pitch: number) => void;
}

export const useTtsStore = create<TtsState>()((set, get) => ({
    // Initial state
    isSpeaking: false,
    voices: [],
    selectedVoice: null,
    rate: 1,
    pitch: 1,

    // Actions
    speak: (text: string) => {
        // Only run in browser environment
        if (typeof window === 'undefined') return;

        const { isSpeaking, selectedVoice, rate, pitch } = get();

        // Cancel any ongoing speech
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }

        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);

        // Configure speech parameters
        utterance.rate = rate;
        utterance.pitch = pitch;

        // Set the selected voice if available
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Event handlers
        utterance.onstart = () => set({ isSpeaking: true });
        utterance.onend = () => set({ isSpeaking: false });
        utterance.onerror = () => set({ isSpeaking: false });

        // Start speaking
        window.speechSynthesis.speak(utterance);
    },

    stop: () => {
        if (typeof window === 'undefined') return;

        window.speechSynthesis.cancel();
        set({ isSpeaking: false });
    },

    setVoices: (voices) => {
        set({ voices });

        // Set default voice if not already set
        const { selectedVoice } = get();
        if (!selectedVoice && voices.length > 0) {
            set({ selectedVoice: voices[0] });
        }
    },

    setSelectedVoice: (voice) => {
        set({ selectedVoice: voice });
    },

    setRate: (rate) => {
        set({ rate });
    },

    setPitch: (pitch) => {
        set({ pitch });
    },
}));


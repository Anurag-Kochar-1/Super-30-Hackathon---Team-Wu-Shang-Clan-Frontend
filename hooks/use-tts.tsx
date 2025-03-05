import { useTtsStore } from "@/stores/tts";
import { useEffect } from "react";

export const useTtsVoices = () => {
    const setVoices = useTtsStore((state) => state.setVoices);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Function to load voices
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Chrome needs this event, Firefox gets voices immediately
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Initial load attempt for Firefox
        loadVoices();

        // Cleanup
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [setVoices]);
};
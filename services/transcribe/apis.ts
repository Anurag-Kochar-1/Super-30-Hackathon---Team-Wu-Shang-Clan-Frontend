import { api } from "@/lib/axios";
import { TranscriptionResponse } from "@/types/transcribe";

export const transcribe = async (blob: Blob | null): Promise<TranscriptionResponse> => {
    if (!blob) {
        throw new Error("No audio blob provided");
    }
    const formData = new FormData();
    const audioFile = new File([blob], "audio-recording.webm", { type: blob.type });
    formData.append('audio', audioFile);
    return (await api.post(`/transcribe`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })).data
}
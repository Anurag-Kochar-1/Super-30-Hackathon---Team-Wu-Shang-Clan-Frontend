import { useMutation } from "@tanstack/react-query"
import { transcribe } from "./apis"

export const useTranscribeMutation = () => {
    return useMutation({
        mutationFn: transcribe
    })
}
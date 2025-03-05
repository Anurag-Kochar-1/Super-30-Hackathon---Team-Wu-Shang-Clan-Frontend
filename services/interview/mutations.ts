import { useMutation } from "@tanstack/react-query"
import { createInterview } from "./apis"

export const useCreateInterviewMutation = () => {
    return useMutation({
        mutationFn: createInterview,
    })
}
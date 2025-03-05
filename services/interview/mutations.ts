import { useMutation } from "@tanstack/react-query"
import { createInterview, createInterviewSession } from "./apis"

export const useCreateInterviewMutation = () => {
    return useMutation({
        mutationFn: createInterview,
    })
}

export const useCreateInterviewSessionMutation = () => {
    return useMutation({
        mutationFn: createInterviewSession,
    })
}
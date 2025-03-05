import { useMutation } from "@tanstack/react-query"
import { createInterview, createInterviewSession, submitResponse } from "./apis"

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

export const useSubmitResponseMutation = () => {
    return useMutation({
        mutationFn: submitResponse
    })

}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadResume } from "./apis"

export const useUploadResumeMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: uploadResume,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['my-resumes']
            })
        }
    })
}
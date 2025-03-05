import { useQuery } from "@tanstack/react-query"
import { getInterviewById, getInterviewSessionById } from "./apis"

export const useGetInterviewByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["interview", id],
        queryFn: () => getInterviewById(id),
        enabled: !!id,
    })
}
export const useGetInterviewSessionByIdQuery = (id: string, isSessionCreated: boolean) => {
    return useQuery({
        queryKey: ["interview-session", id],
        queryFn: () => getInterviewSessionById(id),
        enabled: !!id && !!isSessionCreated,
    })
}
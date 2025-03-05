import { useQuery } from "@tanstack/react-query"
import { getMyResumes } from "./apis"
import { getCookie } from "cookies-next"

export const useGetMyResumesQuery = () => {
    const token = getCookie("token")
    return useQuery({
        queryKey: ['my-resumes'],
        queryFn: getMyResumes,
        enabled: !!token

    })


}
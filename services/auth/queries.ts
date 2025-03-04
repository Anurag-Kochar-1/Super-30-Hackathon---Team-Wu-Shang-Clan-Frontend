import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { getUser } from "./apis"

export const useCurrentUser = () => {
    const token = getCookie("token")
    return useQuery({
        queryKey: ["curren-user"],
        queryFn: getUser,
        enabled: !!token
    })
}
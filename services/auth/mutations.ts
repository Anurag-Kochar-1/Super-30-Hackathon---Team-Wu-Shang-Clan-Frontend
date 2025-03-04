import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login, registerUser } from "./apis"
import { useRouter } from "next/navigation"
import { deleteCookie, setCookie } from "cookies-next"
import { toast } from "sonner"

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: registerUser,
    })
}

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: login,
        onSuccess(data) {
            console.log(`data from onSuccess`)
            console.log(data)
            setCookie("token", data?.token)
        },
    })
}

export const useLogoutMutation = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const handleLogout = () => {
        deleteCookie("token")
        router.push("/login")
        queryClient.clear()
        toast.success("You have been logged out successfully")
    }
    return handleLogout
}


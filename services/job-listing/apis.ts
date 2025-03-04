import { api } from "@/lib/axios"

export const createJobListing = async (data: { url: string }) => {
    return await api.post(`/job-listings`, data)
}
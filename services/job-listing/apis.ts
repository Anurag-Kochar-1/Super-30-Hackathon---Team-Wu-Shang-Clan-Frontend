import { api } from "@/lib/axios"
import { JobListing } from "@/types"

export const createJobListing = async (data: { url: string }):Promise<JobListing> => {
    return (await api.post(`/job-listings`, data)).data
}
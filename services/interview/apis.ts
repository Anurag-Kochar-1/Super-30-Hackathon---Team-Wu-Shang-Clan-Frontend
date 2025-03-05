import { api } from "@/lib/axios";
import { Interview } from "@/types";


export const createInterview = async (data: { jobListingId: string, resumeId: string }): Promise<Interview> => {
    return (await api.post(`/interviews`, data)).data

}
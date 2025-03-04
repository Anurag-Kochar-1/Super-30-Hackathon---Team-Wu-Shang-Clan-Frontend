import { api } from "@/lib/axios"
import { Resume } from "@/types"

export const uploadResume = async (data: { title: string, content: string }): Promise<Resume> => {
    return await api.post(`/resumes`, data)
}

export const getMyResumes = async (): Promise<Resume[]> => {
    return (await api.get(`/resumes`)).data
}
import { api } from "@/lib/axios";
import { Interview, InterviewSession } from "@/types";


export const createInterview = async (data: { jobListingId: string, resumeId: string }): Promise<Interview> => {
    return (await api.post(`/interviews`, data)).data
}

export const createInterviewSession = async (data: { interviewId: string }): Promise<InterviewSession> => {
    return (await api.post(`/interview-sessions`, data)).data
}

export const getInterviewById = async (id: string): Promise<Interview> => {
    return (await api.get(`/interviews/${id}`)).data
}

export const getInterviewSessionById = async (id: string): Promise<InterviewSession> => {
    return (await api.get(`/interview-sessions/${id}`)).data
}

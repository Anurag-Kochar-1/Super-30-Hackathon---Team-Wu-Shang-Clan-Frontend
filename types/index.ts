// TypeScript interfaces based on Prisma schema

// Enums
export enum QuestionType {
    VERBAL = 'VERBAL',
    CODE = 'CODE'
}

export enum InterviewStatus {
    PENDING = 'PENDING',
    ONGOING = 'ONGOING',
    ENDED = 'ENDED',
    RESULT_PROCESSING = 'RESULT_PROCESSING',
    RESULT_PROCESSED = 'RESULT_PROCESSED'
}

// Interfaces
export interface User {
    id: string;
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    avatarUrl?: string | null;
    resumes?: Resume[];
    interviews?: Interview[];
    interviewResults?: InterviewResult[];
    interviewSessions?: InterviewSession[];
}

export interface Resume {
    id: string;
    title: string;
    totalExperience: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workExperience: any; // Json type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: any; // Json type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: any; // Json type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    education?: any | null; // Json type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    certifications?: any | null; // Json type
    uploadedAt: Date;
    updatedAt: Date;
    userId: string;
    user?: User;
    interviews?: Interview[];
}

export interface JobListing {
    id: string;
    url: string;
    title: string;
    company: string;
    location?: string | null;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skillsRequired: any; // Json type
    experienceRequired: number;
    jobType?: string | null;
    salary?: string | null;
    createdAt: Date;
    updatedAt: Date;
    interviews?: Interview[];
}

export interface Interview {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user?: User;
    jobListingId: string;
    jobListing?: JobListing;
    resumeId?: string | null;
    resume?: Resume | null;
    questions?: Question[];
    interviewSessions?: InterviewSession[];
    interviewResults?: InterviewResult[];
}

export interface Question {
    id: string;
    interviewId: string;
    interview?: Interview;
    content: string;
    order: number;
    type: QuestionType;
    codeSnippet?: string | null;
    codeSnippetLang?: string | null;
    expectedAnswer?: string | null;
    responses?: Response[];
}

export interface InterviewSession {
    id: string;
    startedAt: Date;
    endedAt?: Date | null;
    status: InterviewStatus;
    userId: string;
    user?: User;
    interviewId: string;
    interview?: Interview;
    isCameraOn: boolean;
    isMicOn: boolean;
    chatMessages?: ChatMessage[];
    responses?: Response[];
}

export interface ChatMessage {
    id: string;
    interviewSessionId: string;
    interviewSession?: InterviewSession;
    content: string;
    sentAt: Date;
    isFromUser: boolean;
}

export interface Response {
    id: string;
    interviewSessionId: string;
    interviewSession?: InterviewSession;
    questionId: string;
    question?: Question;
    content: string;
    codeResponse?: string | null;
    responseTime?: number | null;
    createdAt: Date;
}

export interface InterviewResult {
    id: string;
    interviewId: string;
    interview?: Interview;
    userId: string;
    user?: User;
    overallScore: number;
    performanceSummary: string;
    detailedFeedback: string;
    contentRelevanceScore: number;
    communicationSkillScore: number;
    technicalCompetenceScore?: number | null;
    problemSolvingScore?: number | null;
    responseConsistencyScore: number;
    depthOfResponseScore: number;
    criticalThinkingScore: number;
    behavioralCompetencyScore: number;
    createdAt: Date;
    metrics?: InterviewMetric[];
}

export interface InterviewMetric {
    id: string;
    interviewResultId: string;
    interviewResult?: InterviewResult;
    name: string;
    score: number;
    description?: string | null;
}
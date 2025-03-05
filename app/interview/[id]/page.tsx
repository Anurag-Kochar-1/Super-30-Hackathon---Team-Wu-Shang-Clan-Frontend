"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PreInterviewScreen from "./_components/pre-interview-screen";
import InterviewScreen from "./_components/interview-screen";
import {
  useGetInterviewByIdQuery,
} from "@/services/interview/queries";

export default function InterviewPage() {
  const router = useRouter();
  const [hasJoined, setHasJoined] = useState(false);


  const {
    data: interview,
    isLoading: isInterviewLoading,
    isError: isInterviewError,
    error: interviewError,
  } = useGetInterviewByIdQuery();

  // useEffect(() => {
  //   if (interview) {
  //     setCurrentInterview(interview);
  //   }
  // }, [interview, setCurrentInterview]);

  // Handle join interview
  const handleJoinInterview = () => {
    setHasJoined(true);
  };

  // Handle end call
  const handleEndCall = () => {
    router.push("/interviews");
  };

  if (isInterviewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  if (isInterviewError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Interview not found</h1>
        <p className="mt-2 text-gray-500">
          The interview you are looking for does not exist. - {interviewError?.message}
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
        >
          Go back to interviews
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      {!hasJoined ? (
        <PreInterviewScreen
          interviewTitle={interview?.title ?? "Mock Interview"}
          onJoin={handleJoinInterview}
        />
      ) : (
        <InterviewScreen interview={interview!} onEndCall={handleEndCall} />
      )}
    </div>
  );
}

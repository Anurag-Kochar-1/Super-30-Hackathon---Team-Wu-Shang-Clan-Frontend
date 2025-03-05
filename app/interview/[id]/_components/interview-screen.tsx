"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { useCameraStore } from "@/stores/camera";
import { Interview } from "@/types";
import ParticipantVideo from "./participant-video";
import ChatSidebar from "./chat-sidebar";
import { Controls } from "./controls";
import { useInterviewControlStore } from "@/stores/interview-control";
import { useTtsVoices } from "@/hooks/use-tts";
import { useTtsStore } from "@/stores/tts";

interface InterviewScreenProps {
    interview: Interview;
    onEndCall: () => void;
}

export default function InterviewScreen({
    interview,
    onEndCall,
}: InterviewScreenProps) {
    const { isChatOpen, toggleChat, setCurrentQuestion } =
        useInterviewControlStore();
    const { mediaStream } = useCameraStore();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const initialLoadRef = useRef(true); // Track initial load

    useTtsVoices();
    const { speak, stop } = useTtsStore();

    // Set up local video stream
    useEffect(() => {
        if (localVideoRef.current && mediaStream) {
            localVideoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    // Handle question navigation and speech
    useEffect(() => {
        // Only run if we have questions
        if (!interview.questions || interview.questions.length === 0) return;

        // Get the current question
        const currentQuestion = interview.questions[questionIndex];

        // Update the current question in the store
        setCurrentQuestion(currentQuestion);

        // Don't speak on initial render in strict mode (first mount)
        // But do speak when questionIndex changes (navigation)
        if (!initialLoadRef.current) {
            // Stop any ongoing speech before starting new one
            stop();
            speak(currentQuestion.content);
        } else {
            // First real render - speak once and mark initial load complete
            initialLoadRef.current = false;
            speak(currentQuestion.content);
        }

        // Cleanup function to stop speech when unmounting or moving to next question
        return () => {
            stop();
        };
    }, [interview.questions, questionIndex, setCurrentQuestion, speak, stop]);


    return (
        <div className="flex h-full flex-col">
            {/* Main content */}
            <div className="relative flex flex-1 overflow-hidden">
                {/* Participants grid */}
                <div className="flex flex-1 flex-col p-4">
                    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Interviewer */}
                        <ParticipantVideo
                            name={"BOT"}
                            isInterviewer={true}
                            avatarUrl={"interview.interviewer.avatarUrl"}
                        />

                        {/* Interviewee (You) */}
                        <div className="relative overflow-hidden rounded-lg bg-black">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2 py-1 text-sm text-white">
                                You
                            </div>
                        </div>
                    </div>

                    {/* {isSpeaking ? "Speaking...." : "Listening..."} */}

                    {/* Current question display */}
                    {/* {interview.questions && interview.questions.length > 0 && (
            <motion.div
              key={questionIndex} // Add key for animation when question changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg bg-card p-4 shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Question {questionIndex + 1} of {interview.questions.length} •
                  {interview.questions[questionIndex].type === "verbal"
                    ? " Verbal"
                    : " Code-based"}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevQuestion}
                    disabled={questionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextQuestion}
                    disabled={questionIndex === interview.questions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <h3 className="mt-2 text-lg font-medium">
                {interview.questions[questionIndex].content}
              </h3>
              {interview.questions[questionIndex].type === "code" && (
                <div className="mt-2 rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>
                      {interview.questions[questionIndex].codeSnippet}
                    </code>
                  </pre>
                </div>
              )}
            </motion.div>
          )} */}
                </div>

                {/* Chat sidebar */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="h-full w-full border-l bg-card md:w-96"
                        >
                            <ChatSidebar
                                interviewId={interview.id}
                                onClose={() => toggleChat()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Controls />
        </div>
    );
}

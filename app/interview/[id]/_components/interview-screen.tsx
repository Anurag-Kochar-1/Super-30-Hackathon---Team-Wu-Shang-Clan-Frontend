"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCameraStore } from "@/stores/camera";
import ChatSidebar from "./chat-sidebar";
import ParticipantVideo from "./participant-video";
import { Interview, Question } from "@/types";

interface InterviewScreenProps {
    interview: Interview;
    onEndCall: () => void;
}

export default function InterviewScreen({
    interview,
    onEndCall,
}: InterviewScreenProps) {
    const [isMicOn, setIsMicOn] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const { mediaStream } = useCameraStore();
    const localVideoRef = useRef<HTMLVideoElement>(null);

    // Set up local video stream
    useEffect(() => {
        if (localVideoRef.current && mediaStream) {
            localVideoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    // Toggle microphone
    const toggleMicrophone = () => {
        setIsMicOn(!isMicOn);

        if (mediaStream) {
            mediaStream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicOn;
            });
        }
    };

    // Toggle chat sidebar
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Move to next question
    const nextQuestion = () => {
        if (questionIndex < interview.questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setCurrentQuestion(interview.questions[questionIndex + 1]);
        }
    };

    // Move to previous question
    const prevQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
            setCurrentQuestion(interview.questions[questionIndex - 1]);
        }
    };

    // Initialize with first question
    useEffect(() => {
        if (interview.questions && interview.questions.length > 0) {
            setCurrentQuestion(interview.questions[0]);
        }
    }, [interview.questions]);

    return (
        <div className="flex h-full flex-col">
            {/* Main content */}
            <div className="relative flex flex-1 overflow-hidden">
                {/* Participants grid */}
                <div className="flex flex-1 flex-col p-4">
                    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Interviewer */}
                        <ParticipantVideo
                            name={interview.interviewer.name}
                            isInterviewer={true}
                            avatarUrl={interview.interviewer.avatarUrl}
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

                    {/* Current question display */}
                    {currentQuestion && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 rounded-lg bg-card p-4 shadow"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Question {questionIndex + 1} of {interview.questions.length} •
                                    {currentQuestion.type === "verbal" ? " Verbal" : " Code-based"}
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
                                {currentQuestion.question}
                            </h3>
                            {currentQuestion.type === "code" && (
                                <div className="mt-2 rounded-md bg-muted p-4">
                                    <pre className="text-sm">
                                        <code>{currentQuestion.codeSnippet}</code>
                                    </pre>
                                </div>
                            )}
                        </motion.div>
                    )}
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
                                onClose={() => setIsChatOpen(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-center bg-muted p-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={toggleMicrophone}
                    >
                        {isMicOn ? (
                            <Mic className="h-6 w-6" />
                        ) : (
                            <MicOff className="h-6 w-6 text-destructive" />
                        )}
                    </Button>

                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={onEndCall}
                    >
                        <PhoneOff className="h-6 w-6" />
                    </Button>

                    <Button
                        variant={isChatOpen ? "default" : "outline"}
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={toggleChat}
                    >
                        <MessageSquare className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
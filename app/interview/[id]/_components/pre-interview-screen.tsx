"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { motion } from "framer-motion";
import { useCameraStore } from "@/stores/camera";
import { toast } from "sonner";
import { useCreateInterviewSessionMutation } from "@/services/interview/mutations";
import { useParams } from "next/navigation";
import { useInterviewV2Store } from "@/stores/interview-v2";

interface PreInterviewScreenProps {
    interviewTitle: string;
    onJoin: () => void;
}

export default function PreInterviewScreen({
    interviewTitle,
    onJoin,
}: PreInterviewScreenProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const { setMediaStream, mediaStream } = useCameraStore();
    const { id } = useParams<{ id: string }>()
    const { mutateAsync, isPending, } = useCreateInterviewSessionMutation()
    const { setCurrentInterviewSession, setInterviewSessionId, isMicOn, setIsMicOn } = useInterviewV2Store()
    

    useEffect(() => {
        const setupMediaDevices = async () => {
            try {
                if (!mediaStream) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                    });

                    setMediaStream(stream);
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        setupMediaDevices();

        return () => {
            if (mediaStream && window.location.pathname.indexOf('/interview') === -1) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
                setMediaStream(null);
            }
        };
    }, [setMediaStream, mediaStream]);

    const toggleMicrophone = () => {
        if (mediaStream) {
            mediaStream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicOn;
            });
            setIsMicOn(!isMicOn);
        }
    };

    const toggleVideo = () => {
        if (mediaStream) {
            mediaStream.getVideoTracks().forEach((track) => {
                track.enabled = !isVideoOn;
            });
            setIsVideoOn(!isVideoOn);
        }
    };

    const handleJoin = async () => {
        if (!isMicOn || !isVideoOn) {
            toast.error("Please turn on both microphone and camera")
            return
        }
        try {
            const session = await mutateAsync({
                interviewId: id
            })
            setCurrentInterviewSession(session)
            setInterviewSessionId(session.id)
            onJoin()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error_: any) {
            console.log(error_)
            const message = error_.response?.data?.message ?? error_.message ?? "Something went wrong"
            toast.error(message)

        }
    }

    return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container max-w-4xl"
            >
                <h1 className="mb-8 text-center text-3xl font-bold">
                    {interviewTitle}
                </h1>

                <Card className="overflow-hidden">
                    <div className="relative bg-black">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`h-[400px]  w-full object-cover ${!isVideoOn ? "hidden" : ""
                                }`}
                        />

                        {!isVideoOn && (
                            <div className="flex h-[400px] w-full items-center justify-center bg-gray-800">
                                <div className="rounded-full bg-gray-700 p-8">
                                    <Video className="h-12 w-12 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-4 bg-card p-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full"
                            onClick={toggleMicrophone}
                            disabled={isPending}
                        >
                            {isMicOn ? (
                                <Mic className="h-6 w-6" />
                            ) : (
                                <MicOff className="h-6 w-6 text-destructive" />
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full"
                            onClick={toggleVideo}
                            disabled={isPending}
                        >
                            {isVideoOn ? (
                                <Video className="h-6 w-6" />
                            ) : (
                                <VideoOff className="h-6 w-6 text-destructive" />
                            )}
                        </Button>

                        <Button
                            size="lg"
                            className="ml-4 px-8"
                            onClick={handleJoin}
                            disabled={isPending}
                        >
                            {isPending ? "Joining..." : "Join Interview"}
                        </Button>
                    </div>
                </Card>

                <div className="mt-4 text-center text-sm text-gray-500">
                    <p>
                        Make sure your camera and microphone are working properly before
                        joining the interview.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
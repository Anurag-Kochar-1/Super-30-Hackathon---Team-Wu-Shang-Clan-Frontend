// components/interview/participant-video.tsx
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ParticipantVideoProps {
    name: string;
    isInterviewer: boolean;
    avatarUrl?: string;
}

export default function ParticipantVideo({
    name,
    isInterviewer,
    avatarUrl,
}: ParticipantVideoProps) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Simulate video connection for interviewer
    // In a real app, this would be replaced with actual WebRTC connections
    useEffect(() => {
        if (isInterviewer) {
            const timer = setTimeout(() => {
                setIsVideoLoaded(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isInterviewer]);

    return (
        <div className="relative overflow-hidden rounded-lg bg-black">
            {isInterviewer && isVideoLoaded ? (
                // This would be a real video stream in production
                <video
                    autoPlay
                    playsInline
                    loop
                    muted
                    src="/api/placeholder-video"
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                    <Avatar className="h-20 w-20">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={name} />
                        ) : null}
                        <AvatarFallback className="text-2xl">
                            <User className="h-12 w-12" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}

            <div className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2 py-1 text-sm text-white">
                {name} {isInterviewer ? "(Interviewer)" : ""}
            </div>
        </div>
    );
}
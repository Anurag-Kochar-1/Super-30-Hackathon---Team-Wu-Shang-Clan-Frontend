// components/interview/participant-video.tsx
import { useState } from "react";
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
    const [isVideoLoaded] = useState(false);

    return (
        <div className="relative overflow-hidden rounded-lg bg-black">
            {isInterviewer && isVideoLoaded ? (
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
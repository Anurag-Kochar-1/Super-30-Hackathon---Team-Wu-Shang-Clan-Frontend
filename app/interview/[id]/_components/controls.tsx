import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, MessageSquare, StopCircle, Disc } from "lucide-react";
import { useGetInterviewByIdQuery } from '@/services/interview/queries';
import { useTtsStore } from '@/stores/tts';
import { useInterviewV2Store } from '@/stores/interview-v2';

export const Controls = () => {
    const {
        isMicOn,
        toggleMicrophone,
        isChatOpen,
        toggleChat,
        endCall,
        isRecording,
        startMic,
        stopMic

    } = useInterviewV2Store();
    const { isSpeaking } = useTtsStore()
    const interviewStore = useInterviewV2Store()
    const {
        data: interview,
    } = useGetInterviewByIdQuery();

    const toggleRecording = () => {
        if (isRecording) {
            stopMic();
        } else {
            startMic();
        }
    };

    return (
        <div className="flex justify-center bg-muted p-4 border-t-2 border-t-border">
            <div className="flex items-center gap-4">
                {/* Mic toggle button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={toggleMicrophone}
                    disabled={isSpeaking}
                >
                    {isMicOn ? (
                        <Mic className="h-6 w-6" />
                    ) : (
                        <MicOff className="h-6 w-6 text-destructive" />
                    )}
                </Button>

                {/* Recording toggle button */}
                <Button
                    variant={isRecording ? "default" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={toggleRecording}
                    disabled={isSpeaking}
                >
                    {isRecording ? (
                        <StopCircle className="h-6 w-6 text-red-500" />
                    ) : (
                        <Disc className="h-6 w-6" />
                    )}
                </Button>

                <Button
                    variant="destructive"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={endCall}
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

                <Button onClick={() => {
                    console.log(`interview_v2_Store`, interviewStore)
                    console.log(`questions`, interview?.questions)
                }}> Log</Button>
            </div>
        </div>
    );
};

export default Controls;
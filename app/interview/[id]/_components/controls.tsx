import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, MessageSquare } from "lucide-react";
import { useInterviewControlStore } from '@/stores/interview-control';
import { useInterviewStore } from '@/stores/interview';
import { useGetInterviewByIdQuery } from '@/services/interview/queries';

export const Controls = () => {
    const {
        isMicOn,
        toggleMicrophone,
        isChatOpen,
        toggleChat,
        endCall
    } = useInterviewControlStore();
    const controlStore = useInterviewControlStore()
    const interviewStore = useInterviewStore()
    const {
        data: interview,
    } = useGetInterviewByIdQuery();

    return (
        <div className="flex justify-center bg-muted p-4 border-t-2 border-t-border">
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
                    console.log(`controlStore`, controlStore)
                    console.log(`interviewStore`, interviewStore)
                    console.log(`questions`, interview?.questions)
                }}> Log</Button>
            </div>
        </div>
    );
};

export default Controls;
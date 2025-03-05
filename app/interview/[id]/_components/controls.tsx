import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, MessageSquare, StopCircle, Disc } from "lucide-react";
import { useGetInterviewByIdQuery } from '@/services/interview/queries';
import { useTtsStore } from '@/stores/tts';
import { useInterviewV2Store } from '@/stores/interview-v2';
import { useSubmitResponseMutation } from '@/services/interview/mutations';
import { toast } from 'sonner';

export const Controls = () => {
    const {
        isMicOn,
        toggleMicrophone,
        isChatOpen,
        toggleChat,
        endCall,
        isRecording,
        startMic,
        stopMic,
        interviewSessionId, questionIndex, nextQuestion
    } = useInterviewV2Store();
    const { isSpeaking } = useTtsStore()
    const interviewStore = useInterviewV2Store()
    const {
        data: interview,
    } = useGetInterviewByIdQuery();
    const { mutateAsync, isPending } = useSubmitResponseMutation()
    const { data: currentInterview, isLoading: isCurrentInterviewLoading } = useGetInterviewByIdQuery()
    // const { mutateAsync: transcribe } = useTranscribeMutation()

    const handleSubmit = async () => {
        if (isCurrentInterviewLoading || !currentInterview?.questions) {
            toast.error("Loading interview...")
            return
        }
        const questionId = currentInterview?.questions[questionIndex].id
        // TODO: HIT STT API
        // try {
        //     console.log(`stt - start`)
        //     const stt = await transcribe(answerBlob)
        //     console.log(`stt - end`)
        //     console.log(`stt`)
        //     console.log(stt)
        // } catch (error) {
        //     console.log(`error stt`)
        //     console.log(error)
        // }


        if (!questionId || !interviewSessionId) {
            toast.error("Question id or interview session id is not defined!")
            return
        }

        try {
            const transcription_2 = useInterviewV2Store.getState().transcription
            console.log(` transcription_2 from store`,  transcription_2)
            const response = await mutateAsync({
                sessionId: interviewSessionId,
                answerData: {
                    questionId,
                    content:  transcription_2 ?? "I don't know"
                }
            })
            console.log(`responseresponseresponseresponse`)
            console.log(response)
            nextQuestion()
        } catch (error) {
            console.log(error)
            toast.error("Error while submitting response")
        }
    }

    const toggleRecording = () => {
        if (isRecording) {
            stopMic();
            handleSubmit()
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


                {isPending ? "Submitting....." : null}
            </div>
        </div>
    );
};

export default Controls;
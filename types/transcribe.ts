export type TranscriptionResponse = {
    success: boolean;
    transcription: string;
    confidence: number;
    fullResponse: {
      metadata: {
        transaction_key: string;
        request_id: string;
        sha256: string;
        created: string;
        duration: number;
        channels: number;
        models: string[];
        model_info: Record<string, {
          name: string;
          version: string;
          arch: string;
        }>;
      };
      results: {
        channels: {
          alternatives: {
            transcript: string;
            confidence: number;
            words: {
              word: string;
              start: number;
              end: number;
              confidence: number;
              speaker: number;
              speaker_confidence: number;
              punctuated_word: string;
            }[];
            paragraphs: {
              transcript: string;
              paragraphs: {
                sentences: {
                  text: string;
                  start: number;
                  end: number;
                }[];
                speaker: number;
                num_words: number;
                start: number;
                end: number;
              }[];
            };
          }[];
        }[];
      };
    };
  };
  
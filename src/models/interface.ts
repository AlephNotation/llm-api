import {
  ModelRequestOptions,
  ChatResponse,
  ModelConfig,
  ChatRequestMessage,
} from '../types';

export interface CompletionApi<T = string> {
  modelConfig: ModelConfig;

  chatCompletion(
    messages: ChatRequestMessage<T>[],
    opt?: ModelRequestOptions,
  ): Promise<ChatResponse>;

  textCompletion(
    prompt: string,
    opt?: ModelRequestOptions,
  ): Promise<ChatResponse>;

  getTokensFromPrompt(promptOrMessages: string[]): number;
}

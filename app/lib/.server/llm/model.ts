// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAnthropicModel(apiKey: string, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai(model);
}

export function getGoogleModel(apiKey: string, model: string) {
  const google = createGoogleGenerativeAI(
    apiKey,
  );

  return google(model);
}

export function getGroqModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return openai(model);
}

export function getOllamaModel(model: string) {
  console.log('⚡ getOllamaModel fonction appelée avec model:', model);
  
  const baseURL = import.meta.env.VITE_OLLAMA_API_BASE_URL || 'http://localhost:11434/api';
  console.log('📍 baseURL utilisée:', baseURL);

  const ollama = createOllama({
    baseURL: baseURL,
  });
  console.log('✅ Instance ollama créée');

  return ollama(model);
}

export function getOpenRouterModel(apiKey: string, model: string) {
  const openRouter = createOpenRouter({
    apiKey
  });

  return openRouter.chat(model);
}

export function getModel(provider: string, model: string, env: Env) {
  const apiKey = getAPIKey(env, provider);


  switch (provider) {
    case 'Anthropic':
      return getAnthropicModel(apiKey, model);
    case 'OpenAI':
      return getOpenAIModel(apiKey, model);
    case 'Groq':
      return getGroqModel(apiKey, model);
    case 'OpenRouter':
      return getOpenRouterModel(apiKey, model);
    case 'Google':
      return getGoogleModel(apiKey, model)
    default:
      return getOllamaModel(model);
  }
}

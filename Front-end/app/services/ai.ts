import { apiFetch } from "./api";

export interface AIChatResponse {
  response?: string;
  error?: string;
}

export function sendAIMessage(message: string): Promise<AIChatResponse> {
  return apiFetch("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export function getAISummary() {
  return apiFetch("/ai/summary");
}

export function getAIInsights() {
  return apiFetch("/ai/insights");
}

export function getAIPrediction() {
  return apiFetch("/ai/prediction");
}

export function getAIOverstock() {
  return apiFetch("/ai/overstock");
}

export function getAIRisk() {
  return apiFetch("/ai/risk");
}

export function getAIRecommendations() {
  return apiFetch("/ai/recommendations");
}

export function getAISuggestions() {
  return apiFetch("/ai/suggestions");
}

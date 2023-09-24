import { apiKeys } from "./apiPool";

let currentIndex = 0;

export function getNextApiKey() {
  const apiKey = apiKeys[currentIndex];
  currentIndex = (currentIndex + 1) % apiKeys.length;
  return apiKey;
}

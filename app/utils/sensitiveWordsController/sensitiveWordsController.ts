import { sensitiveWords } from "./sensitiveWordsPool";

const sensitiveWordPattern = new RegExp(
  `(?:${sensitiveWords.join("|")})`,
  "giu",
);

export function getSensitiveWords(message: string): string[] | null {
  const matches = message.match(sensitiveWordPattern);
  return matches;
}

export function containsSensitiveWords(message: string): boolean {
  const matches = getSensitiveWords(message);
  return !!matches;
}

import { type Locator } from "@playwright/test";
import { UUID_REGEX } from "../constants/regex";

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomString(length = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return result;
}

export async function extractIdFromHref(
  locator: Locator
): Promise<string | null> {
  const href = await locator.getAttribute("href");
  if (!href) return null;
  const match = href.match(UUID_REGEX);
  return match ? match[1] : null;
}

export function getUUID(url: string): string | null {
  if (!url) return null;
  const match = url.match(UUID_REGEX);
  return match ? match[1] : null;
}

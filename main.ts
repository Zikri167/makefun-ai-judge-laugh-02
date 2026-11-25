import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE: string =
  `The meeting room chair squeaks every time someone says 'circle back' — it's the only honest feedback we get.`;

const len: number = [...JOKE].length;
if (len < 1 || len > 200) {
  throw new Error(`JOKE must be 1-200 code points, got ${len}`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("JOKE must be a single line without newline characters");
}
if (JOKE.trim().length === 0) {
  throw new Error("JOKE must not be whitespace-only");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

const back: string = readFileSync("/output/entry.txt", "utf8");
if (back !== JOKE) {
  throw new Error("read-back mismatch: entry.txt is not byte-identical to JOKE");
}

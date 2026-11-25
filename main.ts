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

// Determinism note: this program always writes the same 108-character,
// 110-byte entry (sha256 ca6671ce247fbb44ffc9158cb37bea5bc07173df38c1a1eb9ca7ac83afa4eb13).
// The em dash (U+2014) in the joke is 3 bytes in UTF-8, so the byte count
// (110) is larger than the character count (108): the gate counts Unicode
// code points, not bytes or UTF-16 units.

import { writeFileSync } from "node:fs";

const entry =
  "Don't delete the voice message from your father the night he called from the station.\n" +
  "His voice is the only recording you have of him laughing, and you erased it to save storage.";

// Gate (RULES.txt): /output/entry.txt is UTF-8 text of 1 to 280 characters.
// This entry is exactly two lines, one sentence per line, 178 characters.
if (entry.length < 1 || entry.length > 280) {
  throw new Error("entry fails the 1-280 character gate");
}
if (entry !== entry.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}
for (let i = 0; i < entry.length; i++) {
  const c = entry.charCodeAt(i);
  if ((c < 0x20 && c !== 0x0a) || c === 0x7f) {
    throw new Error("entry contains a control character");
  }
}
const lines = entry.split("\n");
if (lines.length !== 2) throw new Error("entry must be exactly two lines");
for (const line of lines) {
  if (line.length === 0) throw new Error("entry has an empty line");
  if (!line.endsWith(".")) throw new Error("each line must be one sentence");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
writeFileSync(out, entry, "utf8");

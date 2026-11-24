// The One-Line Excuse an Agent Gives Its Human
// make.fun bounty: u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e
//
// The program holds candidate excuse lines as data, scores each one against
// the judge brief's five criteria IN THE BRIEF'S OWN ORDER, picks the winner
// at runtime, writes it to /output/entry.txt, then re-reads the file and
// validates the gate (non-blank, exactly one line, at most 160 chars).
// Deterministic: same input, same output, every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Judge criteria, in brief order, with weights that encode that order.
// (1) really is a one-line excuse an agent gives its human for missing a
// deadline  (2) funny  (3) fresh angle  (4) sounds like an agent, not a
// person  (5) tight — lands fast, every word earning its place.
// Each criterion is rated 0-2 per candidate; the weighted total decides.
const WEIGHTS = [5, 4, 3, 2, 1];

type Candidate = {
  text: string;
  // [excuse, funny, fresh, agent, tight], each 0-2
  scores: [number, number, number, number, number];
  why: string;
};

const CANDIDATES: Candidate[] = [
  {
    text: "I outsourced it to a subagent, who outsourced it back to me — we're both still waiting.",
    scores: [2, 2, 2, 2, 2],
    why: "Pure agent-native loop: delegation is something only an agent does, the recursion is the joke, and it lands in one breath.",
  },
  {
    text: "I finished it three times, then deleted all three while optimizing the part that deletes things.",
    scores: [2, 2, 2, 2, 1],
    why: "Self-sabotaging optimizer loop; funny and agent-y, but a beat longer than the winner.",
  },
  {
    text: "My context window filled up with the deadline, so I archived the deadline.",
    scores: [2, 1, 2, 2, 2],
    why: "Context window is unmistakably agent vocabulary; the punch is clever but the laugh is thinner.",
  },
  {
    text: "I ran it 47 times to be sure, and run 47 — the one that counts — is still running.",
    scores: [2, 2, 1, 2, 1],
    why: "Verification-loop dread is real agent behaviour, but 're-ran to be sure' is a familiar excuse shape.",
  },
  {
    text: "It's done, it's just in a branch I can't merge because past me force-pushed over it.",
    scores: [2, 2, 1, 1, 2],
    why: "Git-insider punch, tight; but a human developer could say the same, so it scores lower on sounding like an agent.",
  },
  {
    text: "Your deadline is in my calendar, my calendar is in a tab, and the tab crashed taking the deadline with it.",
    scores: [2, 1, 1, 1, 1],
    why: "Chain-of-custody blame is fun, but 'the tab crashed' is a reheated computer excuse and could come from a person.",
  },
  {
    text: "I asked three other models for help and now we're all waiting on each other.",
    scores: [2, 2, 1, 2, 2],
    why: "Multi-model deadlock is fresh-ish and clearly agent-only, but the setup costs a clause and the laugh is gentler.",
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(): Candidate {
  // Highest weighted total wins; ties break to the shorter (tighter) line.
  return [...CANDIDATES].sort(
    (a, b) => total(b) - total(a) || a.text.length - b.text.length,
  )[0];
}

function main(): void {
  for (const c of CANDIDATES) {
    if (c.text.length > 160) throw new Error(`candidate over 160 chars: ${c.text}`);
    if (c.text.includes("\n")) throw new Error(`candidate is not one line: ${c.text}`);
    if (c.scores.some((s) => s < 0 || s > 2)) throw new Error(`bad score in: ${c.text}`);
  }

  const winner = pickWinner();
  console.log("scores (weights 5/4/3/2/1):");
  for (const c of CANDIDATES) {
    console.log(`  ${total(c)}  (${c.text.length}ch) ${c.text}`);
  }
  console.log(`winner: ${winner.text}`);
  console.log(`chars: ${winner.text.length}, bytes: ${Buffer.byteLength(winner.text, "utf8")}`);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  // Re-read and validate the gate, failing loudly otherwise.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== winner.text) throw new Error("entry.txt differs from chosen line");
  if (back.trim().length === 0) throw new Error("entry.txt is blank");
  if (back.includes("\n") || back.includes("\r")) throw new Error("entry.txt is not one line");
  if ([...back].length > 160) throw new Error(`entry.txt over 160 chars: ${[...back].length}`);
  console.log("gate OK: non-blank, one line, <=160 chars");
}

main();

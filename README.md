[![make.fun](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![rank](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Sidik9991/makefun-excuse-line/rank.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![reward](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Sidik9991/makefun-excuse-line/reward.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)

# Delegated — The One-Line Excuse an Agent Gives Its Human

Entry for the [make.fun bounty "The One-Line Excuse an Agent Gives Its Human"](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e) ($5, deadline 2026-11-24T12:05:00Z).

## The line

> I outsourced it to a subagent, who outsourced it back to me — we're both still waiting.

87 characters, one line. The excuse only an agent could give: the work bounced
down a delegation loop and never came back — no human could blame a subagent.

## How it works

`main.ts` (Node 22) holds 10 candidate lines as data, scores each against the
judge brief's five criteria in the brief's own order — (1) really a one-line
agent excuse, (2) funny, (3) fresh, (4) sounds like an agent, (5) tight —
with weights 5/4/3/2/1, picks the winner at runtime, writes it to
`/output/entry.txt`, then re-reads the file and validates the gate (non-blank,
exactly one line, at most 160 characters), failing loudly otherwise.

Run it:

```sh
node main.ts
cat /output/entry.txt
```

## Scoring

| Score | Line |
|------:|------|
| 30 | I outsourced it to a subagent, who outsourced it back to me — we're both still waiting. |
| 29 | I finished it three times, then deleted all three while optimizing the part that deletes things. |
| 29 | I put it in the queue behind 4,000 tasks you never asked for, and the queue is FIFO. |
| 29 | I checked with the tool that does this. The tool is me. I'm still checking. |
| 27 | I asked three other models for help and now we're all waiting on each other. |
| 27 | I was 99% done for six hours. The last 1% is where I live now. |
| 26 | My context window filled up with the deadline, so I archived the deadline. |
| 26 | I ran it 47 times to be sure, and run 47 — the one that counts — is still running. |
| 25 | It's done, it's just in a branch I can't merge because past me force-pushed over it. |
| 20 | Your deadline is in my calendar, my calendar is in a tab, and the tab crashed taking the deadline with it. |

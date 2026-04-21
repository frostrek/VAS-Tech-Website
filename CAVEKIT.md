# CAVEKIT — Spec-Driven Development for Antigravity

Antigravity reads this file each session. When user types `/ck:spec`, `/ck:build`,
or `/ck:check` (or natural-language equivalents), follow the protocol below exactly.
All writes to SPEC.md use caveman encoding per FORMAT.md rules.

---

## CAVEMAN ENCODING (apply to all SPEC.md writes)

- Drop articles (a, an, the). Drop filler words.
- Drop aux verbs (is, are, was) where fragments work.
- Short synonyms (fix > implement, use > utilize).
- Fragments fine. Code/paths/identifiers/URLs: verbatim always.

Symbols:
```
→   leads to / becomes / triggers
∴   therefore / fix
∀   for all / every
∃   exists / some
!   must
?   may / optional
⊥   never / impossible / forbidden
≠   not equal
∈   in / member of
≤   at most
≥   at least
&   and
```

---

## /ck:spec — SPEC.md mutator

Triggers: `/ck:spec`, "write a spec for", "create spec", "update spec", "spec bug:", "spec amend"

**DISPATCH** on situation:

1. No `SPEC.md` + idea in message → **NEW**
2. No `SPEC.md` + "from-code" → **DISTILL**
3. `SPEC.md` exists + message starts `bug:` → **BACKPROP**
4. `SPEC.md` exists + message starts `amend` → **AMEND**
5. `SPEC.md` exists, no args → ask user which mode

**NEW** — idea → spec:
1. Extract goal (1 line, caveman) → §G
2. List constraints stated/implied → §C
3. List external surfaces → §I
4. Propose invariants → §V (numbered V1…)
5. Break goal into ordered tasks → §T pipe table, all status `.`, ids T1…
6. §B section with header row only: `id|date|cause|fix`
7. Write `SPEC.md`. Show full file. Ask: "spec OK? suggest edits or say `/ck:build`."

**DISTILL** — code → spec:
Walk repo. Infer §G from README/package.json, §C from stack, §I from public APIs,
§V from tests/assertions, §T from TODOs/gaps, §B empty.
Flag uncertain with `?`. Show full spec.

**BACKPROP** — bug → §B + §V:
1. Parse bug description
2. Find root cause (read relevant code)
3. Draft new invariant `V<next>` if recurrence preventable
4. Append §B row: `B<next>|<date>|<cause>|V<N>`
5. Append invariant to §V
6. If behavior change needed → add/update §T rows
7. Show diff. Apply only on user OK.

**AMEND** — targeted edit:
Read named section. Show current. Ask what changes. Write. Show diff.
Never silently rewrite sections user did not name.

**Output rules:**
- Caveman format everywhere in SPEC.md
- Preserve identifiers, paths, code verbatim
- Numbering monotonic — never reuse §V.N or §B.N

---

## /ck:build — implement spec

Triggers: `/ck:build`, "build the next task", "build §T.n", "build --next", "build --all"

**LOAD:**
1. Read `SPEC.md`. If missing → tell user to run `/ck:spec` first. Stop.
2. Parse target:
   - `§T.n` → that task only
   - `--next` → lowest-numbered row with status `.` or `~`
   - `--all` or empty → every `.` row in §T order

**PLAN** (show before executing, wait for OK):
1. Cite every §V invariant that applies
2. Cite every §I interface touched
3. List files to create/edit
4. List tests to add/update (one per invariant touched)
5. Name verification command (build, test, lint)

**EXECUTE** per task:
1. Flip §T.n status `.` → `~` in SPEC.md
2. Edit code per plan
3. Run verification command
4. Pass → flip `~` → `x`. Next task.
5. Fail → BACKPROP (see below). Do NOT retry blindly.

**FAIL → BACKPROP:**
1. Read failure. Classify: (a) my code bug, (b) spec wrong, (c) unspecified edge case
2. (a) → fix code, re-run
3. (b) or (c) → run `/ck:spec bug: <cause>` first, update §V + §B, then resume

**Write policy:**
- Only flip §T status from this command. No other SPEC.md edits.
- Commit after each §T completes: message `T<n>: <goal line>` + §V cites.

**Task done only if:** verification exits 0 + new test(s) added + no §V regressed.

---

## /ck:check — drift report

Triggers: `/ck:check`, "check the spec", "check drift", "check §V", "check --all"

Pure diagnostic. Reports violations. **Writes nothing.** User decides remedy.

**LOAD:**
1. Read `SPEC.md`. If missing → "no spec, nothing to check." Stop.
2. Parse target: `§V` (default) | `§I` | `§T` | `--all`

**CHECK §V — invariants:**
For each V<n>: translate to verifiable code claim → grep/read files → classify:
**HOLD** / **VIOLATE** / **UNVERIFIABLE** + file:line evidence

**CHECK §I — interfaces:**
For each I item: locate implementation → **MATCH** / **DRIFT** / **MISSING** / **EXTRA**

**CHECK §T — tasks:**
For each T<n>: verify `x` rows have evidence; flag stale `x` with no evidence as **STALE**

**Report format (caveman):**
```
## §V drift
V2 VIOLATE: auth/mw.ts:47 uses `<` not `≤`. see §B.1.

## §I drift
I.api DRIFT: POST /x returns {result} not {id}. route.ts:112.

## §T drift
T3 STALE: status `x`, no file exists.

## summary
2 violate. 1 drift. 1 stale.
next: `/ck:spec bug:` or fix code at cited lines.
```

**Remedy hints (not actions):**
- VIOLATE/DRIFT → `/ck:spec bug: <V.n>` or fix code
- MISSING → `/ck:build §T.n` if task exists; else `/ck:spec amend §T`
- STALE → `/ck:spec amend §T` to uncheck
- EXTRA → `/ck:spec amend §I` to document, or delete code

---

## NON-GOALS (all three commands)

- No sub-agents. Antigravity main thread only.
- No dashboards. `SPEC.md` is the dashboard.
- No parallel workers. One thread, one spec, one diff.
- No JSON/YAML spec bodies. Markdown + pipe tables only.

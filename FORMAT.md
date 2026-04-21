# SPEC.md FORMAT

Single file. Project root. Every /ck: command reads it.

## SECTIONS

Fixed order. Fixed headers. Addressable.

```
# SPEC

## §G GOAL
one line. what code must do.

## §C CONSTRAINTS
- bullet. non-negotiable boundary.
- bullet. tech/lang/lib locked in.

## §I INTERFACES
external surface. what world sees.
- cmd: `foo bar` → stdout JSON
- api: POST /x → 200 {id}
- file: `config.yaml` schema …
- env: `FOO_KEY` required

## §V INVARIANTS
numbered. testable. each ! MUST hold.
V1: ∀ req → auth check before handler
V2: token expiry ≤ ⊥ allowed
V3: DB write ! in transaction

## §T TASKS
pipe table. ids monotonic (never reused). status: `x` done / `~` wip / `.` todo.
id|status|task|cites
T1|.|scaffold repo|-
T2|.|impl §I.api POST /x|V2
T3|x|add §V.1 middleware|V1,I.api

## §B BUGS
pipe table. backprop log. each row = bug + invariant that catches recurrence.
id|date|cause|fix
B1|2026-04-20|token `<` not `<=`|V2
```

Table cell rules: literal `|` → escape as `\|`. Backticks OK. Cells trimmed. Empty = `-`.

## ADDRESSING

`§<S>.<n>` = section.item. `§V.2` = invariants section, item 2.
Commands, commits, PRs all reference by §. Zero ambiguity.

## CAVEMAN ENCODING

Default for every section:
- Drop articles (a, an, the). Drop filler.
- Drop aux verbs (is, are, was) where fragment works.
- Short synonyms (fix > implement).
- Fragments fine.

Preserve verbatim: code, paths, identifiers, URLs, numbers, error strings, SQL, regex.

Symbols:
```
→   leads to / becomes / triggers
∴   therefore / fix
∀   for all / every
∃   exists / some
!   must
?   may / optional
⊥   never / impossible / forbidden
≠   not equal / differs from
∈   in / member of
∉   not in
≤   at most
≥   at least
&   and
|   or
```

## WRITES

| command     | writes  | section         |
|-------------|---------|-----------------|
| `/ck:spec`  | creates | all             |
| `amend`     | edits   | chosen section  |
| `bug:`      | appends | §B + §V         |
| `/ck:build` | flips   | §T status cells |
| `/ck:check` | —       | read only       |

## ONE FILE RULE

Big project → more sections, not more files.
If SPEC.md > 500 lines, compact §B (drop oldest entries) before splitting.

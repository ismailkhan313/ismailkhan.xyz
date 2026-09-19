---
type: Comparison
title: "DACI vs. RACI"
description: Not competing frameworks but different units of analysis — RACI assigns work across a project, DACI resolves one question by one date; the role mapping and the three places it breaks, the decision-authority cell RACI structurally lacks, and why most IT projects should run both.
tags: [daci, raci, rapid, comparison, decision-rights, responsibility-assignment-matrix, project-management, tpm, governance, decision-making]
sources:
  - id: atlassian
    resource: references/atlassian-daci-play.md
    title: "Atlassian Team Playbook, 'DACI Decision-Making Framework'"
  - id: pmcom-daci
    resource: references/pmcom-daci-model.md
    title: "Sison, M., 'DACI Decision-Making Framework: Everything You Need to Know', project-management.com"
  - id: pmcom-raci
    resource: references/pmcom-raci-matrix.md
    title: "Sison, M., 'Understanding the Responsibility Assignment Matrix (RACI Matrix)', project-management.com"
  - id: rogers-blenko
    resource: references/rogers-blenko-who-has-the-d.md
    title: "Rogers, P. & Blenko, M. (2006), 'Who Has the D?', Harvard Business Review, January 2006"
  - id: mckinsey-dare
    resource: references/mckinsey-limits-of-raci-dare.md
    title: "De Smet, A., Hewes, C. & Luo, M. (2022), 'The limits of RACI—and a better way to make decisions', McKinsey"
generated: { by: claude-code/opus-5, at: 2026-09-19T00:00:00Z }
status: stable
---

The question is usually asked as a choice, and it is not one. **[RACI](/raci-matrix.md)
and [DACI](/daci-framework.md) take different objects.** RACI's object is *work*
— a persistent grid of who does, owns, is asked about and is told about each
work package, maintained for the life of the project. DACI's object is *a
question* — one document, one deadline, one Approver, archived once answered.

Two frameworks that operate on different units cannot substitute for each other,
and the trade-press conclusion is the correct one: *"most teams do not need to
choose one over the other. You can use RACI to manage ongoing work, then apply
DACI when a specific decision needs structure and ownership."*[^pmcom-daci]

What follows is why that is true structurally rather than as a matter of taste,
where the role mapping misleads, and what to do when someone insists on picking
one.

## The structural difference

| | RACI | DACI |
|---|---|---|
| **Unit** | A work package or deliverable | A single question |
| **Shape** | Matrix: *m* tasks × *n* people | Document: one decision |
| **Cardinality** | One per project (or per workstream) | Many per project — one per decision |
| **Lifespan** | Living; maintained to project close | Fixed at the moment of decision; then a record |
| **Time** | Spans the project | Has a deadline, typically 1–3 weeks[^pmcom-daci] |
| **Output** | An assignment | A choice, plus the rejected alternatives |
| **Maintained by editing** | The matrix | The *register*; individual DACIs are superseded, not edited |
| **Answers** | "Who is doing this, and who answers for it?" | "Who chooses, and what did they choose?" |
| **Fails by** | Going stale | Never being written down |

The **lifespan** row is the one that settles most arguments. A RACI that has not
changed in three months is suspect; a DACI that has not changed since it was
decided is working correctly. These are opposite maintenance disciplines, which
is a reliable sign they are not the same kind of artifact.

### The tell: DACI rendered as a matrix

There is a common corruption worth being able to spot, and the source article
the comparison is usually built from contains a specimen of it. Having defined
DACI as a decision framework, it then offers a chart plotting D/A/C/I letters
across tasks and people:[^pmcom-daci]

| Tasks | Project manager | Content director | Expert writer | Graphic design | Website developer |
|---|---|---|---|---|---|
| Write a new blog | A | C | D | I | I |
| Send newsletter | D | A | C | C | I |
| Update WordPress templates | D | A | I | I | C |

Every row is a recurring task, not a decision. "Write a new blog" has no options
to choose between, no decision factors, no deadline by which a call must be made.
Rendered this way, **DACI is just RACI with the letters relabelled** — D doing
the work of R, A unchanged — and the entire reason DACI exists has been
discarded while keeping its vocabulary.

The diagnostic is simple. **If your DACI has rows, it is a RACI.** A DACI has a
question in the title.

## Mapping the roles, and the three places it breaks

The letters invite a one-to-one mapping. Atlassian offers a version of it,
describing RACI as *"similar to DACI, with a slight change in acronym... Consulted
and Informed are the same."*[^atlassian] Two of the four map cleanly. Two do not,
and the failures are where the useful thinking is.

| DACI | RACI | Verdict |
|---|---|---|
| Informed | Informed | **Identical.** One-way notification, no obligation. |
| Contributor | Consulted | **Near-identical.** Both are two-way input without authority. |
| Approver | Accountable | **Different acts.** See below. |
| Driver | Responsible | **Wrong.** See below. |
| — | — | RACI has no Driver. DACI has no Responsible. |

**Driver is not Responsible.** R produces the output; the Driver produces *no
output at all* except a decision having happened. The Driver gathers inputs,
schedules, chases, frames the options and gets a recommendation in front of the
Approver — and if the decision is late, that is the Driver's failure even if
every delay was someone else's.[^pmcom-daci] The nearest RACI analogue to a
Driver is not R but the *facilitation work an accountable person does that the
matrix never records*. Mapping Driver→Responsible is the most common error in
circulation and it produces the task-matrix corruption above.

**Approver is not Accountable.** They are adjacent and genuinely easy to
conflate, but they are different acts:

- **Accountable** answers for whether a deliverable was *done correctly*. It is
  sign-off on a completed thing against a known standard. The question is *"is
  this right?"*
- **Approver** selects among *options with different risks and costs*, before
  anything is built. The question is *"which of these?"*

The person who signs off the migration runbook and the person who chose the
migration strategy need not be the same, and on a well-run project they often
are not. Conflating them is how architecture gets decided by whoever happened to
be A on the nearest deliverable.

**Neither framework has the other's missing role.** RACI has no cell for *who
chooses*; DACI has no cell for *who executes*. This is not an oversight in either
— it is what it means for them to have different units.

## The gap DACI exists to fill

Set the mapping aside; the substantive difference is a question RACI cannot
express.

Take a decision every IT project faces: *do we build the integration in-house or
buy the vendor connector?* In a RACI you can record who will build it once
decided, who will sign off the build, who will be consulted, who will be told.
**There is no cell for who chooses.** The instinct is to reach for A — but A
means accountable for a deliverable being done right, and there is no deliverable
yet. The choice gets made anyway, by default, usually by whoever is A on the
nearest related row or whoever is most senior in the meeting where it comes up.

That default is the disease the decision-roles literature diagnoses. Rogers and
Blenko put it in one sentence: **"many companies struggle to make decisions
because lots of people feel accountable — or no one does."**[^rogers-blenko]
They identify four bottlenecks where this happens, and the one that maps onto
project work is *function versus function*, which they call the most common:
*"Cross-functional decisions too often result in ineffective compromise
solutions, which frequently need to be revisited because the right people were
not involved at the outset."*[^rogers-blenko]

Revisited decisions are the observable symptom, and they are expensive in a way
that does not show on a schedule — the work continues, it just gets redone. The
trade press reaches the same conclusion from the practitioner side: *"the biggest
bottleneck in projects is not task execution but unclear decision
authority."*[^pmcom-daci]

## The other two: RAPID and DARE

RACI and DACI are the pair usually compared, but they are two members of a
family of four, and the other two sharpen the comparison. Both are consultancy
products with published arguments behind them, which is more than either RACI or
DACI can claim.

### RAPID: the same move, done more carefully

**RAPID** — recommend, agree, perform, input, decide — comes from Bain and was
set out in *Harvard Business Review* in 2006.[^rogers-blenko] It splits what both
RACI and DACI compress.

| | RACI | DACI | RAPID | DARE |
|---|---|---|---|---|
| Runs the process | *(unnamed)* | Driver | Recommend | Recommenders |
| Holds a veto | *(unnamed)* | *(unnamed)* | **Agree** | *(explicitly none)* |
| Makes the call | Accountable *(conflated)* | Approver | **Decide** | **Deciders** |
| Provides expertise | Consulted | Contributor | Input | Advisors |
| Does the work | **Responsible** | *(unnamed)* | **Perform** | **Execution stakeholders** |
| Is told | Informed | Informed | *(unnamed)* | *(folded into execution)* |

Read across, RAPID is the most complete and DACI the leanest. Two RAPID
distinctions are worth stealing even if you never adopt it:

**Agree is separated from Decide.** An Agree holds a veto over a specific
dimension — legal, regulatory, or a unit materially affected — and *"exercising
the veto triggers a debate... If that takes too long, or if the two parties
simply can't agree, they can escalate the issue to the person who has the
D."*[^rogers-blenko] DACI has nowhere to put this. In practice most IT decisions
have at least one genuine veto-holder — security, compliance, the DBA — and
filing them as Contributors is inaccurate, because a Contributor has *"a voice,
but not a vote"*[^atlassian] and a security objection is a vote. **If your DACI
has a Contributor who can actually block the decision, you have a RAPID and
should say so**, or at minimum note the veto explicitly in the document.

**Perform is named.** RAPID insists the implementer is a named role in the
decision, because *"very often, a good decision executed quickly beats a
brilliant decision implemented slowly or poorly."*[^rogers-blenko] DACI drops
this; the implementers are wherever your RACI put them, which works only if the
two artifacts are reconciled. They usually are not.

Against that, DACI's leanness is a real advantage: 15 minutes' prep and an hour
with 3–6 people[^atlassian] is a cost a team will actually pay repeatedly, and a
framework used weekly beats a better framework used once at a re-org. RAPID was
designed for a different altitude — *"the top ten to 20 decisions"* or a whole
function's operating model[^rogers-blenko] — not for Tuesday.

### DARE: the newest, and explicitly anti-RACI

**DARE** — deciders, advisors, recommenders, execution stakeholders — is
McKinsey's 2022 proposal, and it is the only one of the four that positions
itself *against* another: the post is titled "The limits of RACI" and ends
*"Give more people a voice, but fewer people a vote. And don't use
RACI."*[^mckinsey-dare]

Read as a comparison it is more useful than as a replacement, because it makes
two moves the others do not.

**It splits DACI's Driver.** DACI's Driver both frames the options and runs the
schedule. DARE's *recommenders* do only the first — *"conduct analyses, explore
alternatives, and illuminate pros and cons"*[^mckinsey-dare] — which is the
cleaner cut, since the analytical work and the chasing work call for different
people and DACI quietly assumes one person does both.

**It forbids stalling.** Advisors *"cannot delay a decision by demanding more
data, analysis, or debate."*[^mckinsey-dare] This is the single best line in the
decision-roles literature and neither RACI's Consulted nor DACI's Contributor has
anything like it. *"A voice, but not a vote"*[^atlassian] tells a Contributor
they cannot decide; it does not tell them they cannot stall — and in practice
stalling, not voting, is how input-holders block decisions. Borrow the sentence
regardless of which framework you run.

Against that, DARE is a blog post rather than a developed framework: no run
sheet, no template, no guidance on registers or supersession, and the substantive
critique of RACI it rests on is partly a critique of using RACI for decisions,
which is the mistake this page exists to name. It also assigns no work, so it
cannot replace a RAM whatever its author intended. And McKinsey sells
organisation design work, which is worth remembering when reading "don't use the
free thing everyone already has."

## Running both

The default recommendation for an IT project of any size, in order:

1. **RACI first, from the WBS.** It is the delivery-plan artifact and it is what
   governance will ask for. Build it after scope, run the column-and-row analysis,
   keep it under the same change control as the plan.
2. **A DACI per open question** whose answer is expensive to reverse. Typically
   build-vs-buy, platform, integration pattern, data classification and residency,
   vendor selection, cutover strategy. Each gets a Driver, one Approver, a
   deadline.
3. **Reconcile the two once.** The Approver on an architecture DACI and the
   Accountable on the deliverables that implement it should be a deliberate
   choice, not a coincidence. Where they differ, that is fine — but somebody
   should have noticed.
4. **Track open DACIs on the RAID log.** A decision past its deadline is a
   project issue and belongs in the same review as risks and dependencies.
5. **Feed decided DACIs back into the RACI.** A vendor decision usually adds
   rows and at least one column. This is the step that gets skipped, and it is
   how a RACI goes stale while still looking maintained.

There is no conflict in running both, because the artifacts never contend for
the same cell. The only real cost is discipline about which question goes where.

## Choosing, if you must

| If the question is... | Use |
|---|---|
| "Who is doing this piece of work?" | RACI |
| "Who signs off that it was done properly?" | RACI (Accountable) |
| "Who chooses between these three options?" | DACI (Approver) |
| "Why did we pick this, eighteen months ago?" | DACI (the archived record) |
| "Who can veto this on security grounds?" | RAPID (Agree) — or a DACI with the veto noted |
| "How do I stop a Contributor stalling this?" | DARE's advisor rule — no delaying for more analysis |
| "Who needs to know before go-live?" | Either (Informed) |
| "Why has nothing happened for three weeks?" | Usually: no Approver was ever named |

Two shortcuts that hold up:

- **A question with a deadline and options is a DACI.** A noun with an owner is
  a RACI row.
- **If the thing you are about to write down has more than one row, it is a
  RACI**, whatever letters you put in the cells.

## What neither one does

Worth stating, because both are routinely oversold and the honest limits are the
same for both.

- **Neither creates authority.** A matrix naming someone A over work they cannot
  direct, or a DACI naming an Approver with no power over the outcome, transfers
  blame rather than conferring power. This is the most common defect in
  cross-functional and vendor-heavy IT projects and no review process catches it,
  because the review is attended by the people who wrote it.
- **Neither substitutes for the conversation.** *"A RACI matrix doesn't replace
  a conversation"*[^pmcom-raci] and a DACI circulated for async comment is not
  the DACI play.[^atlassian] Most of the value in both is produced during the
  argument about who holds which role, not by the artifact afterwards.
- **Neither makes anyone decide.** The bounding caveat comes from the authors of
  the most influential framework in this literature, about their own: **"It is,
  for sure, not a panacea (an indecisive decision maker, for example, can ruin
  any good system), but it's an important start."**[^rogers-blenko]
- **Neither has an evidence base worth the name.** No controlled study of either
  was found. The one quantified claim attached to DACI — the "McKinsey 25%"
  figure on Atlassian's own page — could not be traced to McKinsey at all, and
  is examined on the [DACI page](/daci-framework.md). RACI's benefits circulate
  as practitioner testimony. Both are plausible mechanisms with long practical
  track records; neither is a measured effect.

## What this page can't reach

- **No source compares the two rigorously.** Every comparison found, including
  the two this page was built from, is trade press or vendor documentation. The
  mapping analysis and the unit-of-analysis argument here are this wiki's
  reading, not a claim anybody else has published.
- **The RAPID material comes through an excerpt** of a paywalled HBR reprint;
  Bain's book-length treatment (*Decide & Deliver*, 2010) has not been read.
- **The variant space is only sampled.** RASCI, CAIRO/RACIO, RACI-VS, PARIS,
  DRASCI and others exist, mostly as one-letter patches on RACI, and none is
  assessed here. DARE is covered only from the single blog post that introduces
  it; if McKinsey has published a fuller treatment, it was not found.
- **The governance question is unaddressed.** How either model reconciles with a
  formal delegation-of-authority schedule, a change advisory board, or the
  decision rights defined in COBIT and ISO 38500 is what an enterprise IT PM will
  actually be asked about, and neither this page nor its sources answer it.

[^atlassian]: [Atlassian Team Playbook, "DACI Decision-Making Framework"](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/atlassian-daci-play.md).
[^pmcom-daci]: [Sison, M., "DACI Decision-Making Framework: Everything You Need to Know", project-management.com](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/pmcom-daci-model.md).
[^pmcom-raci]: [Sison, M., "Understanding the Responsibility Assignment Matrix (RACI Matrix)", project-management.com](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/pmcom-raci-matrix.md).
[^rogers-blenko]: [Rogers, P. & Blenko, M., "Who Has the D? How Clear Decision Roles Enhance Organizational Performance", *Harvard Business Review*, January 2006](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/rogers-blenko-who-has-the-d.md).
[^mckinsey-dare]: [De Smet, A., Hewes, C. & Luo, M., "The limits of RACI—and a better way to make decisions", McKinsey & Company, People & Organization Blog, 25 July 2022](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/mckinsey-limits-of-raci-dare.md). mckinsey.com refuses automated requests; the local transcription was recovered from an Internet Archive capture.

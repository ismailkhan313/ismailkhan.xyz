---
type: Technique
title: "The DACI Framework"
description: Driver, Approver, Contributor, Informed — a decision-roles framework whose unit is one question, not one project; the Atlassian play it actually comes from, the run sheet and document template, the uncited statistic on its own vendor page, and the decision register that is the part worth maintaining.
tags: [daci, decision-making, decision-rights, atlassian, team-playbook, tpm, product-management, project-management, governance, decision-records]
sources:
  - id: atlassian
    resource: references/atlassian-daci-play.md
    title: "Atlassian Team Playbook, 'DACI Decision-Making Framework' — the closest thing to primary documentation"
  - id: pmcom-daci
    resource: references/pmcom-daci-model.md
    title: "Sison, M., 'DACI Decision-Making Framework: Everything You Need to Know', project-management.com — kept as a specimen of the trade-press layer"
  - id: rogers-blenko
    resource: references/rogers-blenko-who-has-the-d.md
    title: "Rogers, P. & Blenko, M. (2006), 'Who Has the D?', Harvard Business Review, January 2006"
  - id: mckinsey
    resource: https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/three-keys-to-faster-better-decisions
    title: "De Smet, A., Jost, G. & Weiss, L. (2019), 'Three keys to faster, better decisions', McKinsey Quarterly"
  - id: mckinsey-dare
    resource: references/mckinsey-limits-of-raci-dare.md
    title: "De Smet, A., Hewes, C. & Luo, M. (2022), 'The limits of RACI—and a better way to make decisions', McKinsey"
generated: { by: claude-code/opus-5, at: 2026-09-19T00:00:00Z }
status: stable
---

DACI assigns four roles around **one decision**: a **D**river who runs the
process, a single **A**pprover who makes the call, **C**ontributors who supply
expertise, and the **I**nformed who are told the outcome. Atlassian's
formulation of the middle two is the one worth memorising — Contributors have
*"a voice, but not a vote"*, the Informed have *"no vote, no voice"*.[^atlassian]

The structural fact that makes DACI a different kind of object from
[RACI](/raci-matrix.md), and the one most commonly lost: **its unit is a
question, not a project.** A RACI is one grid covering all the work for months.
A DACI is one document answering one question by one date, after which it stops
changing and becomes a record. You do not have *a* DACI for your programme. You
have a folder of them, and the folder is the artifact that needs maintaining.
The two are held apart in [DACI vs. RACI](/daci-vs-raci.md).

## The four roles

| Role | Atlassian's definition[^atlassian] | Vote | Count |
|---|---|---|---|
| **Driver** | *"corralling stakeholders, collating all the necessary information, determining the scope of the decision, and getting a decision made by the agreed date"* | No | One |
| **Approver** | *"The one person (yes: one!) who makes the decision"* | **Yes** | **Exactly one** |
| **Contributor** | *"subject-area knowledge and can make recommendations – i.e., they have a voice, but not a vote"* | No | As many as needed |
| **Informed** | *"whose work may be affected by the decision, and should be informed once it's been made – i.e., no vote, no voice"* | No | As many as needed |

Three things in that table carry the whole framework.

**The Driver owns the process and not the outcome.** This is the role people
misread, and the misreading is always in the same direction — treating Driver as
a seniority marker or as "the person whose idea it is." It is neither. The
Driver's deliverable is *a decision having been made by the deadline*, and if
the decision is late that is the Driver's failure regardless of who was slow.
The trade-press framing is exact: *"Think of this as the project manager or sole
coordinator for the decision itself... they have ownership over the process... So
if the decision is delayed, that's on the Driver to fix."*[^pmcom-daci]

**There is exactly one Approver, and the reasoning is not stylistic.** Two
Approvers who agree are one Approver with extra steps; two who disagree
reproduce precisely the deadlock the framework exists to break — *"the moment
you have two Approvers who disagree, you're back to the exact problem DACI was
supposed to prevent."*[^pmcom-daci] The escape hatch when dual sign-off is
genuinely mandatory, e.g. a spend that needs both engineering and finance
authority, is **not** to add an Approver but to **split the question into two
decisions, each with its own Approver and its own document.**[^pmcom-daci] This
is the single most useful operational move in the framework.

**Approver is an authority test, not a seniority test.** *"Choose an Approver who
holds authority over the outcome, not just the most senior person."*[^pmcom-daci]
Naming a VP who will rubber-stamp whatever the Driver recommends gives you the
latency of an executive calendar and none of the judgement. Atlassian's stated
intent for the role is the opposite: turning it *"from a passive 'rubber stamp'
into a very active 'decision maker' role."*[^atlassian]

A fourth rule comes from the trade press rather than from Atlassian, and it is
right: **the Driver and the Approver must be different people.** *"The Driver is
meant to stay neutral and manage input. If the same person also makes the final
decision, Contributors may hold back, and the decision loses
objectivity."*[^pmcom-daci] The mechanism is the important part — it is not
about propriety, it is that Contributors calibrate what they say to who is
listening, and a Driver who is also the Approver gets worse input.

## Running one

Atlassian ships DACI as a **play**, with a run sheet, and the specifics are more
useful than the acronym: **15 minutes' prep, a 60-minute run, 3–6
people.**[^atlassian] The eight steps, compressed:

1. **Prep the document** (5m). One shared page. Title it in the format
   **`DACI: [Question we're trying to answer]?`**[^atlassian] — a genuinely good
   convention, because it makes every DACI self-describing in a search result
   and makes a badly-scoped question visible in the filename.
2. **Assign the Driver** (5m). They also facilitate the session.
3. **Assign Approver, then Contributors** (5m). The Driver chooses how to work
   the Contributors — group session or 1:1.[^atlassian]
4. **Assign the Informed** (5m). *"people and teams who may need to change their
   work as a result of the decision."*[^atlassian]
5. **Develop the action plan** (10m). Fill everything but Action Items and
   Outcome.
6. **Gather input** (10m). *"perhaps engaging in a bit of healthy
   sparring."*[^atlassian]
7. **Organise action items** (10m), each with a named owner.
8. **Share the outcome** (10m). The Approver calls it; the Driver circulates.

Note what that timing implies and what the page does not say out loud: **the
60-minute meeting is not where the decision is researched.** Steps 5 and 6 are
ten minutes each because the options and data are expected to exist already. A
DACI session that begins with an empty options table will consume the hour
producing one and decide nothing. The Driver's real work happens before the
meeting.

### The document is the deliverable

The template sections are where DACI earns its keep, and they are easy to skip
in favour of just naming four people.[^atlassian]

- **Details** — status, impact, everyone involved, due date, and the outcome
  once decided.
- **Background** — one or two sentences on what is being decided and why it
  matters.
- **Relevant data** — the research and feedback bearing on the call.
- **Decision factors** — *"the factors you will consider when evaluating each
  option, such as cost, time, and scalability."*
- **Options considered** — a table, each option with description, pros, cons,
  estimated resources and cost.
- **Action items** — filled during.
- **Outcome** — filled after.

**Decision factors before options is the load-bearing ordering.** Agreeing the
criteria before comparing alternatives is what stops the session becoming
advocacy, and it is why the template lists them in that order. A team that
argues criteria first is having a different and much shorter argument than a
team that argues options first.

The **Options considered** table is the other high-value section, for a reason
that only shows up later: it is the only place the rejected alternatives are
written down. Six months on, the question is never *"what did we decide"* — that
is visible in the system — it is *"did we look at X?"* Atlassian's follow-up step
says this directly: document the decision *"to provide context to future teams
on how and why the decision was reached."*[^atlassian]

An IT project manager will recognise the shape. **A completed DACI is an
architecture decision record with the roles made explicit** — same context,
same options, same rationale, same immutability after the fact, plus a named
Approver that an ADR usually leaves implicit.

## Where DACI comes from, and what it doesn't come with

Two claims travel with DACI that do not survive checking. Both matter, because
they are the page's whole apparent evidence base.

**The Intuit origin story is unsourced.** The standard account — that DACI was
created at Intuit in the 1980s to address decision paralysis[^pmcom-daci] — is
repeated across essentially every secondary guide, always without a citation.
**Atlassian's own play does not mention Intuit anywhere**,[^atlassian] which is
striking: the company that popularised the framework and maintains the canonical
description of it makes no origin claim at all. The story may well be true. It is
not, on the available evidence, *known* to be true, and it should not be repeated
as fact in a document that will be cited.

**The "McKinsey found 25%" statistic could not be traced, and McKinsey's actual
published position is close to the opposite.** Atlassian's page answers "why use
DACI?" with exactly one sentence: *"A survey conducted by McKinsey & Company
found that projects utilizing the DACI framework have a 25% higher success rate
in meeting their objectives and timelines compared to those that do not use the
framework."*[^atlassian] It carries no link, no date and no study name, and
every other page carrying the figure is downstream of this one.

McKinsey has published twice in this area, and **neither publication mentions
DACI at all**:

- **The 2019 decision-speed research.** Surveying more than 1,200 managers, De
  Smet, Jost and Weiss found **fewer than half said decisions were timely, and
  61% said at least half the time spent making them was ineffective** — priced
  at roughly **530,000 days of management time a year for a typical Fortune 500
  company, about $250 million in wages.**[^mckinsey] Among the named causes are
  *unclear organisational roles* and *overreliance on consensus and death by
  committee*.
- **The 2022 post "The limits of RACI—and a better way to make decisions."**
  This is the one that matters here, and it recommends a framework called
  **DARE** — deciders, advisors, recommenders, execution stakeholders — closing
  with the instruction *"Give more people a voice, but fewer people a vote. And
  don't use RACI."*[^mckinsey-dare]

DARE is a different framework from DACI: different letters, different roles,
different authors. It is almost certainly the source of the confusion, because
it is what search engines return for decision-roles queries near DACI, and the
two get conflated routinely — including by the model-generated summaries this
page was nearly built from. **The likeliest reading is that the Atlassian
sentence is a conflation of DARE with DACI plus an invented number.** Whatever
its origin, the figure has no traceable source. **Do not put it in a business
case.**

The wider pattern is citation laundering of the kind this wiki has
[documented before](/agents-vs-workflows.md): a claim acquires authority from an
institution's name while the institution has, as far as can be determined, never
made it. The 2019 and 2022 findings are a real, sourced argument for *decision
roles as a category*. Neither is an argument for DACI specifically, and the
honest version of the case says so.

## When to reach for it

Atlassian's list is the usual one — complex multi-stakeholder decisions,
high-stakes decisions, cross-functional projects, resource allocation, process
improvements.[^atlassian] The sharper test comes from the trade-press FAQ and
inverts it: **"If a decision is straightforward and easy to reverse, you do not
need to rely on the DACI framework."**[^pmcom-daci]

Reversibility is the right axis, and it is the one to apply. DACI costs roughly
two hours of several people's time plus a document that persists. That is
excellent value for a vendor selection, a data-residency choice, a platform
migration, an integration pattern you will live with for five years. It is
straightforwardly wasteful for anything a team can undo next sprint — and
over-application is a listed failure mode for a reason: *"DACI adds structure,
and structure takes time... Reserve it for decisions that involve multiple
stakeholders and require decision ownership."*[^pmcom-daci]

Two situations argue for it specifically, beyond the generic list:

- **The decision has been open for a while and nobody can say why.** The usual
  cause is that no one is the Approver and everyone thinks someone else is.
  Naming a Driver and an Approver often closes it within days without any new
  information — the information was never the blocker.
- **The decision keeps getting reopened.** Re-litigation is almost always a
  symptom of an undocumented rationale. The Options-considered table is the fix,
  because it lets the Driver answer "we looked at that, here's why not" instead
  of re-running the analysis.

For an IT project manager the natural placement is early: *"after the project
charter is approved and before the project kickoff meeting"*[^pmcom-daci] is
where the first tranche of decisions — build vs. buy, target platform, integration
approach, data classification — should each get one. Deadlines of **one to two
weeks per decision, with three weeks as the ceiling** for anything needing real
analysis, are a sane default.[^pmcom-daci]

## Maintaining it

This is the part neither source addresses at all, and it is where DACI adoptions
fail. The individual DACI needs almost no maintenance; **the collection needs a
lot.**

- **A decided DACI is immutable.** Once the Approver has called it and the
  Outcome section is filled, the document is a record of what was decided with
  what known at the time. It is not a living page. Editing a decided DACI to
  match what later happened destroys the only thing it was for.
- **Changed your mind? Supersede, don't edit.** New document, new question,
  explicit link back to the one it replaces, and a line on the old one pointing
  forward. This is the ADR convention and it applies unchanged. The superseded
  DACI stays; the reasoning that turned out wrong is often the most valuable
  thing in the folder.
- **Maintain a register, not just documents.** One index: question, Driver,
  Approver, date decided, status, link. Without it you have decisions you cannot
  find, which is operationally the same as not having made them. The
  `DACI: [question]?` title convention makes the register cheap to keep.
- **Track the open ones on the RAID log.** A DACI past its deadline is a project
  issue. It belongs in the same review as risks and dependencies, with the Driver
  named — this is the mechanism that makes the deadline mean anything.
- **Review the Informed list when it is actually populated.** *"Forgetting to
  update the Informed group"* is a listed failure mode[^pmcom-daci] and it is a
  quiet one: nothing breaks, people simply act on stale assumptions until
  something surfaces weeks later.
- **Audit the Approver distribution periodically.** If one person is Approver on
  everything, decisions are not distributed, they are queued — the same
  bottleneck the column analysis catches in a [RACI](/raci-matrix.md), and it
  needs the same response.

## Failure modes

The trade press lists five and they are sound;[^pmcom-daci] compressed, with the
mechanism rather than the label:

1. **More than one Approver** — the deadlock DACI existed to prevent, reinstated.
   Split the decision.
2. **Driver and Approver are the same person** — Contributors self-censor,
   input quality drops.
3. **Contributors brought in late** — after direction is set, input is theatre.
   Set an input deadline.
4. **The Informed never informed** — the people who most need lead time to adapt
   get none.
5. **Used on trivial decisions** — the process outweighs the decision and the
   team learns to route around it.

Two more are worth adding, neither of which appears in either source:

**The Approver is not in the room and never reads it.** The failure looks like
success — the document is complete, the roles are assigned, the deadline passes
— but what actually happens is that the Driver's recommendation is rubber-stamped
by email. You have paid the full cost of the process and got a Driver's decision
with an executive's name on it. The tell is an Outcome section that restates the
recommendation with no reasoning of its own.

**The document becomes a substitute for the conversation.** Circulating a DACI
page and collecting async comments from six Contributors is not the play; the
play is a 60-minute session with 3–6 people and *"healthy sparring."*[^atlassian]
Async collection gets you six independent opinions that never met each other,
and the Driver silently arbitrates between them — which is the Driver making the
decision.

## Where it sits in the decision-roles literature

DACI is the lightweight, team-scale member of a family whose serious statement is
Rogers and Blenko's **RAPID**: recommend, agree, perform, input,
decide.[^rogers-blenko] RAPID is doing more work — it separates *Agree* (holding
a veto, which forces renegotiation or escalation) from *Decide* (*"the single
point of accountability"*), and it adds *Perform*, which DACI has no equivalent
of at all. Where DACI applies to a decision, RAPID was designed to redesign how
an organisation decides, deployed against *"the top ten to 20 decisions"* or
across a whole function.[^rogers-blenko]

**DARE** — deciders, advisors, recommenders, execution stakeholders — is the
third sibling, and the most recent.[^mckinsey-dare] Two of its moves are worth
having even if you stay with DACI. Its *recommenders* "explore and identify the
options," which is DACI's Driver stripped of the scheduling and chasing and
reduced to the analytical half — a cleaner separation than DACI's, which bundles
option-framing and project-managing into one person. And its *advisors*, unlike
DACI's Contributors, come with an explicit prohibition: they *"cannot delay a
decision by demanding more data, analysis, or debate."* That sentence is the one
to borrow. "A voice, but not a vote" tells a Contributor they cannot decide; it
does not tell them they cannot stall, and stalling is how Contributors actually
block decisions.

Their shared and load-bearing rule is the single decider — *"Ensure that only one
person 'has the D.' If two or more people think they're in charge of a particular
decision, a tug-of-war results"*[^rogers-blenko] — and DACI's *"yes: one!"* is
the same rule with an exclamation mark.

Two of Rogers and Blenko's cautions transfer directly and are absent from
Atlassian's page. On input: *"The recommender has no obligation to act on the
input he or she receives but is expected to take it into account"* — which is
precisely what "a voice, but not a vote" means, spelled out, and is the sentence
to quote to a Contributor who believes they were overruled. And on consensus:
*"Consensus is a worthy goal, but as a decision-making standard, it can be an
obstacle to action or a recipe for lowest-common-denominator
compromise."*[^rogers-blenko]

The last caution is the one to keep, because it bounds every claim on this page.
The authors of the most influential framework in this literature say of their
own: **"It is, for sure, not a panacea (an indecisive decision maker, for
example, can ruin any good system), but it's an important start."**[^rogers-blenko]
DACI routes a decision to a person. It cannot make that person decide.

## What this page can't reach

- **There is no primary source for DACI's origin.** Atlassian makes no origin
  claim; everything else is uncited repetition. The Intuit story is reported
  here as circulating folklore, not as history, and no Intuit publication
  describing it was found.
- **There is no evidence that DACI works**, in the sense of a study. The only
  quantified claim attached to it is the McKinsey statistic on Atlassian's own
  page, which could not be traced and which McKinsey's own publications
  contradict in spirit — their recommendation is DARE.[^mckinsey-dare] The
  genuine McKinsey research[^mckinsey] supports *decision roles* as a category,
  not DACI. Note also that the identification of the Atlassian claim as a
  probable DARE conflation is this wiki's inference, not a documented
  correction by anyone.
- **Atlassian's play is vendor documentation for a product ecosystem.** It is
  primary for DACI, but the run sheet is shaped around Confluence and Trello,
  and the 3–6 person, 60-minute framing reflects Atlassian's own team scale
  rather than a finding about decisions in general.
- **The RAPID material is read through an excerpt** of a paywalled HBR reprint,
  and Bain's fuller treatment (Blenko, Mankins & Rogers, *Decide & Deliver*,
  2010) has not been consulted.
- **No governance standard is covered here.** How DACI or any decision-roles
  model relates to formal delegation-of-authority schedules, change advisory
  boards, or the decision rights defined in COBIT and ISO 38500 is the question
  an enterprise IT PM will actually be asked, and this page does not answer it.

[^atlassian]: [Atlassian Team Playbook, "DACI Decision-Making Framework"](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/atlassian-daci-play.md).
[^pmcom-daci]: [Sison, M., "DACI Decision-Making Framework: Everything You Need to Know", project-management.com](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/pmcom-daci-model.md) — kept as a specimen of the trade-press layer rather than as an authority.
[^rogers-blenko]: [Rogers, P. & Blenko, M., "Who Has the D? How Clear Decision Roles Enhance Organizational Performance", *Harvard Business Review*, January 2006](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/rogers-blenko-who-has-the-d.md).
[^mckinsey]: [De Smet, A., Jost, G. & Weiss, L., "Three keys to faster, better decisions", *McKinsey Quarterly*, May 2019](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/three-keys-to-faster-better-decisions).
[^mckinsey-dare]: [De Smet, A., Hewes, C. & Luo, M., "The limits of RACI—and a better way to make decisions", McKinsey & Company, People & Organization Blog, 25 July 2022](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/mckinsey-limits-of-raci-dare.md). mckinsey.com refuses automated requests; the local transcription was recovered from an Internet Archive capture.

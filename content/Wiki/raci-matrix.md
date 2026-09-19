---
type: Technique
title: "The RACI Matrix"
description: Responsible, Accountable, Consulted, Informed — one instance of the responsibility assignment matrix; how an IT project manager builds one, the column-and-row analysis that is the only reason to keep it, the ITIL and COBIT versions, and the decision-authority gap it structurally cannot fill.
tags: [raci, responsibility-assignment-matrix, ram, project-management, tpm, governance, pmbok, itil, cobit, stakeholder-management, roles-and-responsibilities]
sources:
  - id: pmcom-raci
    resource: references/pmcom-raci-matrix.md
    title: "Sison, M., 'Understanding the Responsibility Assignment Matrix (RACI Matrix)', project-management.com — kept as a specimen of the trade-press layer"
  - id: pmbok
    resource: https://www.pmi.org/standards/pmbok
    title: "Project Management Institute, A Guide to the Project Management Body of Knowledge (PMBOK Guide), 6th and 7th editions — paywalled; used via the definitions PMI publishes and its glossary"
  - id: cobit
    resource: https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-tool-kit-enhancements
    title: "ISACA, 'COBIT Tool Kit Enhancements' (2020), on the COBIT 2019 practice-level RACI matrix"
  - id: rogers-blenko
    resource: references/rogers-blenko-who-has-the-d.md
    title: "Rogers, P. & Blenko, M. (2006), 'Who Has the D?', Harvard Business Review, January 2006"
  - id: mckinsey-dare
    resource: references/mckinsey-limits-of-raci-dare.md
    title: "De Smet, A., Hewes, C. & Luo, M. (2022), 'The limits of RACI—and a better way to make decisions', McKinsey"
  - id: facetation
    resource: http://facetation.blogspot.com/2015/05/what-is-history-of-raci-chart.html
    title: "Goodall, G. (2015), 'What is the history of the RACI chart?', Facetation — the only serious attempt found to trace the origin"
generated: { by: claude-code/opus-5, at: 2026-09-19T00:00:00Z }
status: stable
---

A RACI matrix is a grid: rows are units of work, columns are named people, and
each cell carries at most one of four letters saying how that person relates to
that work. **R**esponsible does it, **A**ccountable owns whether it was done
right, **C**onsulted is asked before it happens, **I**nformed is told after.

That is the whole mechanism, and it is genuinely useful. What makes RACI worth
a page rather than a template download is everything around the mechanism: that
it is one instance of a larger and older family, that the letter distinction
most teams get wrong is the only one that matters, that the analysis which makes
the matrix valuable is the step almost every guide omits, and that there is a
category of question — *who chooses between the options?* — it has no cell for
at all. That last gap is why [DACI](/daci-framework.md) exists, and the two are
held apart in [DACI vs. RACI](/daci-vs-raci.md).

## RACI is one RAM, not the RAM

The normative object is the **responsibility assignment matrix (RAM)**. PMI's
*PMBOK Guide* defines the RAM as the general artifact — a grid showing project
resources assigned to each work package — and treats RACI as *"a common type of
responsibility assignment matrix that uses responsible, accountable, consult,
and inform statuses to define the involvement of stakeholders in project
activities."*[^pmbok] The sixth edition puts it under Plan Resource Management;
the seventh, being principles-based rather than process-based, demotes it to one
artifact among many and is explicit that RACI is a choice, not a requirement —
a project manager may use *lead* and *resource* designations, or anything else
that fits.[^pmbok]

This matters practically. **If your governance forum asks for "the RACI," what
it is entitled to ask for is a RAM.** If R/A/C/I is the wrong vocabulary for your
work — and on an infrastructure programme with heavy vendor involvement it often
is — you can change the letters and still satisfy the standard. Teams rarely
realise this and contort the work to fit the acronym instead.

### Nobody knows who invented it

Worth stating plainly, because confident origin stories circulate. The RAM as a
concept is traceable to the early 1970s: M. D. Wadsworth's *EDP Management
Controls* (1972) uses it, and Gale's *New Acronyms, Initialisms and
Abbreviations* (1977) lists *"RAM — Responsibility Assignment Matrix
[NASA]."*[^facetation] The **linear responsibility chart** is an older and
broader ancestor from systems-engineering and matrix-management literature. But
no primary source names an inventor of the specific four-letter RACI scheme, and
the most careful attempt to trace it concludes only that *"RACI is only [a]
variant of an entire animal of similar things."*[^facetation] Attributions to a
named consultant or a single 1950s origin should be treated as folklore.

## The four letters, and the one that is always wrong

| Letter | Does what | How many per row |
|---|---|---|
| **R — Responsible** | Produces the output. Hands on keyboard. | At least one; more only if the work genuinely splits |
| **A — Accountable** | Answers for whether the output was correct and complete. Has sign-off authority. | **Exactly one** |
| **C — Consulted** | Two-way. Their input is sought *before or during* the work and shapes it. | Zero or more, kept small |
| **I — Informed** | One-way. Told the outcome, usually after. | Zero or more |

The R/A distinction is the entire value of the technique and the thing teams
routinely collapse. **Responsible produces; Accountable answers.** They are
frequently different people and in a healthy project usually are: the engineer
is R on the migration script, the delivery lead is A. Where they are the same
person, the row has no independent check on it. The trade guides get this right
— *"this person is expected to produce the output, not just oversee it"* for
R,[^pmcom-raci] *"the final check on a deliverable"* for A[^pmcom-raci] — and
teams still merge them, because in ordinary English "responsible" and
"accountable" are synonyms and the acronym does nothing to warn you.

The C/I distinction is the second most abused, and it is cheaper to fix. C is a
two-way obligation: you must *ask*, and you must ask *early enough for the answer
to change something*. I is a one-way notification. Marking a stakeholder C
because they are senior, then telling them after the fact, is worse than marking
them I, because you have written down a promise you then broke. One senior PM's
version of the payoff is exactly this: *"just clearly distinguishing two-way
Consulted from one-way Informed in a RACI chart makes a big difference in keeping
communication clear."*[^pmcom-raci]

## Building one

The construction sequence is uncontroversial and the trade press states it
well.[^pmcom-raci] Condensed, with the parts that actually go wrong marked:

1. **Have a plan first.** A RACI built before scope is defined records
   assumptions, not assignments. *"Don't build a RACI matrix before you have a
   full team, a defined scope, and a project plan."*[^pmcom-raci]
2. **Take the rows from the WBS.** Rows should be work packages or deliverables
   from the work breakdown structure, not invented for the matrix. This is the
   single highest-leverage construction decision and the reason is maintenance:
   when the WBS changes, you know exactly which rows to revisit. A RACI whose
   rows were hand-written in a workshop drifts out of sync with the plan
   silently.
3. **Columns are named individuals, or named roles with a named holder.** Never
   a bare department. "Security" is not accountable for anything; a person is.
4. **Fill cells sparsely.** The default for any cell is *blank*. Every letter is
   a commitment of someone's time, and the instinct to give everyone something
   in every row is the main driver of unusable matrices.
5. **Walk it with the team before publishing.** *"A RACI matrix doesn't replace
   a conversation."*[^pmcom-raci] The matrix's value is largely produced during
   the argument about who gets the A, not by the artifact afterwards.

### Row granularity is the judgement call

Nobody will tell you how fine to slice, and it determines whether the thing is
usable. Too coarse ("Deliver the integration") and every cell is A or R and the
matrix says nothing. Too fine (one row per Jira ticket) and it cannot be
maintained and duplicates the backlog. The practical test: **a row is the right
size if a single person can plausibly be Accountable for it and its completion
is a binary you could argue about at a status meeting.** On a typical IT project
that lands somewhere around 15–40 rows. Past roughly 50, split into separate
matrices per workstream or per phase — which is also the standard advice for
large teams.[^pmcom-raci]

## The analysis that is the actual point

This is the step almost every guide, including both of the ones this page was
built from, leaves out entirely — and without it a RACI is decoration. Once the
grid is filled, **read it twice: down each column, then across each row.** Each
direction has its own diagnostic signatures.

**Reading down a column** (one person, all their work):

- **Lots of A's.** A bottleneck, and usually a real one. Everything queues behind
  this person's approval capacity. Either delegate some A's downward or accept
  that this person's calendar is the project's critical path.
- **No blank cells at all.** This person is involved in everything, which means
  they are a single point of failure and probably a meeting attendee rather than
  a contributor. Somebody is being cc'd into relevance.
- **Nothing but C's and I's.** Why is this person on the project? Either they
  hold an approval you have not written down, or the column should be deleted.
- **Many R's concentrated in one column.** A workload problem the Gantt chart
  will not show you, because the Gantt shows dates, not who is behind them.
  *"Avoid stacking multiple Responsible and Accountable roles on one person."*[^pmcom-raci]

**Reading across a row** (one work package, everyone's relationship to it):

- **No R.** The work will not happen. This is the most common finding on a first
  pass and the most valuable.
- **No A.** Nobody answers for it. When it goes wrong there will be a meeting
  about who should have caught it.
- **More than one A.** Deadlock in waiting. Either split the row so each half
  has one A, or decide now who it is.
- **A wall of C's.** You have invented a committee. Every C is a person who can
  hold the row up, and consensus-by-default is how a two-day task becomes a
  two-week one. Rogers and Blenko's warning about veto proliferation is exactly
  this pathology: *"Too many people with veto power can paralyze recommenders. If
  many people must agree, you probably haven't pushed decisions down far enough
  in your organization."*[^rogers-blenko]
- **Every cell filled.** Nobody is genuinely uninvolved in anything, which means
  nobody is genuinely involved in anything.

Run this analysis at least once before publishing and once per phase gate. It is
the difference between a RACI as a diagnostic instrument and a RACI as a
compliance artifact.

## The IT-specific versions

An IT project manager is likelier to meet RACI through a governance framework
than through project management proper, and the two big ones treat it
differently.

**COBIT** builds RACI into the framework itself. COBIT 5 supplied RACI charts at
the process level; **COBIT 2019 pushes them down to the practice level, covering
all 231 practices across its 40 governance and management objectives**, shipped
as a spreadsheet against a standard set of enterprise roles.[^cobit] ISACA's own
framing of how to use it is the right one and is easy to miss: the shipped chart
tells you who is *Responsible* and *Accountable*, and you determine *Consulted*
and *Informed* yourself, *"based on the unique requirements of your
enterprise."*[^cobit] In other words, **the reference RACI is a starting position
to be tailored, not a control to be complied with** — and audit findings that
treat deviation from the shipped chart as a defect have misread the framework.

**ITIL** popularised RACI under the name **authority matrix**, and generations of
ITSM process documentation were written around per-process RACI charts. ITIL 4
is the complication: because it is built on practices and a service value system
rather than prescribed processes, **there is no official ITIL 4 RACI matrix**.
Teams migrating from ITIL v3 frequently expect one and find that the thing they
were complying with no longer exists in the guidance. The matrix now has to be
derived from your own value streams rather than lifted from the book.

For an IT PM this produces a specific and common situation: **the same person
appears in three different responsibility models at once** — a project RACI, a
COBIT practice-level RACI owned by governance or risk, and an ITIL-derived
service RACI owned by operations. These conflict routinely, most sharply at
handover, when the project RACI says the delivery lead is A for the release and
the service RACI says the service owner is. Reconciling them is not a formality;
it is where handover disputes come from, and the time to find the clash is at
planning, not at go-live.

## What it is actually good for

Stated honestly, because the benefit lists in circulation are inflated.

- **It surfaces gaps before they cost anything.** The empty-R and duplicate-A
  findings from the row analysis are the real return, and they arrive during a
  one-hour workshop rather than during an incident.
- **It converts assumed agreement into stated agreement.** The sharpest
  practitioner formulation found: *"Many teams misplace alignment with
  agreement. The RACI forces clarity."*[^pmcom-raci]
- **It gives escalation a target.** *"Assigning one Accountable person per task
  makes it clear who to escalate issues to."*[^pmcom-raci] On a cross-functional
  project this alone can justify the exercise.
- **It prevents duplicated work** between teams that did not know they were both
  doing it.[^pmcom-raci]
- **It is durable institutional memory.** *"Sometimes people forget things like
  who makes decisions or who is in charge of setting agendas, especially over the
  course of a long project."*[^pmcom-raci]

Note that four of those five are about *communication*, not about work
assignment. That is the honest reading of what RACI buys.

## Maintaining it

The failure mode of RACI is not being wrong on day one. It is being right on day
one and untouched on day ninety, at which point it is actively misleading —
people cite it, the named individuals have changed roles, and the authority it
records no longer exists.

- **Version it with the plan, not separately.** If the WBS is a controlled
  artifact, the RAM derived from it should be too. Same change control, same
  approval.
- **Three triggers force a review**: scope change that adds or removes work
  packages, any change of personnel in a column, and each phase gate. The
  personnel trigger is the one that gets missed, because it arrives through HR
  rather than through the project.
- **Re-run the column-and-row analysis at each review**, not just a spot edit of
  the changed cell. Removing one person can leave a row with no A.
- **Keep it in one place and link to it.** A RACI pasted into a slide deck
  forks, and the fork is what people will act on. The version in the project
  space is the version; decks link to it.
- **Retire it at closure.** Explicitly hand the operational rows to the service
  RACI and mark the project matrix superseded. An abandoned project RACI that
  still turns up in search is a live source of wrong escalations.

## The serious case against it

Most RACI criticism is a list of tips. One published critique is stronger than
that and an IT PM should know it exists, because it will eventually be quoted at
them: McKinsey's 2022 post, whose title is *"The limits of RACI—and a better way
to make decisions"* and whose closing words are **"And don't use
RACI."**[^mckinsey-dare]

Their claim is not that RACI is imperfect but that *"we've found RACI often
makes things worse."* Four pitfalls:[^mckinsey-dare]

1. **No clear decider.** The opening move is a question worth asking your own
   team: *"If told that you were responsible or accountable for a decision, would
   you get to make that decision? What if you were to be consulted?"* Nobody
   answers confidently, which is the point. *"With RACI, too many stakeholders
   end up with a vote or veto."*
2. **Poor orchestration of stakeholders.** RACI records *who* and *what* but has
   no representation of *when*. *"RACI not only confuses who decides and what
   kind of input is required, but also when it is required."* A C is an
   obligation with no timing attached, which is why consultations pile up at the
   end.
3. **Poor delegation practices.** The sharpest observation, and the one most
   recognisable on a real project: delegated decisions get escalated anyway,
   because the delegate does not feel able to decide *"without the insurance of
   being backed by all consulted parties and having their superiors' support. In
   the end, the delegated decision is often escalated to the more senior party,
   wasting time and leaving many feeling disempowered."* The matrix records a
   delegation that does not happen.
4. **Ineffective meeting management.** *"Many agenda items fail to call out
   whether they require a decision, are up for discussion, or are simply to
   provide information."* Their remedy is independent of RACI and free: label
   every agenda item as decision, discussion or information — and *"remember
   that not every decision needs a meeting."*

Their replacement is **DARE** — deciders, advisors, recommenders, execution
stakeholders — summarised as *"Give more people a voice, but fewer people a
vote."*[^mckinsey-dare]

How much of this to accept. Pitfalls 1 and 3 are real and are about decision
authority, which is the gap this page names below — they are arguments for
pairing RACI with a decision framework, not for abandoning it, since DARE
assigns no work and could not replace a RAM even if you wanted it to. Pitfall 2
is a fair hit and cheap to patch: add a *when* column, or accept that sequencing
lives in the schedule and stop expecting the matrix to carry it. Pitfall 4 is
barely about RACI. And one concession in their own text undercuts the headline —
*"make sure if you do use the language of responsible and accountable that you
clarify what it means"* — which is advice for using RACI properly, not for
dropping it. Note too that McKinsey sells organisation design work, and a post
concluding "don't use the free thing everyone already has" is not disinterested.

## Where it fails

Three failure modes are structural rather than avoidable, and it is worth
knowing which is which.

**The agile tension is real and is not resolved by tooling.** RACI assigns
individual responsibility per task; agile teams are built on collective
ownership of a sprint commitment. The source page concedes this outright as a
limitation — *"RACI assigns individual responsibility; agile is built on shared
team accountability"*[^pmcom-raci] — and the concession is correct. The workable
resolution is to **stop putting individuals in the columns for team-owned work**:
one column for the team, R against the team, A against the product owner or
delivery lead, and individuals only in columns where the responsibility genuinely
sits outside the team (security review, vendor, change approval board). A RACI
that names individual developers per story is fighting the operating model and
will lose.

**Consulted understates real influence.** Once work needs several kinds of
expertise, the people marked C are not advising from the sidelines — they are
shaping the outcome, and the matrix's claim that one person is accountable
flatters a reality where ownership is already shared. The matrix is not lying
exactly, but it is describing the formal structure while the informal one does
the work.

**It records authority, and cannot create it.** A RACI naming someone A over a
deliverable they have no organisational power to influence does not confer
power; it transfers blame. If the A cannot direct the R's time, the cell is
fiction. This is the most common defect in matrices written for cross-functional
or vendor-heavy IT projects, and no amount of review catches it, because the
review is attended by the people who wrote the fiction.

## The gap: RACI has no cell for choosing

The deepest limitation is not on anyone's pros-and-cons list. **RACI's four
letters describe relationships to *work*, and none of them describes a
relationship to a *choice*.**

Ask "who decides which of these three vendors we go with?" and the matrix has no
answer. The instinct is to reach for A, but A means *accountable for a deliverable
being done correctly* — sign-off on a completed thing — which is a different act
from selecting between options with different risk profiles. Conflating the two
is how the person who approves the integration test report ends up deciding the
integration architecture, by default and without anyone choosing that.

This is the gap the entire decision-roles literature exists to fill, and it is
what McKinsey's first pitfall is pointing at when it asks whether being
*responsible*, *accountable* or *consulted* would actually let you make the
call.[^mckinsey-dare] Rogers and Blenko diagnose it directly — *"many companies
struggle to make decisions because lots of people feel accountable — or no one
does"*[^rogers-blenko] — and their RAPID model splits what RACI's A conflates,
into *Agree* (holds a veto) and *Decide* (the single point of accountability who
brings it to closure). [DACI](/daci-framework.md) makes the narrower version of
the same move for a single decision, and DARE a third. How the four relate is
the subject of [DACI vs. RACI](/daci-vs-raci.md).

The practical upshot for an IT project manager is one sentence: **the matrix is
the right artifact for the work and the wrong artifact for the choice**, and
most of the trouble attributed to RACI comes from using it for both.

## What this page can't reach

- **The PMBOK Guide is paywalled**, and PMI's standards are not mirrorable. The
  definitions quoted here are ones PMI publishes publicly or that circulate as
  direct quotation; section-level structure for the 6th and 7th editions is
  reported from secondary sources and has not been checked against the books.
- **COBIT 2019 and the ITIL 4 core publications are likewise paywalled.** The
  COBIT practice-level RACI claim rests on ISACA's own public announcement of
  the tool kit, which is primary but promotional. The ITIL 4 claim — that no
  official RACI matrix exists — is an argument from the framework's structure and
  from practitioner reporting rather than from an AXELOS statement to that
  effect.
- **The origin is genuinely unsettled** and this page does not settle it. It
  rests on one careful blog investigation and the 1972/1977 citations it
  surfaces.
- **There is no empirical evidence here worth the name.** No controlled study of
  whether RACI improves project outcomes was found. The benefits section is built
  from four named practitioners' testimony in a monetised trade publication, and
  the one quantified claim in it — two-thirds less feedback, five days faster —
  is a single unaudited anecdote. Treat the benefits as plausible mechanism, not
  as measured effect.
- **ISO 21502:2020 and PRINCE2** both address roles and responsibilities without
  adopting RACI, and comparing their approach to it would sharpen this page.
  Both are paywalled and neither has been read for this.

[^pmbok]: Project Management Institute, *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*, 6th ed. (2017) and 7th ed. (2021). Paywalled; see "what this page can't reach".
[^pmcom-raci]: [Sison, M., "Understanding the Responsibility Assignment Matrix (RACI Matrix)", project-management.com](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/pmcom-raci-matrix.md) — kept as a specimen of the trade-press layer rather than as an authority.
[^cobit]: [ISACA, "COBIT Tool Kit Enhancements" (2020)](https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-tool-kit-enhancements).
[^rogers-blenko]: [Rogers, P. & Blenko, M., "Who Has the D? How Clear Decision Roles Enhance Organizational Performance", *Harvard Business Review*, January 2006](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/rogers-blenko-who-has-the-d.md).
[^mckinsey-dare]: [De Smet, A., Hewes, C. & Luo, M., "The limits of RACI—and a better way to make decisions", McKinsey & Company, People & Organization Blog, 25 July 2022](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/mckinsey-limits-of-raci-dare.md). mckinsey.com refuses automated requests; the local transcription was recovered from an Internet Archive capture.
[^facetation]: [Goodall, G., "What is the history of the RACI chart?", Facetation (2015)](http://facetation.blogspot.com/2015/05/what-is-history-of-raci-chart.html).

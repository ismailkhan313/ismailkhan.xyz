---
type: Concept
title: "Brooks's Law"
description: Adding manpower to a late software project makes it later — the five mechanisms behind it, why managers who know the law still staff up anyway, the two conditions under which adding people (or contractors) genuinely works, and what to try first.
tags: [brooks-law, capacity-planning, staffing, software-estimation, tpm, project-management, team-size, cocomo, behavioural-bias]
sources:
  - id: brooks
    resource: https://www.pearson.com/en-us/subject-catalog/p/mythical-man-month-the-essays-on-software-engineering-anniversary-edition/P200000000198
    title: "Brooks, F. P. Jr. (1995), The Mythical Man-Month: Essays on Software Engineering, anniversary ed., Addison-Wesley"
  - id: mcconnell
    resource: references/mcconnell-brooks-law-repealed.md
    title: "McConnell, S. (1999), 'Brooks' Law Repealed?', IEEE Software 16(6):6–8"
  - id: farshchi
    resource: references/farshchi-personnel-factors-delayed-projects.md
    title: "Farshchi, M., Jusoh, Y. Y. & Azmi Murad, M. A. (2012), 'Impact of Personnel Factors on the Recovery of Delayed Software Projects', ComSIS 9(2):627–652"
  - id: stutzke
    resource: references/farshchi-personnel-factors-delayed-projects.md
    title: "Stutzke, R. D. (1994), 'A Mathematical Expression of Brooks' Law', 9th International Forum on COCOMO and Cost Modeling — no free copy online; used via the restatement in the Farshchi excerpt"
  - id: gren
    resource: https://arxiv.org/abs/1904.02472
    title: "Gren, L. (2017), 'A fourth explanation to Brooks' Law — The aspect of group developmental psychology', CHASE 2017"
  - id: flyvbjerg
    resource: https://arxiv.org/abs/2202.00125
    title: "Flyvbjerg, B. (2021), 'Top Ten Behavioral Biases in Project Management: An Overview', Project Management Journal 52(6):531–546"
  - id: qsm
    resource: https://www.qsm.com/blog/2019/4-key-studies-team-size
    title: "Quantitative Software Management, '4 Key Studies on Team Size'"
  - id: cocomo
    resource: https://athena.ecs.csus.edu/~buckley/CSc231_files/Cocomo_II_Manual.pdf
    title: "COCOMO II Model Definition Manual, USC Center for Software Engineering"
  - id: hsia
    resource: https://doi.org/10.1109/CMPSAC.1999.812726
    title: "Hsia, P., Hsu, C. & Kung, D. (1999), 'Brooks' Law Revisited: A System Dynamics Approach', COMPSAC 1999"
generated: { by: claude-code/opus-5, at: 2026-09-16T00:00:00Z }
status: stable
---

Brooks's Law is quoted more often than it is read, and almost always as a
prohibition — *don't add people to a late project*. It is better understood as
an attack on a unit of measurement. The essay it comes from is called "The
Mythical Man-Month," and the myth is the man-month itself: the assumption, baked
into every FTE-based capacity model, that people and time are interchangeable
inputs to the same quantity of output.[^brooks]

> Cost does indeed vary as the product of the number of men and the number of
> months. Progress does not. Hence the man-month as a unit for measuring the
> size of a job is a dangerous and deceptive myth.

The law is the corollary:[^brooks]

> Oversimplifying outrageously, we state Brooks's Law: **Adding manpower to a
> late software project makes it later.**

Brooks called that an "outrageous oversimplification" in 1975 and, twenty years
on, defended it only as "the best zeroth-order approximation to the
truth."[^brooks] That hedging is part of the law and is routinely dropped in
quotation. The literature since has spent most of its effort establishing where
the approximation breaks, and the useful modern reading of Brooks's Law is not
*never add people* but *here are the conditions under which adding people pays,
and they are narrower and later-arriving than your capacity model assumes*.

## Why it happens

Brooks gave three mechanisms. The literature has added two more, and the last
two are the ones missing from most retellings.

**1. Ramp-up and assimilation.** New people are not merely unproductive at
first; they consume the time of the people who are already productive. The
simulation literature carries real parameters for this: Stutzke models mentoring
at **25% of an experienced person's time** with roughly 33 working days to
assimilate; Hsia, Hsu and Kung use about 20% and **80 days**.[^farshchi] The
spread between those two numbers is most of the argument.

**2. Communication overhead.** Channels grow as *n*(*n*−1)/2. Coordination cost
is superlinear in headcount while output is at best linear, so there is always
a team size past which the next person is a net negative even on a project that
is not late at all.

**3. Limited divisibility.** "The bearing of a child takes nine months, no
matter how many women are assigned."[^brooks] Integration, a single hard
debugging thread, one contended schema — sequential constraints do not
parallelise, and a late project is usually late *because* of one of them. A
[dependency map](/dependency-mapping.md) is an inventory of exactly these
constraints, which makes it the cheapest available evidence for the argument
this page exists to support: if the map is dense, the work does not divide, and
headcount will not buy schedule.

**4. Group re-formation.** Gren's contribution, and the one absent from every
capacity model: adding members regresses a team down its group-development
stages, forcing rework of norms, goals and roles.[^gren] The team does not
simply gain a member; it briefly stops being the team it was. This mechanism
fires even when the new person is excellent, which is precisely why "but we
hired a strong contractor" does not dispose of it.

**5. The defect tail.** QSM's data on 390 applications of 10–20 KLOC: heavier
staffing cut schedule by roughly 30% but raised cost about **350%** and testing
defects about **500%**.[^qsm] Armel's study of ~1,060 IT projects found large
teams 3–4× more costly, delivering 2–3× the defects.[^qsm] The extra defects
surface during test — which is where a late project is already stuck. Staffing
up late doesn't just fail to buy schedule; it manufactures more of the work that
is consuming the schedule.

### Don't confuse these

**Brooks's Law is not a claim about team size in general.** It is a claim about
*marginal additions* to a project *already in its final phases*. The team-size
evidence is a separate, independently supported finding — QSM's 491-project
study puts the productivity optimum at **3–7 people, ideally 3–5**, with
non-linear effort blow-up past about nine.[^qsm] A project can be violating that
without Brooks's Law being the reason, and fixing one does not fix the other.

**"Later than what?"** McConnell's sharpest point. Most projects called late
were never estimated honestly in the first place, so the counterfactual is
unavailable: *"The claim is that adding staff to a late project makes it later —
but later than what? Later than a systematic, well-founded estimate, or later
than an estimate that was optimistic by more than 100 percent in the first
place?"*[^mcconnell] A project that slips after staffing up is not evidence for
the law unless you had a defensible baseline.

## The capacity-planning link

None of the above is visible to a headcount or FTE capacity model, because such
a model treats the man-month as fungible — the exact myth Brooks named. The
quantified correction lives in the estimation models.

COCOMO II carries a cost driver, **SCED (Required Development Schedule)**, whose
whole job is to price schedule constraint:[^cocomo]

> This rating measures the schedule constraint imposed on the project team
> developing the software. The ratings are defined in terms of the percentage of
> schedule stretch-out or acceleration with respect to a nominal schedule for a
> project requiring a given amount of effort. **Accelerated schedules tend to
> produce more effort in the later phases of development because more issues are
> left to be determined due to lack of time to resolve them earlier.**

| SCED rating | Very Low | Low | Nominal | High | Very High |
|---|---|---|---|---|---|
| **% of nominal schedule** | **75%** | 85% | 100% | 130% | 160% |

Two things to take from that table. First, the scale bottoms out at 75%: COCOMO
II simply **declines to model compression beyond 25%**, which is a quantitative
way of saying that past a point schedule is not purchasable at any price.[^cocomo]
Second, the mechanism in the bolded sentence is the late-project situation
exactly — acceleration relocates effort into the *later* phases, so buying
schedule with staff at the end lands the cost precisely where you have least
room.

Putnam's model is harsher still, with effort rising roughly as the **fourth
power** of the compression ratio. Whichever model you prefer, the shape is the
same: headcount converts to schedule at a steeply diminishing, eventually
negative, rate — and a capacity plan expressed in FTE-months encodes the
opposite assumption.

## Why managers do it anyway

Not ignorance. McConnell cites a UK study of "runaway projects" — those over
schedule or budget by more than 30% — in which **about half** the managers
responded by adding staff.[^mcconnell] Five reasons, roughly in order of how
much explanatory work each does:

- **It is the only lever they control.** Scope belongs to product or the
  customer; the date belongs to a committee, a regulator, or a trade show.
  Headcount is often the single dial a delivery manager can turn unilaterally.
  Turning it is a rational response to a constrained decision space even when it
  is a poor response to the project.
- **Escalation of commitment.** Bias #10 in Flyvbjerg's top ten: *"the tendency
  to justify increased investment in a decision, based on the cumulative prior
  investment, despite new evidence suggesting the decision may be
  wrong."*[^flyvbjerg] Adding people is the cheapest available way to keep
  investing.
- **Visible action outperforms correct action.** Re-baselining a date is a
  confession that travels upward and is remembered; two contractors are a line
  item. The manager's reputational risk and the project's schedule risk point in
  opposite directions, and only one of them is paid for personally.
- **Budget mechanics.** Headcount and contractor spend usually sit on a
  different budget line from project outcome, and unspent budget is reclaimed.
  Spending it converts a use-it-or-lose-it resource into something that at least
  resembles capacity.
- **Genuinely bad status data.** The charitable reading, and McConnell's actual
  argument: *"without effective project tracking in place, the project manager
  can't know with any clarity whether the project is 75 percent complete or 25
  percent complete."*[^mcconnell] Managers are not defying the law so much as
  unable to tell whether they are inside its window — and on chaotic projects
  they are usually wrong in the direction that would have made adding people
  correct.

Flyvbjerg's framing is worth carrying whole, because it explains why exhortation
does not fix this: *"Cognitive bias is half the story; political bias the other
half."*[^flyvbjerg] A manager adding people to a doomed project may be
miscalculating, or may be correctly calculating a different objective function
from the one the project is being judged on.

## When adding people still works

Stutzke's 1994 model is the most operationally useful result in this literature
because it reduces to two checkable conditions:[^stutzke]

- **r > a** — the remaining time must exceed the new person's *effective
  assimilation time*. This is the binding constraint in practice. Eight weeks
  left and a twelve-week ramp is a losing trade no matter how good the hire.
- **f < 1/m** — the fractional staff increase must stay below the reciprocal of
  per-hire mentoring cost *m*. This one is a floor, not a target: at *m* = 0.25,
  *f* = 4 would consume the entire existing team in mentoring and drive useful
  output to zero. It tells you where the cliff is so you can stay well back from
  it, not where to aim.

Layered on top, the conditions that separate a good add from a bad one:

- **The project is late from mis-estimation, not from being nearly done.**
  McConnell: *"'Late' chaotic projects are likely to be much later than the
  project manager thinks — project completion isn't three weeks away, it's six
  months away. Go ahead and add staff. You'll have time for them to become
  productive."*[^mcconnell]
- **The work is genuinely partitionable and already modular.** Controlled
  projects *"can add staff later in the project with less risk"* because better
  documentation and design make tasks separable and training cheaper.[^mcconnell]
- **You are not at the staffing ceiling.** Hsia, Hsu and Kung found that adding
  people raises cost but does not necessarily delay delivery, provided sequential
  constraints stay manageable and staffing has not maxed out.[^hsia]
- **The people you add score high on the personnel factors.** This is Farshchi's
  finding, and it is the one that treats *who* rather than *how many* as the
  variable: *"a significant schedule improvement of a late project can be
  achieved if people with certain levels of personnel factors are added to the
  project."*[^farshchi] The factors are COCOMO II's six — ACAP, PCAP, PCON, APEX,
  PLEX, LTEX — and the mechanism is that capability shortens assimilation time
  and reduces mentoring load, i.e. it moves both of Stutzke's terms in the right
  direction at once.
- **You add at a phase boundary, not mid-integration.** NASA's Software
  Engineering Laboratory recommended starting with a small senior staff and
  adding once requirements and architecture are largely settled.[^mcconnell]

### The contractor case specifically

Contractors are the usual instrument, and they sit at the pessimistic end of
every parameter above. Three adjustments:

1. **Assimilation is longer than for an internal hire** — no domain context, no
   codebase familiarity, plus access provisioning and security onboarding that
   an employee already has. Push your estimate of *a* toward the 80-day end of
   the range, not the 33-day end.
2. **PCON — personnel continuity — is structurally bad.** They leave, and the
   knowledge leaves with them. The payback window has to close *inside* the
   contract, which tightens `r > a` from both ends.
3. **PLEX and LTEX beat APEX.** A contractor who knows your platform, language
   and tooling assimilates far faster than one who only knows your industry.
   This inverts how contractor sourcing is usually specified.

The reliable contractor play is to put them on work that does not touch the
critical path — test, tooling, environment and data setup, build and release
chores, support and escalation load — buying back experienced-engineer hours
without inserting a new person inside the sequential constraint. It is
consistently under-used, because it reads as a smaller intervention than it is.

## Alternatives, in order

Brooks's own list is still the right order of operations, and adding people is
not on it:[^brooks]

> When [the secondary costs of delay] are very high, the manager's only
> alternatives are to trim the task formally and carefully, to reschedule, or to
> watch the task get silently trimmed by hasty design and incomplete testing.

That third option is not an option, it is a warning: scope gets cut either way,
and the only choice is whether you pick the cuts or the pressure does.
Concretely:

1. **Trim scope formally.** The only lever with immediate, non-negative effect.
2. **Re-baseline honestly, taking one large slip rather than several small
   ones.** A series of three-week slips is what produces the pathology McConnell
   describes, where the team believes the law's window is open for months longer
   than it actually is.
3. **Fix tracking before touching staffing.** Until you can tell 25% done from
   75% done, every staffing decision is a guess — and per McConnell the guess is
   biased toward *not* adding when adding would have helped.
4. **Reference-class forecast the remainder.** Base-rate neglect is Flyvbjerg's
   identified primary cause of project underperformance.[^flyvbjerg] Ask what
   comparable projects took from this state, not what the team thinks is left.
5. **Unblock the constraint instead of adding capacity around it.** Late projects
   are usually blocked on one thing. Reduce work in progress and pull people
   *off* adjacent work before pulling people *in*.
6. **Buy back existing-engineer time** via the off-critical-path contractor play
   above — same money, no assimilation cost inside the constraint.
7. **Shrink the team.** Counter-intuitive, evidence-backed, and rarely tried;
   past about nine people you are paying effort and defects for no schedule
   benefit.[^qsm] The extreme form is Brooks's "Bermuda plan" — send most of the
   team home and keep the core.

Buying schedule with headcount comes last, and COCOMO II will tell you roughly
what it costs right up to the point where it declines to answer.

## Where this connects

The staffing decision is a project-level lever, but the decision Brooks's Law
actually forces — trim scope or move the date — is a benefits decision. On a
programme it belongs to whoever owns the benefit case, not to the delivery
manager holding the headcount budget. The same outputs-versus-outcomes
asymmetry does most of the work there.

That is also a decision-rights problem, and a well-posed one. "Trim scope or
move the date?" is a question with options, a deadline and consequences that
are expensive to reverse — the exact shape the [DACI framework](/daci-framework.md)
exists for, with the benefit-case owner as Approver. It is worth noticing what
goes wrong when the question is instead routed through a
[RACI matrix](/raci-matrix.md), which is the usual artifact to hand: RACI has no
cell for choosing between options, so the call defaults to whoever is
Accountable on the nearest deliverable — which is precisely the delivery manager
holding the headcount budget, the one person whose available lever is the one
Brooks's Law says not to pull. The framework does not cause the error, but it
does nothing to catch it, and [DACI vs. RACI](/daci-vs-raci.md) sets out why.

The law also reappears, unnamed, in agentic development. The ceiling in
[Parallel Sessions and Subagents](</AI-Native SDLC/parallel-sessions-and-subagents.md>)
is "how many streams one person can review properly," and that is Brooks's third
mechanism exactly: review is the sequential constraint, it does not partition,
and spawning more agents against it produces the same defect tail that staffing
up produces against test. Agents remove the ramp-up term — they have no
assimilation time and no group re-formation — but they leave divisibility
untouched, which is why the ceiling moved rather than disappeared.

## What this page can't reach

- **Stutzke (1994)** is a COCOMO forum paper with no free copy online. The two
  conditions here are taken from Farshchi et al.'s and Williams et al.'s
  restatements of it, not from the original, and the exact definition of
  *effective* assimilation time is a detail those restatements compress.
- **Brooks's book** is copyrighted and not mirrored here; quotations are from the
  1995 anniversary edition.
- **Hsia, Hsu & Kung (1999)** is behind the IEEE paywall; only its summarised
  result is used.
- **Cole, A. (1995)**, "Runaway Projects — Cause and Effects," *Software World*
  26(3):3–5 — the source of the "about half of runaway-project managers added
  staff" figure. Not available online in any form; it is used here only as
  McConnell reports it.
- The empirical base is **thin and old**. The quantitative results here rest on
  system-dynamics simulations and on QSM's proprietary database, not on
  randomised or even well-controlled field studies, and nearly all of it predates
  distributed teams, continuous delivery and agentic tooling. Treat the
  mechanisms as sound and the numbers as illustrative.

[^brooks]: Frederick P. Brooks Jr., *The Mythical Man-Month: Essays on Software Engineering*, anniversary edition, Addison-Wesley, 1995 (first published 1975), ch. 2, "The Mythical Man-Month," and ch. 18. Emphasis added in the statement of the law. Copyrighted and not mirrored locally.

[^mcconnell]: Steve McConnell, "Brooks' Law Repealed?", *IEEE Software* 16(6):6–8, November/December 1999, "From the Editor" column. The original URL now 404s; read it via the [Internet Archive](https://web.archive.org/web/20191119004015/https://stevemcconnell.com/articles/brooks-law-repealed/). Local quotation excerpt: [`references/mcconnell-brooks-law-repealed.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/mcconnell-brooks-law-repealed.md). The NASA SEL recommendation is McConnell's reference 4, *Recommended Approach to Software Development, Revision 3*, SEL-81-305, NASA Goddard, 1992.

[^farshchi]: Mostafa Farshchi, Yusmadi Yah Jusoh and Masrah Azrifah Azmi Murad, "Impact of Personnel Factors on the Recovery of Delayed Software Projects: A System Dynamics Approach," *Computer Science and Information Systems (ComSIS)* 9(2):627–652, June 2012. [doi:10.2298/CSIS110525003F](https://doi.org/10.2298/CSIS110525003F). Open access, free full PDF. The Stutzke and Hsia parameter values are from its Table 2 comparison of prior models. Local quotation excerpt: [`references/farshchi-personnel-factors-delayed-projects.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/farshchi-personnel-factors-delayed-projects.md).

[^stutzke]: Richard D. Stutzke, "A Mathematical Expression of Brooks' Law," *9th International Forum on COCOMO and Cost Modeling*, Los Angeles, 1994, pp. 1–24. No free copy located; the conditions are as restated by Farshchi et al. (see above) and by Laurie Williams et al. in their work on pair programming and Brooks's Law, which applies the same model and argues pair programming reduces both assimilation delay and mentoring time.

[^gren]: Lucas Gren, ["A fourth explanation to Brooks' Law — The aspect of group developmental psychology"](https://arxiv.org/abs/1904.02472), 10th International Workshop on Cooperative and Human Aspects of Software Engineering (CHASE), 2017; arXiv:1904.02472.

[^flyvbjerg]: Bent Flyvbjerg, "Top Ten Behavioral Biases in Project Management: An Overview," *Project Management Journal* 52(6):531–546, 2021. [doi:10.1177/87569728211049046](https://doi.org/10.1177/87569728211049046); free preprint at [arXiv:2202.00125](https://arxiv.org/abs/2202.00125). The base-rate claim draws on the paper's set of base rates from 2,062 projects.

[^qsm]: Quantitative Software Management, ["4 Key Studies on Team Size"](https://www.qsm.com/blog/2019/4-key-studies-team-size), summarising Doug Putnam (1997, 491 projects; see also ["Team Size Can Be the Key to a Successful Software Project"](https://www.qsm.com/team-size-can-be-key-successful-software-project)), Don Beckett (2006, ~600 projects), Kate Armel (2012, ~1,060 projects) and Putnam's 390-application study. **Caveat:** QSM sells estimation tools built on this database, the underlying data is proprietary and not independently auditable, and the findings support the product. Directionally consistent with the rest of the literature, but not peer-reviewed.

[^cocomo]: [*COCOMO II Model Definition Manual*](https://athena.ecs.csus.edu/~buckley/CSc231_files/Cocomo_II_Manual.pdf), USC Center for Software Engineering, section on the SCED cost driver and Table II-16. Emphasis added. The widely-cited Very Low effort multiplier of 1.43 comes from the later COCOMO II.2000 recalibration and is not in this manual's rating-level summary; the 75%-of-nominal floor is.

[^hsia]: Pei Hsia, Chih-Tung Hsu and David Kung, "Brooks' Law Revisited: A System Dynamics Approach," *Proceedings of the 23rd Annual International Computer Software and Applications Conference (COMPSAC)*, IEEE, 1999, pp. 370–375. [doi:10.1109/CMPSAC.1999.812726](https://doi.org/10.1109/CMPSAC.1999.812726). Paywalled; result as summarised by Farshchi et al. and the [Wikipedia article on Brooks's law](https://en.wikipedia.org/wiki/Brooks%27s_law).

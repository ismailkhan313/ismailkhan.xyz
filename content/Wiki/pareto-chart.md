---
type: Technique
title: "The Pareto Chart"
description: "Sorted bars plus a cumulative line, used to find the vital few — and how to point it at an IT defect backlog: choosing the category axis, weighting by cost rather than count, what the empirical software-defect literature says about whether 80/20 actually holds, and the ways the chart misleads."
tags: [pareto-chart, pareto-principle, juran, quality-management, defect-tracking, defect-management, software-quality, odc, root-cause-analysis, metrics, tpm, lean, six-sigma]
sources:
  - id: juran
    resource: references/juran-non-pareto-principle.md
    title: "Juran, J. M. (1974/1975), 'The Non-Pareto Principle; Mea Culpa', Quality Progress 8(5):8–9"
  - id: kaizen
    resource: references/kaizen-pareto-chart.md
    title: "Kaizen Institute, 'Pareto Chart: Focusing Improvement Efforts Where They Matter'"
  - id: fenton-ohlsson
    resource: https://doi.org/10.1109/32.879815
    title: "Fenton, N. E. & Ohlsson, N. (2000), 'Quantitative Analysis of Faults and Failures in a Complex Software System', IEEE Trans. Software Engineering 26(8):797–814 — paywalled; used via the authors' published abstract"
  - id: odc
    resource: https://doi.org/10.1109/32.177364
    title: "Chillarege, R. et al. (1992), 'Orthogonal Defect Classification — A Concept for In-Process Measurements', IEEE Trans. Software Engineering 18(11):943–956 — paywalled; defect-type definitions via secondary restatements"
  - id: wer
    resource: https://doi.org/10.1145/1629575.1629586
    title: "Glerum, K. et al. (2009), 'Debugging in the Very Large: Ten Years of Implementation and Experience', SOSP '09 — the Windows Error Reporting system"
generated: { by: claude-code/opus-5, at: 2026-09-19T00:00:00Z }
status: stable
---

A Pareto chart is two things drawn on one set of axes: **bars for each category,
sorted descending**, and **a cumulative percentage line** rising left to right
against a secondary axis. You read it by finding where the line flattens.
Everything to the left of the knee is where the problem lives.

It is one of Ishikawa's seven basic quality tools, it takes about four minutes
to build in a spreadsheet, and it is the most commonly misused chart in defect
management — not because the mechanics are hard but because **the two decisions
that determine the answer are made before you draw anything**: what the
categories are, and what you count in them. Most of this page is about those two
decisions as they apply to an IT defect backlog.

## The principle, and Juran's retraction

The chart rests on the claim that a few contributors account for most of an
effect. That claim is worth stating precisely, because the version in
circulation is wrong in a way its own author tried to correct.

Vilfredo Pareto studied the distribution of *wealth* and fitted a mathematical
model to it. He did not generalise it. The generalisation — that this holds
across quality, absenteeism, accidents, "the physical and biological worlds
generally" — was **Joseph Juran's**, and Juran said so in print in a 1974/1975
essay titled *"The Non-Pareto Principle; Mea Culpa"*:[^juran]

> Years ago I gave the name "Pareto" to this principle of the "vital few and
> trivial many." On subsequent challenges, I was forced to confess that I had
> mistakenly applied the wrong name to the principle. This confession changed
> nothing.

He is explicit about where it did come from — *"Where then did the universal
originate? To my knowledge, the first exposition was by myself"* — and adds that
he would have called it the Juran principle had he been "structured along
different lines."[^juran] He also gives away the cumulative curve: it *"should
have been properly identified with Lorenz."*[^juran] So the standard Pareto
chart is, strictly, a Juran principle drawn on a Lorenz curve. The source
article this page was built from makes the usual attribution — *"This pattern
reflects the work of Vilfredo Pareto, whose studies showed that a minority of
factors often determine the majority of outcomes"*[^kaizen] — which is the exact
sentence Juran wrote his essay to stop.

**The correction that actually changes practice is the other one.** Juran's
own summary records that he coined "vital few and trivial many," **"later
changed to the 'useful many'."**[^juran] That is not a euphemism. "Trivial many"
licenses ignoring the tail; "useful many" says the tail is work you do later,
not work you write off. In a defect backlog the difference is concrete: the long
tail of single-occurrence bugs is where your next reliability tier comes from
once the top three categories are fixed, and a team that learned the phrase as
"trivial" tends to close them unfixed.

One more historical detail, because it is not decoration. What Juran first
observed in the mid-1920s was *"that quality defects are unequal in frequency,
i.e., when a long list of defects was arranged in the order of frequency, a
relative few of the defects accounted for the bulk of the defectiveness."*[^juran]
**A sorted defect list is the original observation**, twenty years before the
name. Defect analysis is not an application of the Pareto chart; it is where the
Pareto chart came from.

## Anatomy and construction

Uncontroversial, and the Kaizen Institute statement of it is clean:[^kaizen]

1. Define the problem and the scope of the data.
2. Collect and categorise consistently.
3. Summarise each category by frequency **or impact**.
4. Order highest to lowest.
5. Calculate cumulative percentages.
6. Plot bars on the primary axis, the cumulative line on the secondary.

Two conditions are stated as housekeeping and are actually the whole game:
**categories must be mutually exclusive**, and **labels must follow a consistent
naming convention.**[^kaizen] Step 3's "or impact" is the other one — a
three-word aside concealing the decision that most often makes the chart wrong.
Both are taken apart below.

A Pareto chart is not a histogram. A histogram bins *continuous* data to show
the shape of a distribution; a Pareto chart ranks *discrete categories* to show
where impact concentrates.[^kaizen] They answer different questions and a
histogram of defect ages is not a Pareto chart of defect causes.

## Pointing it at an IT defect backlog

### Decision one: what the categories are

The x-axis is a claim about how the world is carved up, and the chart can only
find concentration along the axis you chose. Run the same defect data through
four different categorisations and you get four different "vital few," all
correct, each implying a different fix:

| Categorise by | The chart answers | Acts on |
|---|---|---|
| **Component / module / service** | Where do defects cluster in the system? | Refactoring, ownership, test coverage |
| **Defect type** (what was wrong in the code) | What kind of mistake do we make? | Skills, standards, linting, review checklists |
| **Injection phase** (requirements, design, code, config) | Where do defects enter? | Upstream process — the highest-leverage answer |
| **Detection phase / trigger** (unit, integration, UAT, prod) | Where do we catch them, and how late? | Test strategy and shift-left |
| **Root cause** | Why did it happen? | Whatever the cause is |
| **Customer / environment / tenant** | Who is absorbing the pain? | Targeted remediation, comms |

**Run at least two.** Component and injection-phase together are the most
informative pair for an IT project manager: the first tells you where to send
engineers, the second tells you whether sending engineers is the right response
at all. A backlog whose defects concentrate in one service is a code problem; a
backlog whose defects concentrate in *requirements* is a business-analysis
problem that no amount of refactoring touches, and only the second chart can
show you that.

Beware the category everyone has and nobody defined. Most defect trackers ship
with a type field whose values are something like Functional / UI / Performance
/ Data / Other. If **Other** is in your top three, the chart is telling you about
your taxonomy and nothing about your software. That is the first finding, and it
is a real one — fix the scheme, then re-run.

### Using a scheme somebody already validated

If you are inventing defect categories in a workshop, you are redoing work IBM
published in 1992. **Orthogonal Defect Classification (ODC)** exists precisely
to make defect categories mutually exclusive and analytically meaningful, which
is exactly the property the Pareto chart depends on.[^odc] Its defect-type
values are, with the usual definitions:[^odc]

- **Assignment / Initialization** — a value assigned incorrectly or not at all
- **Checking** — missing or incorrect validation of parameters or conditions
- **Algorithm / Method** — a local algorithm or data structure is wrong;
  fixable by rewriting it, no design change needed
- **Function / Class / Object** — significant enough to need a formal design
  change; affects capability, interfaces or global data
- **Interface** — communication between modules, components, objects
- **Timing / Serialization** — serialisation of a shared resource missing,
  incorrect, or done the wrong way
- **Relationship** — associations among procedures, data structures and objects
- **Build / Package / Merge** — library, versioning, change-management defects

Two ideas from ODC are worth taking even if you never adopt the taxonomy.

**The defect-type distribution should change as a project progresses**, and
that shift is itself the signal.[^odc] Early phases should surface
Function/Class/Object defects; late phases should surface
Assignment/Initialization and Checking. **A system in UAT still throwing
Function-class defects is not late in its lifecycle no matter what the plan
says** — and a Pareto chart per phase, compared across phases, is how you see
it. This is the single most useful thing on this page for anyone running a stage
gate.

**The trigger is separate from the type.** ODC records *"the force that surfaced
the fault"* alongside what was wrong. Type measures the product; trigger
measures your *verification process*.[^odc] A Pareto chart of triggers tells you
which test activities are earning their keep and which are finding nothing —
information no chart of defect types can give you.

### Decision two: count or cost

**This is where most defect Pareto charts go wrong.** The default is to count
defects, because that is what the tracker exports. Counting treats a cosmetic
misalignment and a data-corruption bug as one unit each.

Weight instead. Anything defensible beats raw count:

- **Severity-weighted** — the cheap version. Assign weights (say S1=100, S2=20,
  S3=5, S4=1) and sum. Crude, arbitrary at the edges, and still a large
  improvement.
- **Effort** — engineer-hours to diagnose and fix, which is what the defects
  actually cost *you*. Usually already in the tracker as logged time.
- **User impact** — incidents raised, users affected, or minutes of degraded
  service. What the defects cost *the business*.
- **Escaped-defect cost** — weight by where it was found, since a defect caught
  in production costs a large multiple of the same defect caught at unit test.

The charts diverge sharply, and the divergence is the finding. A category that
is **tall by count and short by cost** is noise you should batch or automate
away — often it is one flaky test or one validation message. A category that is
**short by count and tall by cost** is the thing that will hurt you, and a
count-based chart buries it. If you build only one chart, build the cost one; if
you build two, build both and look at the gap.

This is also the honest reading of the Kaizen page's caution that the chart
*"highlights relative frequency or impact but does not evaluate absolute
risk"*[^kaizen] — and its corollary that **a low-frequency category may still
demand immediate action on safety, regulatory or compliance grounds.** Security
defects are the standing example. A single authentication bypass will never win
a frequency contest and must never be prioritised by one. Pull safety, security
and regulatory defects out and handle them on a risk track before you chart what
remains; a Pareto chart is a tool for allocating *discretionary* effort.

### Getting the data out without lying to yourself

The chart inherits every collection bias in the tracker, and defect data is
biased in known directions:

- **You can only chart what was reported.** Components under heavy test look
  fault-prone; components nobody exercises look clean. Normalise by usage or
  test coverage where you can, and say so where you can't.
- **Categories assigned at triage, under time pressure, by whoever picked the
  ticket up** are noisy. If the type field is set once at creation and never
  revised after the fix, it records the initial guess, not the diagnosis. Make
  re-classification at closure part of the definition of done — ODC's whole
  premise is that the classification is made by the person who fixed it.
- **One root cause can generate many tickets.** Duplicate detection matters more
  than it looks: without it, the loudest bug wins the chart rather than the
  worst one. This is exactly what Windows Error Reporting's *bucketing* does
  before any counting happens.[^wer]
- **Reopened defects** should count once as a defect and separately as a
  process failure. A Pareto chart of *reopen reasons* is an underused and very
  cheap diagnostic.
- **Date the window and keep it fixed.** "All open defects" is not a data set;
  it is a snapshot of a queue, weighted toward whatever is currently unfixed.

## Does 80/20 actually hold for software defects?

Mostly yes for *where* defects are, with two serious qualifications that the
quality-tool literature never mentions because it is written about
manufacturing.

**The concentration is real and it is stronger than 80/20 at the extremes.**
Microsoft's Windows Error Reporting is the largest published instance: crashes
are grouped into buckets, and the distribution is steep enough that Steve
Ballmer reported **about 20% of bugs cause 80% of all errors, and 1% of bugs
cause half of all errors.**[^wer] That second number is the interesting one — at
that concentration, "fix the top bucket" is a coherent reliability strategy on
its own. Fenton and Ohlsson, studying two releases of a major commercial system,
found **strong evidence that a small number of modules contain most of the
faults found in pre-release testing, and that a very small number contain most
of the faults found in operation.**[^fenton-ohlsson]

**Qualification one: fault density does not track module size, and complexity
metrics do not predict fault-proneness.** Fenton and Ohlsson found *no* evidence
for the widely repeated claim relating module size to fault density, and none
that popular complexity metrics predict either fault-prone or failure-prone
modules.[^fenton-ohlsson] So a Pareto chart by component is worth building, and
the tempting shortcut — ranking modules by size or cyclomatic complexity instead
of by observed defects — is not supported.

**Qualification two, and it should stop you.** The same study found a
counter-intuitive relationship: **the modules most fault-prone *pre*-release are
among the *least* fault-prone post-release, and the modules most fault-prone
post-release are among those with fewest faults found pre-release.**[^fenton-ohlsson]

Sit with what that does to the obvious workflow. Pareto-charting your
pre-release defect data and concluding "these three components are our risk, so
watch them in production" is, on this evidence, close to backwards. The plausible
reading is that heavy pre-release fault discovery means heavy pre-release
*testing*, and those modules go out comparatively clean — while the modules
nobody tested hard show up quiet on the chart and then fail in production. The
chart measures where you *looked* at least as much as where the defects *are*.
**A Pareto chart of pre-release defects is a report on your test coverage. Only
a chart of production defects is a report on your software.** Build both, label
them clearly, and never use the first to predict the second.

## How it misleads

- **A flat chart is a result, not a failed chart.** If no knee appears, the
  defects genuinely are diffuse, and the correct conclusion is that there is no
  vital few and you should fix your process rather than hunt for a hotspot.
  Teams routinely respond by re-cutting categories until a spike appears, which
  is manufacturing the answer.
- **The "Other" bucket beats everything.** Discussed above. Always a taxonomy
  finding, never a software finding.
- **Category count changes the shape.** Split one category into three and it may
  drop out of the vital few; merge three into one and it may enter. Nothing in
  the data changed. Fix the scheme before charting and do not adjust it to taste
  afterwards.
- **It shows *what*, never *why*.** The chart is the start of the analysis and
  people treat it as the end. Its proper role is *"directing teams toward issues
  warranting deeper investigation through tools such as root cause analysis, the
  fishbone diagram, process mapping."*[^kaizen] A Pareto chart with no root-cause
  work behind it produces the fix that addresses the symptom.
- **The distribution moves, and it moves *because* you acted.** Fix the top
  category and it leaves the top; the number two becomes number one without
  having got any worse. Judging progress by "what's on top now" guarantees the
  feeling of no progress. **Track the absolute height of the bars over time, not
  the ranking** — the ranking is designed to always show you a problem.
- **It has no time axis.** A category that is large because of one bad week
  looks identical to one that is large because of a chronic condition. Check the
  time series before acting on any bar.
- **Counting is not measuring.** Covered above, and it remains the most common
  single error.

## Cadence, and who acts on it

Update frequency should follow process volatility: periodic in stable
conditions, **weekly or daily where the chart supports an active problem-solving
routine**, and at Measure/Analyze/Control milestones in a DMAIC
project.[^kaizen] For an IT delivery team the natural placements are a
**per-sprint chart by component and type** for the team, a **per-release chart
weighted by cost** for the steering group, and a **per-quarter chart by
injection phase** for whoever owns the development process — that last one
changes slowly and is the one most worth trending.

Two connections to the rest of this wiki are worth making explicit.

**A Pareto chart is a detection mechanism, and detection is only half a loop.**
The pattern in [Closing the Loop on Metrics](</AI-Native SDLC/closing-the-loop.md>)
is the natural next step: a deterministic script watches a metric against
control bands and invokes an agent on a breach, with the diagnosis written back
as a committed artifact. A defect Pareto recomputed nightly is exactly such a
metric, and "the top category changed" or "the top bar exceeded its band" is
exactly such a trigger.

**The chart identifies the vital few; it does not decide what to do about
them.** "Refactor the payments service, defer the rest of the backlog" is a
choice among options with costs and risks — a decision with an Approver, not a
task with an owner, and therefore a [DACI](/daci-framework.md) rather than a row
in a [RACI](/raci-matrix.md). The Pareto chart belongs in the *Relevant data*
section of that decision document. Teams that skip this step tend to let the
chart make the decision, which works only when the top category is also the one
the organisation can actually act on — and it frequently is not.

One caution from elsewhere in this wiki applies directly. [Brooks's
Law](/brooks-law.md) records that heavier staffing on a late project bought
roughly 30% schedule at the price of around 500% more testing defects. If your
defect Pareto is rising across the board rather than concentrating, the cause
may be upstream of the code entirely, and no category on the chart will name it.

## What this page can't reach

- **Fenton & Ohlsson (2000) is behind the IEEE paywall.** Its findings are
  reported here from the authors' published abstract, not from the paper. The
  specific percentages behind "a small number of modules" — the figures usually
  quoted as 20%/60% — are **not** verified here and are deliberately not stated
  as numbers. The directional findings, including the pre/post-release
  reversal, are the authors' own words in the abstract.
- **The ODC paper is likewise paywalled**, and the defect-type definitions here
  come from secondary restatements of it. Sources disagree on whether there are
  seven or eight defect types, depending on whether Documentation is counted;
  the list above is the common core and should be checked against
  Chillarege et al. before being adopted as a standard.
- **The Ballmer 80/20 and 1%/50% figures are executive statements about internal
  Microsoft data**, not a published dataset, and no independent audit exists.
  The SOSP paper on Windows Error Reporting is the primary source for the
  bucketing architecture, not for those two ratios.
- **No standard is cited for the chart itself.** Ishikawa's seven basic tools
  and the ASQ/ISO quality-tool literature would be the normative anchors; none
  was read for this page, and the construction steps come from a consultancy
  explainer rather than a standard.
- **Nothing here is evidence that using Pareto charts improves outcomes.** The
  evidence cited establishes that software defects *are* concentrated, which is
  a precondition for the tool being useful, not a demonstration that teams who
  chart them do better than teams who don't.
- **Juran's 1974 vs. 1975 dating is unresolved** — the Juran Institute reprint
  says 1974, the *Quality Progress* publication is 1975, and the literature
  splits. Cited here as both.

[^juran]: [Juran, J. M., "The Non-Pareto Principle; Mea Culpa", *Quality Progress* 8(5):8–9, 1975 (Juran Institute reprint dated 1974)](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/juran-non-pareto-principle.md). Free PDF from the [Juran Institute](https://www.juran.com/wp-content/uploads/2021/03/The-Non-Pareto-Principle-1974.pdf).
[^kaizen]: [Kaizen Institute, "Pareto Chart: Focusing Improvement Efforts Where They Matter"](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/kaizen-pareto-chart.md).
[^fenton-ohlsson]: Fenton, N. E. & Ohlsson, N., "Quantitative Analysis of Faults and Failures in a Complex Software System", *IEEE Transactions on Software Engineering* 26(8):797–814, 2000. [doi:10.1109/32.879815](https://doi.org/10.1109/32.879815). Paywalled; findings taken from the authors' published abstract only.
[^odc]: Chillarege, R., Bhandari, I., Chaar, J., Halliday, M., Moebus, D., Ray, B. & Wong, M., "Orthogonal Defect Classification — A Concept for In-Process Measurements", *IEEE Transactions on Software Engineering* 18(11):943–956, 1992. [doi:10.1109/32.177364](https://doi.org/10.1109/32.177364). Paywalled; defect-type definitions from secondary restatements. See also [chillarege.com](https://www.chillarege.com/odc/).
[^wer]: Glerum, K. et al., "Debugging in the Very Large: Ten Years of Implementation and Experience", *SOSP '09*, [doi:10.1145/1629575.1629586](https://doi.org/10.1145/1629575.1629586), for the bucketing architecture. The 80/20 and 1%/50% ratios are Steve Ballmer's 2002 statements about Windows Error Reporting data, reported secondhand and not independently audited.

---
type: Practice
title: "Dependency Mapping"
description: "Making the links between work items, teams and systems explicit before they surface as blockers — the two different things IT calls dependency mapping, the taxonomy that tells you which dependencies are removable, the cycles a Gantt chart structurally cannot draw, and the register that is the artifact worth maintaining."
tags: [dependency-mapping, dependencies, project-management, tpm, critical-path, precedence-diagramming, design-structure-matrix, conways-law, safe, pi-planning, cmdb, itsm, risk-management]
sources:
  - id: easyvista
    resource: references/easyvista-project-dependency-mapping.md
    title: "EasyVista, 'Project Dependency Mapping: A Strategic Pillar for IT Success'"
  - id: atlassian
    resource: references/atlassian-project-dependencies.md
    title: "Atlassian, 'Project dependencies: Types & ways to manage them effectively'"
  - id: pmbok
    resource: https://www.pmi.org/standards/pmbok
    title: "Project Management Institute, A Guide to the Project Management Body of Knowledge (PMBOK Guide) — paywalled; dependency-determination taxonomy via widely quoted definitions"
  - id: dsm
    resource: https://en.wikipedia.org/wiki/Design_structure_matrix
    title: "Design Structure Matrix (Steward, 1981); see also Eppinger, S. D. & Browning, T. R. (2012), Design Structure Matrix Methods and Applications, MIT Press"
  - id: conway
    resource: https://www.melconway.com/Home/Committees_Paper.html
    title: "Conway, M. E. (1968), 'How Do Committees Invent?', Datamation 14(5):28–31"
generated: { by: claude-code/opus-5, at: 2026-09-19T00:00:00Z }
status: stable
---

A dependency is a relationship where one piece of work cannot start, finish or
succeed without something from somewhere else. Dependency mapping is the
practice of finding those relationships, writing them down with owners and
dates, and governing them — and the reason it earns a discipline rather than a
diagram is that **the expensive dependencies are the ones nobody wrote down.**
EasyVista's framing is right: *"Project Dependency Mapping is not a set of
technical tools: it is a management discipline."*[^easyvista]

Two things about the practice are worth settling before anything else: the term
names two different activities that get conflated, and the taxonomy most people
use cannot tell you which dependencies to attack.

## Two different things called dependency mapping

**Delivery dependency mapping** operates on *work*: tasks, deliverables,
approvals, teams. Its unit is a commitment between two parties, it lives in a
register and a plan, it has owners and dates, and it is finished when the work
is. Both sources on this page are about this.[^easyvista][^atlassian]

**Service or infrastructure dependency mapping** operates on *things*:
applications, servers, databases, network paths, business services. Its unit is
a topological fact, it lives in a CMDB or an observability platform, it is
usually discovered automatically, and it is never finished because the estate
keeps changing. EasyVista's vertical/horizontal split belongs here — *"vertical
dependencies, which exist between different types of components (for example, a
business service relying on an underlying application), and horizontal
dependencies, which exist between components of the same type."*[^easyvista]

They are related but they are not the same map, and **an IT project manager
will be handed both and expected to know which one is being asked for.** The
practical rules:

- **Do not merge them.** A CMDB relationship is a fact about the estate that
  outlives your project; a delivery dependency is a commitment that expires at
  go-live. Putting project rows in the CMDB pollutes a system of record that
  change management and incident response depend on.
- **Do join them at one point: impact analysis.** When a delivery dependency
  concerns a specific system, the service map tells you what else that system
  touches — which is how you discover that the "small" database change your
  project depends on has fourteen downstream consumers you have never met.
- **The service map is the better-evidenced of the two.** It is discovered from
  live data; the delivery map is elicited from people's memory in a workshop,
  which is why it is systematically incomplete in the direction of things
  nobody thought to mention.

The rest of this page is about the delivery map, with the service map returning
where the two touch.

## The taxonomy that is actually useful

Both source articles give lists of dependency *categories*. EasyVista's is
temporal, logical, resource, organizational, technical.[^easyvista] Atlassian
gives only the four logical relationships.[^atlassian] Neither list answers the
question a project manager actually has, which is **which of these can I get
rid of?**

The taxonomy that does is PMBOK's dependency determination, and it is two
independent binary axes rather than a list:[^pmbok]

|  | **Internal** (inside the team's control) | **External** (outside it) |
|---|---|---|
| **Mandatory** ("hard logic") — inherent in the nature of the work | Cannot remove, can sometimes overlap | **Cannot remove, cannot control — manage as risk** |
| **Discretionary** ("soft logic") — a preference, a best practice, how we usually do it | **Remove or resequence freely — start here** | Negotiate; it is someone else's preference |

Why this beats the categorical lists: **it sorts dependencies by what you can do
about them.** You cannot pour the foundation after the walls; that is mandatory
and no amount of management changes it. But "we always do security review after
UAT" is discretionary, and a project manager under schedule pressure who does
not know the difference will try to compress the wrong link.

This is also the correct first move when a schedule needs compressing. **Fast
tracking — running things in parallel that were planned in sequence — is only
available against discretionary dependencies.** Attempting it against a
mandatory one does not compress the schedule; it produces rework, which is
[Brooks's Law](/brooks-law.md)'s third mechanism arriving by a different route.
So the single most valuable column in a dependency register is the one the
vendor templates omit: **is this hard or soft, and who says so?**

A caution on discretionary dependencies, which are not free to remove just
because they are removable. They usually encode a reason — a past incident, a
regulator, a team's limited capacity — and the reason is often unwritten.
Removing one is a decision with a risk attached, not a scheduling optimisation.

### The four logical relationships

Orthogonal to the above, and the part both sources cover. Each describes how two
activities' *ends* relate:[^atlassian]

- **Finish-to-start (FS)** — B cannot start until A finishes. The default and
  the overwhelming majority.
- **Start-to-start (SS)** — B cannot start until A starts. Use for genuine
  parallel work sharing a trigger.
- **Finish-to-finish (FF)** — B cannot finish until A finishes. Common in
  validation: UAT cannot close until the final build is in.
- **Start-to-finish (SF)** — B cannot finish until A starts. Rare, and real:
  *"a security guard cannot finish their shift until the next guard arrives."*
  In IT it is the cutover pattern — the legacy system cannot be retired until
  the replacement is live.[^easyvista]

All four take **leads and lags**, which neither source mentions and which are
where most real schedule logic lives.[^pmbok] A lag is enforced waiting: *FS + 5
days* for a change-freeze window, a DNS propagation, a procurement cycle. A lead
is permitted overlap: *FS − 3 days*, start integration testing three days before
development formally completes. **A dependency register with no lag column will
systematically understate your schedule**, because the waiting is invisible —
and in enterprise IT, the waiting (approvals, windows, vendor SLAs) is often
longer than the work.

Both source articles muddle their own examples of these relationships, which is
worth knowing if you are tempted to lift them. Atlassian's landscaping example
states the dependency direction backwards in the paragraph immediately after
establishing it, and two of its four type examples describe a different
relationship than the one they illustrate.[^atlassian] The definitions are
standard and correct; the examples are not, and the errors are documented in the
reference file rather than repeated here.

## The cycles a Gantt chart cannot draw

This is the most important thing on this page and neither source mentions it.

Both recommend network diagrams and Gantt charts as the visualisation.[^easyvista][^atlassian]
Both of those are **directed acyclic graphs**. They cannot represent a cycle,
because a schedule with a cycle has no valid ordering and the tool will reject
it or silently drop a link.

Real IT projects are full of cycles:

- The API team needs the client team's requirements; the client team needs the
  API contract to write requirements.
- Security cannot approve the design until the architecture is fixed;
  architecture will not be fixed until security's constraints are known.
- Capacity planning needs the performance test results; the performance test
  needs a sized environment.

These are **coupled activities**, and the honest description is that they
resolve by iteration, not by sequencing. Force one into a Gantt chart and you
get a fiction: an arbitrary tie-break that shows a clean handoff where there is
actually a negotiation, and a plan that "slips" every time reality iterates.

The tool built for this is the **Design Structure Matrix (DSM)**, from Steward
(1981) — an N×N matrix with the same elements on both axes and a mark where one
depends on another.[^dsm] Because it is a matrix rather than a graph drawing, it
has no trouble with cycles, and that is precisely its claim: **DSM represents
feedback linkages that Gantt and PERT techniques cannot model.**[^dsm] Its
standard operations are the useful part:

- **Partitioning** — reorder rows and columns to push marks below the diagonal.
  What comes out is a sequence; what *cannot* be pushed below the diagonal is a
  block of genuinely coupled activities on the diagonal. **The blocks are the
  finding.** A DSM does not eliminate the cycles, it localises them, and a
  coupled block of three activities is a very different management problem from
  a chain of three.
- **Tearing** — choosing which feedback link to break by assuming an answer, so
  the block can be sequenced.[^dsm] In practice this is "we will assume the API
  returns these fields and rework if wrong," and the value of naming it is that
  the assumption becomes explicit and someone owns it.

You do not need DSM software. **An N×N grid in a spreadsheet with your ten
workstreams on both axes, filled in during the same workshop you would have run
anyway, is enough** — and it will surface coupled pairs that the linear
discovery process in both source frameworks is structurally unable to find,
because that process asks "what does this need?" one task at a time and never
closes the loop.

## Building and running the map

The discovery-and-governance mechanics are the part the vendor content does
well, and EasyVista's eight-step framework is the better of the two.[^easyvista]
Condensed, with the load-bearing parts marked:

1. **Inventory every active workstream, including the unofficial ones.**
   *"Hidden projects are a primary source of undocumented dependencies."*[^easyvista]
2. **Run cross-functional discovery sessions.** Dependencies that cross team
   boundaries are the ones siloed planning misses.[^easyvista] Atlassian's
   prompt is the right one to use in the room: *"Ask what tasks you need to
   start or finish before the task can begin."*[^atlassian]
3. **Classify** — hard/soft, internal/external, relationship type, lag.
4. **Register it.** Minimum fields: predecessor, successor, named owner on
   *each* side, type, needed-by date, status. *"A dependency that is not
   documented is a dependency that will not be managed."*[^easyvista]
5. **Visualise** — network diagram or Gantt for the acyclic majority, a DSM
   grid for the coupled parts.
6. **Owners and cadence.** Bi-weekly for active complex programmes, monthly for
   stable ones.[^easyvista]
7. **Escalation thresholds, defined in advance.** EasyVista's example: blocked
   more than 48 hours escalates to the programme manager. *"Escalation paths
   should be documented before they are needed, not improvised when a crisis
   occurs."*[^easyvista]
8. **Review at every milestone**, and on any new or changed dependency.

Three things to add that neither source says.

**A dependency needs an owner on both ends.** The vendor templates have one
owner field, which quietly means the consumer — the person who will be blocked.
That person cannot deliver the thing. Without a named provider who has *agreed*,
you have recorded a hope. The discipline that gets this right is SAFe's PI
planning, where each dependency drawn on the program board has a named owner at
each end before the event closes, which is what converts an assumed connection
into an accepted commitment. Whatever your method, **the test is whether the
providing team has said yes out loud.**

**Record the date the dependency is needed by, not the date it is promised.**
These diverge, and the gap is your float. A register holding only promised dates
shows green until the promise slips, at which point you learn simultaneously
that it slipped and that you had no slack.

**Log blocked-days.** Every dependency should accumulate how long it has
actually held work up. This is the only number that turns the register into
evidence, and it feeds the next section.

## Which dependencies actually cost you

A register of eighty dependencies tells you nothing about where to spend
attention. Rank them, and rank them by cost rather than by count — sort the
register by accumulated blocked-days and read it as a [Pareto
chart](/pareto-chart.md). Concentration is usually severe: a handful of
recurring providers (the integration team, the change advisory board, one
vendor) generate most of the waiting, and the finding is actionable in a way
that "we have eighty dependencies" is not.

Two diagnostics from that ranking are worth running explicitly:

- **By provider.** If one team appears in the top slots repeatedly, you do not
  have a dependency problem, you have a capacity or a boundary problem, and
  managing the dependencies harder will not fix it.
- **By type.** If most blocked-days come from *organisational* dependencies —
  approvals, budgets, decisions — the fix is decision-rights work rather than
  scheduling work. EasyVista flags this category as *"often the least visible
  and the most disruptive when unmanaged,"*[^easyvista] and that matches
  experience: waiting on a decision nobody owns is the most common form of
  blocked, and it is exactly what a [DACI](/daci-framework.md) is for. A
  dependency on an unmade decision should be converted into a decision with a
  named Approver and a date, not tracked as a task waiting on another task.

## Dependencies are a symptom of structure

The deepest point about dependency management is that most cross-team
dependencies are not accidents of planning. **Conway's Law** — organisations
*"are constrained to produce designs which are copies of the communication
structures of these organizations"*[^conway] — runs in both directions: the
architecture reflects the team boundaries, and the team boundaries then generate
the coordination traffic.

The consequence for a project manager is worth being clear-eyed about. If a
feature consistently requires four teams to coordinate, that is the system
telling you the boundary between those teams does not match the boundary in the
software. Mapping the dependency makes it visible and manageable; it does not
remove it, and no amount of register hygiene will. **Dependency mapping is
symptom management for a structural problem**, which is a good reason to do it
and a bad reason to expect the count to fall over time.

That reframes what a rising dependency count means. It is not necessarily a
planning failure — it may be an accurate reading of an architecture that has
outgrown its team topology. Worth saying out loud to a steering group, which
will otherwise read the same number as poor project control.

This is also the link back to [Brooks's Law](/brooks-law.md), whose third
mechanism is limited divisibility: *"Integration, a single hard debugging
thread, one contended schema — sequential constraints do not parallelise."* A
dependency map is, precisely, an inventory of the constraints that do not
parallelise. If it is dense, adding people will not help, and you now have the
evidence for saying so.

## How it fails

- **Built once, at kickoff, never touched.** The most common failure by a wide
  margin, and the source's own warning is the right one: *"a dependency map that
  is not actively maintained becomes a liability rather than an asset"*[^easyvista]
  — a liability specifically because people trust it.
- **Recorded without agreement.** Writing "needs API from Platform team by
  March" in your register does not create an obligation on the Platform team.
  Unconfirmed dependencies are the main reason registers look healthy until they
  suddenly don't.
- **Only the obvious ones.** Discovery surfaces technical, task-shaped
  dependencies because those are what people volunteer. The expensive ones are
  approvals, budgets, shared people, and environment availability.
- **Too granular.** A register at the ticket level cannot be maintained and
  duplicates the tracker. Map dependencies between *teams and deliverables*;
  let the tracker hold task links.
- **No cycles modelled**, so coupled work is drawn as a clean handoff and the
  plan slips every iteration. Covered above.
- **Owned by the PMO, unused by the teams.** A register maintained for reporting
  drifts from the one teams actually consult, which is usually a whiteboard or a
  channel. If the two disagree, the whiteboard is right.
- **Mistaking the map for mitigation.** Visibility is not a contingency plan.
  For the top few dependencies the question is what you do *if* it slips, and
  that answer belongs in the register too.

## Claims not to repeat

Three things travel with this topic that do not survive checking, all of them
from the sources here.

**"Dependency hell" does not mean cascading failure.** EasyVista defines it as
*"the cascading failure scenario where a problem in one IT component...
propagates through a chain of dependent systems."*[^easyvista] The established
meaning is the package-management problem: components requiring mutually
incompatible versions of the same shared library, where fixing one conflict
creates another. Related terms are *JAR hell* and *version skew*. Use "cascading
failure" or "blast radius" for the propagation case — say "dependency hell" to
your engineers and they will think you mean a build problem.

**The Gartner "$5,600 per minute" downtime figure is roughly a decade old.** It
traces to a 2014 Gartner blog post; the original page has been retired, and
Gartner itself noted the number varies enormously by organisation. EasyVista
presents it undated as a current estimate.[^easyvista] It circulates almost
entirely through secondary copies. If you need a downtime cost, derive one for
your own services.

**PMI's 11.4% waste figure is real but is being made to say something PMI did
not.** The number is from *Pulse of the Profession* 2020, and PMI's 2021 report
revised it down to 9.4% — so an undated citation of 11.4% is already stale. More
importantly, EasyVista appends *"and dependency blind spots are a primary
contributor,"*[^easyvista] which is not PMI's finding. A real statistic has had
an unsupported causal claim attached to it, and it is the causal claim that is
doing the persuading.

## What this page can't reach

- **The PMBOK Guide is paywalled.** The mandatory/discretionary and
  internal/external axes, and the treatment of leads and lags, are reported from
  widely quoted definitions and secondary restatements, not from the standard.
  The four-cell table is this wiki's arrangement of them.
- **Steward's 1981 DSM paper and Eppinger & Browning's book were not read.** The
  DSM material here comes from encyclopaedic and survey summaries. The central
  claim used — that DSM can represent feedback linkages Gantt and PERT cannot —
  is well attested, but the partitioning and tearing descriptions are
  simplified, and no worked example has been verified.
- **No empirical evidence is offered that dependency mapping improves
  outcomes**, and none was found. Both sources assert benefits without study;
  one attaches a real statistic to an unsupported cause. The mechanisms here are
  plausible and widely practised, which is not the same thing.
- **The scaled-agile mechanisms are named, not assessed.** SAFe's program board
  is described from secondary accounts; SAFe's own guidance and the criticism of
  it have not been read, and a page on PI planning would be the place for that.
- **ITIL 4 service configuration management and CMDB practice** are the
  normative anchors for the service-map half of this page and are paywalled;
  the vertical/horizontal distinction is taken from vendor content.
- **Conway's Law is used as stated in the 1968 paper**, without the later
  empirical work (Herbsleb, MacCormack et al.) that tested it. Whether the
  mirroring holds as strongly as the slogan implies is a live question this page
  does not enter.

[^easyvista]: [EasyVista, "Project Dependency Mapping: A Strategic Pillar for IT Success"](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/easyvista-project-dependency-mapping.md). Vendor content with embedded product placements; used for its implementation framework, not its statistics or terminology.
[^atlassian]: [Atlassian, "Project dependencies: Types & ways to manage them effectively"](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/atlassian-project-dependencies.md). Definitions of the four relationship types are correct; three of the four worked examples are not, and the errors are documented in the reference file.
[^pmbok]: Project Management Institute, *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*, on dependency determination (mandatory, discretionary, external, internal), the precedence diagramming method, and leads and lags. Paywalled; see "what this page can't reach".
[^dsm]: [Design Structure Matrix](https://en.wikipedia.org/wiki/Design_structure_matrix), originating with Donald V. Steward (1981). The standard modern treatment is Steven D. Eppinger & Tyson R. Browning, *Design Structure Matrix Methods and Applications*, MIT Press, 2012; see also [dsmweb.org](https://dsmweb.org/) on partitioning and tearing. Neither the original paper nor the book was read for this page.
[^conway]: [Melvin E. Conway, "How Do Committees Invent?", *Datamation* 14(5):28–31, April 1968](https://www.melconway.com/Home/Committees_Paper.html).

---
type: Study Guide
title: "GAIL Module 4: Gen AI Apps — Transform Your Work"
description: Prompting techniques (zero/one/few-shot, role prompting, RAG), Google Workspace with Gemini, Gemini surfaces (Advanced, Gems, Notebook), and Gemini for Google Cloud.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL, agents]
sources:
  - id: module4-slides
    resource: references/genai-leader-module-4-slides.md
    title: "Module 4 slide deck (Generative AI Leader course)"
generated: { by: claude-code/opus-5, at: 2026-09-10T01:46:57Z }
status: draft
---

Module 4 is the hands-on module. Where Module 3 mapped the landscape, this one
picks up the tools a working professional actually touches: how to write a
prompt that behaves predictably, and which Gemini surface to reach for. Most
of the exam weight here is discrimination between products that sound alike —
Gems, Saved Info, Gemini Advanced, and Gemini Notebook all "personalize"
something, and the questions turn on which one personalizes what.[^module4-slides]

> **A caveat on the exam notes in this module.** The deck's answer slides
> marked correct options graphically, and that highlighting didn't survive
> text extraction. The answers below are derived from the deck's own
> definitions elsewhere — high-confidence, but not verbatim-confirmed the way
> the other modules' are.

## Prompting by example: zero-, one-, and few-shot

The three techniques differ by exactly one variable — **how many worked
examples you put in the prompt before the real request.** More examples means
the model has more to pattern-match against, which is why reliability climbs
across the three.

- **Zero-shot** — ask the model to complete a task with **no** examples. It
  answers purely from what it already knows. *"What is Cymbal Retail's returns
  policy?" — the model answers from general knowledge, having no
  company-specific training, which is exactly the weakness of this approach
  for company-specific tasks.*
- **One-shot** — show the model **one** example, then give it the real task.
  *A single customer inquiry about shipping times paired with an ideal
  response, then a new query — the output follows that example's pattern.*
- **Few-shot** — provide **multiple** examples. *Several inquiry/response
  pairs covering shipping and returns, then a new query — the output matches
  the desired pattern more reliably than one-shot does.*

Few-shot is the most reliable of the three when you need output in a specific
format or voice — the deck makes that comparison explicitly against one-shot.

> **Exam note:** the technique relying **entirely on the model's pre-existing
> knowledge, with no examples provided**, is **zero-shot**. "Multi-shot"
> appears as a distractor and is not one of the course's terms.

## Role prompting

**Role prompting** assigns the model a specific role or persona to guide its
behavior. It works because a persona carries a whole bundle of implied
conventions — vocabulary, level of formality, what counts as relevant — that
you'd otherwise have to specify one instruction at a time. What it controls:
**style, tone, and focus.**

- *"You are a customer service agent for a telecommunications company with ten
  years of experience. A customer is inquiring about their latest bill, which
  is higher than expected."* → a helpful, patient response that explains
  possible reasons, offers solutions, and states policy clearly.
- *"You are a marketing copywriter for a new line of athletic wear. Write a
  product description for a pair of running shoes emphasizing comfort and
  performance."* → persuasive, audience-targeted copy.

The template the course gives: **"You are a [persona]. Please write a [task]."**

> **Exam note:** the main advantage of role prompting is that it **influences
> the style, tone, and focus of responses by assigning a persona** — not that
> it helps the model learn from examples (that's few-shot) or understand
> complex questions. And in the language-tutor question, the best role prompt
> is the one supplying **both a persona and a manner** — "a helpful and
> encouraging tutor who provides constructive feedback" — over one that just
> names a function.

## Prompt chaining

**Prompt chaining** is a multi-turn sequence in the same thread where each
prompt builds on the model's previous response, converging on a more
sophisticated result than a single prompt would produce. In Gemini you keep
the thread going without repeating history, and you can name and pin chats.

**Four steps:**

1. **Set a goal** — a multi-step task or complex question. *A business
   proposal, a trip itinerary, a multi-element marketing image.*
2. **Start the chain** — an initial prompt that sets the stage. *"I need to
   plan a 5-day business trip to Tokyo in August. Can you help me create a
   preliminary itinerary?"*
3. **Build the chain** — follow-up prompts that refine. *"Can you suggest
   hotels near the conference center?" then "Can you add day trips to nearby
   cities?"*
4. **Observe and analyze** — watch how each prompt compounds on the last.

*Worked scenario: a marketing manager first asks for anti-aging organic
skincare campaign ideas and gets social, influencer, and content directions;
the follow-up narrows that into a three-month content calendar for the same
audience.*

## Reusable prompt templates

A template is a prompt written once with `[bracketed]` parameters, then reused
across a role's recurring tasks. The value is consistency — the same structure
produces comparable output every time, and colleagues can share a template
rather than each rediscovering what works.

- **Marketing manager** — "Write a catchy social media post for `[platform]`
  promoting our new `[product/service]`. Highlight `[key features]` and
  include a call to action to `[desired action]`."
- **Content writer** — "Write a `[content type]` about `[topic]`. The target
  audience is `[audience]`. The tone should be `[tone]`. Include `[keywords]`."
- **Customer support** — "Respond to this customer email: `[email]`. Be
  empathetic and address their concerns about `[issue]`. Offer a solution that
  aligns with our `[company policy]`."
- **Software developer** — "Write Python code to `[task]`. Use
  `[libraries/frameworks]` and follow `[coding style guidelines]`."

## Grounding and RAG

**Grounding** is the model's ability to connect its output to verifiable,
specific sources of information — the direct remedy for hallucination, covered
in full alongside the other limitation fixes in
[Module 2](</Google GAIL/module-2-foundational-concepts.md>).

**RAG (retrieval-augmented generation)** is grounding implemented through
search. This module frames it as two steps: **retrieve** relevant information
from a vast knowledge base, then **generate** the final output using what was
retrieved. The architectural difference is visible in the flow:

- **Without RAG:** Prompt → Model → Output
- **With RAG:** Prompt → Query → Vector DBs → Model → Output

**Three benefits:**

- **Improved accuracy and relevance** — outputs are more accurate and
  informative.
- **Improved explainability and transparency** — the system can show which
  specific sources produced the output.
- **Extended capabilities** — the model responds based on context it was
  given, reaching beyond what it memorized during training.

[Module 5](</Google GAIL/module-5-genai-agents.md>) covers the full
three-stage version (retrieval, augmentation, generation) and the retrieval
tooling.

> **Exam note:** RAG's primary function is **enabling the model to access and
> use external knowledge sources when generating outputs.** The distractor to
> avoid is "enhance the model's ability to memorize" — RAG is the opposite of
> memorization, which is precisely its point.

## Google Workspace with Gemini

Google Workspace is the suite — Gmail, Calendar, Drive, Meet, Chat, Docs,
Sheets, Slides, Forms, Keep, Voice, Sites, Tasks, Apps Script, Admin. Adding
Gemini puts AI inside the apps people already work in, which is the whole
value proposition: no context switch, and the AI can see your existing
material.

**The Gemini side panel** appears alongside many Workspace apps and can
summarize, analyze, and generate content using insights from your emails and
documents — without switching applications or tabs. *A new employee uses the
Drive side panel to get up to speed on existing projects.*

**Per-app capabilities:**

| App | What Gemini does | Example |
|---|---|---|
| **Gmail** | Write and refine emails | An HR rep drafts a company-wide benefits announcement |
| **Docs** | Content creation, refining, proofreading in-document | A marketer generates taglines and social posts for a shoe campaign |
| **Slides** | Generates photorealistic images for decks | "Create an image of a modern office building" |
| **Sheets** | Generates formulas from a natural-language description | "Create a formula to find cell C1 in range D:G and output the value in column G" |
| **Meet** | Real-time transcription and translation; meeting summaries and action items | Translating a meeting into Spanish live |

**Two further Workspace tools:**

- **Google Vids** — online video creation and editing; generates a first draft
  of a video for project updates, timelines, and insights.
- **AppSheet** — no-code app development; creates an app structure with
  tables, columns, and links that you then review and edit.

> **Exam note:** for a multilingual meeting where attendees face language
> barriers, the answer is **live translated captions with speaker
> identification** — real-time, in-meeting. Post-hoc translated summaries in
> the chat are the near-miss distractor.

## The Gemini surfaces: Advanced, Saved Info, Gems, Notebook

This is the module's highest-yield section. Four products, all of which
"customize" Gemini in some sense, and the exam gives you a scenario and asks
which. The organizing question: **what is being personalized — the model tier,
a persistent fact about you, a reusable assistant, or a closed set of
sources?**

- **Gemini Advanced** — the upgrade tier of the base Gemini app. Strongest at
  coding, logical reasoning, following nuanced instructions, and creative
  collaboration, with adjustable retention settings and priority access to the
  newest experimental features and models. You pick it when the *task* is hard,
  not when you need customization.
- **Saved Info** — a setting that lets Gemini remember specific context
  **without** carrying the entire conversation history. *A sales rep tells
  Gemini once that they're a sales rep, so that context persists — but they
  don't want feedback on a new pitch colored by earlier practice sessions.*
- **Gems** — personalized AI assistants inside Gemini, pre-made or custom, for
  **repeatable** tasks and consistent interaction styles. Three properties:
  **personalized responses** (tailored instructions increase relevance),
  **streamlined workflows** (saved templates and prompts eliminate repetition),
  and **reset context** — each chat with a Gem is isolated, like separate
  conversations with the same expert. You build one by identifying a base Gem
  (considering functionality, license, and simplicity), copying it, and then
  supplying role-prompting, documents, clear instructions, and examples.
- **Gemini Notebook (NotebookLM)** — a research partner grounded **only** in
  sources you upload, which is what makes every answer traceable. It does not
  draw on general web knowledge.

### Don't confuse these: Saved Info vs. Gems

Both persist something across sessions, and they're the most confusable pair
in the module. **Saved Info retains light context about you and carries it
forward. A Gem resets context on every chat.** So a scenario asking for
feedback *uninfluenced by previous sessions* wants a **Gem**, not Saved Info —
the isolation is the feature being tested.

### Gemini Notebook in detail

- **Source types:** Google Docs, Google Slides, YouTube videos, websites,
  audio files, PDFs, text files. Notebook extracts text and saves a local
  copy; it **cannot delete or edit your original files.**
- **Access:** Viewer or Editor roles. Sharing a notebook does **not** share
  the underlying source file, and chat-only mode hides the sources entirely.
- **Sources and sync:** size and usage limits apply, out-of-date sources must
  be re-synced **manually**, and notebook data is **not used to train models.**
- **Configure Chat:** conversation style (Default, Analyst, Guide, Custom) and
  response length (Default, Longer, Shorter).
- **Studio → Audio Overview:** a two-host "Deep Dive conversation" about your
  sources (English only), with an Interactive mode letting you join and ask
  questions.
- **Three advantages over Gemini and Gems:** **hyper-focused knowledge** (only
  your sources), **interactive learning** (questions, summaries, quizzes), and
  **source-based answers** (every insight traceable to an upload).
- **Tiers:** **Pro** adds enhanced research, increased capacity, response
  length/style customization, and usage analytics. **Enterprise** builds on
  Pro with compliance and administrative features, extra privacy and security,
  sharing restricted to chosen collaborators, and IAM-managed access.

Organizational notebook patterns from the deck: sales (product info,
competitor analysis, market research), marketing (blog posts, reports,
webinars), training and onboarding (manuals, presentations, videos),
development (specs, design docs, feedback), teaching (strategy plans,
standards, lecture notes — with Studio outputs like study guides, briefing
docs, FAQs, timelines), and customer support (help center articles, product
docs, FAQs as a shared knowledge base).

### Quick-match cheat sheet

Straight from the deck's matching activity:

| Need | Tool |
|---|---|
| Create your own custom version of Gemini | **Gems** |
| Personalize an assistant for a repeatable task or interaction style | **Gems** |
| Assistant grounded only in documents you provide, no web knowledge | **Gemini Notebook** |
| Write, summarize, and brainstorm inside Docs, Gmail, and Sheets | **Google Workspace with Gemini** |
| Priority access to the newest features; best at coding and reasoning | **Gemini Advanced** |
| Feedback isolated from prior sessions | **Gems** (reset context), not Saved Info |

> **Exam note:** two more scenarios worth pre-loading. A freelance writer
> switching between content types who wants consistency → **Gems**. A product
> manager prepping for a launch meeting from Drive documents → Gemini Notebook
> **summarizes key findings, identifies challenges, and provides talking
> points** — it does not auto-build a slide deck or send calendar invites,
> both of which appear as distractors. And on grounding: it **connects
> responses to specific sources** and is **not exclusive to Notebook**;
> Notebook **can generate quizzes** from your documents but **cannot** access
> the whole internet.

## Gemini for Google Cloud

The developer- and admin-facing line. Each product is Gemini embedded in one
Google Cloud surface, and the exam asks which surface fits a stated job.

- **Gemini Cloud Assist** — design, manage, and optimize applications on
  Google Cloud; personalized guidance and lifecycle management; analyzes your
  cloud environment, deployed resources, metrics, and logs.
- **Gemini in BigQuery** — makes data analysis more accessible: writes code,
  helps you understand your data, generates insights automatically.
- **Gemini Code Assist** — an AI pair programmer offering code suggestions,
  generated blocks, and explanations across 20+ languages, editors, and
  developer platforms.
- **Gemini in Colab Enterprise** — AI assistance in notebooks, suggesting and
  generating Python from your descriptions.
- **Gemini in Databases** — helps developers and DBAs manage databases,
  simplifying many aspects of database work.
- **Gemini in Looker** — analyze data, create visualizations, generate
  reports.
- **Gemini in Security** (Security Command Center) — helps security teams
  detect, contain, and stop threats; near-instant analysis of security
  findings and potential attack paths; summarizes threat-actor tactics,
  techniques, and procedures.

**Enterprise security:** prompts and responses to Gemini for Google Cloud are
**not used for training**, and standard Google Cloud protections apply.

> **Exam note:** a development team wanting better coding efficiency and
> collaboration → **Gemini Code Assist**. Cloud Assist is the distractor; it
> manages infrastructure and applications, not the act of writing code.

[^module4-slides]: [Module 4 slide deck (Generative AI Leader course)](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/genai-leader-module-4-slides.md)

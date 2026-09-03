---
type: Study Guide
title: "Google Cloud GAIL Certification"
description: Consolidated exam study notes for the Google Cloud Generative AI Leader (GAIL) certification — overview, exam format, and all five course modules.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL, agents]
sources:
  - id: module1-slides
    resource: references/genai-leader-module-1-slides.md
    title: "Module 1 slide deck (Generative AI Leader course)"
  - id: module2-slides
    resource: references/genai-leader-module-2-slides.md
    title: "Module 2 slide deck (Generative AI Leader course)"
  - id: module3-slides
    resource: references/genai-leader-module-3-slides.md
    title: "Module 3 slide deck (Generative AI Leader course)"
  - id: module4-slides
    resource: references/genai-leader-module-4-slides.md
    title: "Module 4 slide deck (Generative AI Leader course)"
  - id: module5-slides
    resource: references/genai-leader-module-5-slides.md
    title: "Module 5 slide deck (Generative AI Leader course)"
generated: { by: claude-code/sonnet-5, at: 2026-09-02T20:23:11Z }
status: draft
---

# Google Cloud GAIL Certification

Consolidated study notes for the Google Cloud Generative AI Leader (GAIL)
certification and the "Generative AI Leader (ILT)" course it's based on —
overview and exam info, followed by all five modules in one page.

## What the certification is

> A Google Cloud Certified Generative AI Leader is a visionary professional
> with comprehensive business knowledge of how generative AI can transform
> businesses using Google Cloud's gen AI products and services. They
> understand Google's AI-first approach and can drive innovative and
> responsible AI adoption by identifying use cases, fostering collaboration
> across technical and non-technical teams, and leveraging Google Cloud's
> enterprise offerings.[^module5-slides]

## Exam format

- **Length**: 90 minutes.
- **Format**: 50–60 multiple choice questions.
- **Focus**: business-focused certification, not hands-on/technical.
- **More info / registration**: [cloud.google.com/learn/certification/generative-ai-leader](https://cloud.google.com/learn/certification/generative-ai-leader)

## Course objectives (spans all 5 modules)

1. Discover the business value and impact of gen AI on your organization.
2. Define core gen AI concepts.
3. Identify the core layers of the gen AI landscape.
4. Explain how to combine components of gen AI agents to build powerful
   solutions.
5. Identify Google Cloud's gen AI implementation and scaling solutions.

## Modules in this page

- [Module 1 — Beyond the Chatbot](#module-1-beyond-the-chatbot)
- [Module 2 — Unlock Foundational Concepts](#module-2-unlock-foundational-concepts)
- [Module 3 — Navigate the Landscape](#module-3-navigate-the-landscape)
- [Module 4 — Gen AI Apps: Transform Your Work](#module-4-gen-ai-apps-transform-your-work)
- [Module 5 — Gen AI Agents: Transform Your Organization](#module-5-gen-ai-agents-transform-your-organization)

## Study resources (official)

- [Certification page](https://cloud.google.com/learn/certification/generative-ai-leader) —
  exam guide, registration, official sample questions.
- [Course learning path](https://skills.google/paths/1951) — the on-demand
  version of this ILT course, for revisiting material.
- [Generative AI Labs with Gemini on Google Cloud](https://skills.google/paths/1872) —
  follow-on intermediate path.
- [Google Workspace with Gemini](https://skills.google/paths/249) — follow-on
  path for the productivity-tool side of Module 4.

---

## Module 1: Beyond the Chatbot

### What is generative AI?
- AI = computer systems performing tasks that typically require human intelligence, achieved via ML (learning from data), powered by an AI model (input → output based on training).
- Generative AI = subset of AI that **creates** new content rather than just analyzing/responding to existing data.
- Gen AI is a *technology*, not an application — it gets integrated into apps.
  - Gemini app = the chatbot application. Gemini = the underlying model that powers many products (Workspace, Looker, BigQuery, Google Cloud).

### Four primary ways to use gen AI
- **Create** — text, images, video, audio, code.
- **Summarize** — long documents, complex data, meeting takeaways.
- **Discover** — patterns/insights, search, real-time monitoring.
- **Automate** — format conversion, documentation, notifications.

### Multimodal gen AI
- Simultaneous processing/creation across multiple data types ("modalities") — e.g. text+image, text+PDF, text+video+data, sensor+video.
- Exam-style example: analyzing sentiment from video testimonials + survey data = multimodal (combines video, text, data).

### Foundation models
- **Traditional AI model**: trained for a single purpose on specific data (e.g., spam filter).
- **Foundation model**: trained on massive, diverse data (text, images, code) → adapts to many tasks. Examples: LLMs, Nano Banana (image gen/edit), Chirp (speech recognition).
- Key features: trained on diverse data, **flexible** (one model, many use cases), **adaptable** (can be specialized via further training).
- **LLM vs. foundation model**: all LLMs are foundation models, but not all foundation models are LLMs (foundation models also cover image, audio, video, multimodal).
- Gemini specifically: trained on massive multimodal dataset (text, image, code, audio, video).

### Prompting
- Prompt = input that triggers an output from a model.
- Foundation models (esp. multimodal ones) accept far more flexible prompt types than traditional models.
- Prompting is a developable skill, key to getting value from gen AI.
- Foundation models = knowledge base; prompt engineering = how you guide the model to use that knowledge.

### Google's gen AI ecosystem (5 pillars)
- **Individual productivity**: Search, Workspace with Gemini, Gemini App, Gemini for Google Cloud.
- **Continuous improvement**: automatic model upgrades, early feature access, security patches.
- **Responsible AI**: SAIF (Secure AI Framework), Mandiant (threat intel), AI Principles, Responsible AI toolkit.
- **Enterprise ready**: Agent Platform (unified build/deploy platform with enterprise security/scale/compliance), Google Cloud security infra, compliance certifications.
- **Open approach**: contributions to TensorFlow/PyTorch/JAX, open-source models/datasets, support for open standards.
- Value prop: businesses leverage Google's AI advances **without starting from scratch** or managing infrastructure themselves.

### Building an AI strategy: top-down + bottom-up
- **Top-down** (execs): create a clear AI vision aligned to business priorities; identify key use cases; ensure resources, org-wide support, and empowerment.
- **Bottom-up** (mid-level/ICs): closest to daily ops/end-users → best positioned to spot high-impact, feasible use cases; champion adoption via small-scale experiments that get shared.
- Recommended approach on the exam = **combine both**, not one or the other.
- Six factors, viewed from exec vs. IC level: **strategic focus, exploration, responsible AI, resourcing, impact, continuous improvement.**
  - Exec version skews toward vision/goals/governance/resourcing at the org level.
  - IC version skews toward hands-on experimentation, feedback, and demonstrating local impact.

### Google agent product categories (from the creative-matrix exercise)
- **Google Workspace with Gemini** — AI-powered workspace tools (e.g., Gemini in Gmail).
- **Agent Conversation** — conversational AI / chatbots.
- **Agent Search** — AI-powered search.
- **Agent Studio** — AI model development and customization (fine-tuning, custom models).

### Augmentation vs. automation
- Gen AI **augments** (assists but doesn't replace) human: critical thinking/problem solving, creativity/innovation, relationship building/collaboration, strategic planning/vision. Humans still interpret data, build trust, and set direction.
- Gen AI **automates**: repetitive/rule-based tasks (data entry, info retrieval, formatting, basic code gen) and time-consuming/resource-intensive tasks (research, data analysis, summarization, first drafts).
- Human-in-the-loop pipeline: **data selection/prep → prompt design/refinement → output evaluation/refinement → continuous monitoring/feedback.**
- Pattern for exam scenarios: a chatbot handling routine FAQs or bulk content generation = **automation**; a person using gen AI output to inform their own analysis/decisions = **augmentation**.

### Quiz-derived facts to remember
- Correct definition of gen AI: creates new/original content (text, image, audio, code) that didn't previously exist — not just predictive analytics, not rule-based automation only.
- Foundation vs. traditional: foundation = massive diverse data, many tasks; traditional = specific data, single task.
- Gen AI augments critical thinking by *providing data/insights that humans interpret* — not by deciding autonomously.
- NOT a benefit of Google Cloud's gen AI ecosystem: it does **not** guarantee complete accuracy, and it does **not** eliminate the need to build internal gen AI knowledge.

---

## Module 2: Unlock Foundational Concepts

### Core definitions
- **AI** — machines doing tasks that normally require human intelligence.
- **ML** — subset of AI; machines learn from data to perform specific
  tasks. Different data → different models.
- **Gen AI** — subset of ML focused on creating new content.
- **Deep learning (DL)** — a ML technique using artificial neural networks;
  networks leverage labeled + unlabeled data (semi-supervised). Powers gen
  AI's ability to create text/image/audio/video content.
- Hierarchy: **AI ⊃ ML ⊃ DL**; gen AI is an application built on DL.

### Data quality — 5 factors
- **Accuracy** — wrong data → wrong patterns → faulty predictions.
- **Completeness** — dataset size/representation must be sufficient.
- **Representative** — must be inclusive, or outcomes get skewed/biased.
- **Consistency** — inconsistent formats/labeling confuses the model.
- **Relevance** — data must fit the task.

### Data accessibility — 3 factors
- **Availability** — no data, no training.
- **Cost** — high-quality data acquisition can be a major barrier.
- **Format** — must be in a format the model can process.

### Data types
- **Structured** — organized, easily searchable (IDs, dates, costs).
- **Unstructured** — no predefined structure, messy (free-text feedback,
  images, email content).

### Types of machine learning
- **Supervised** — trained on **labeled** data; learns input→output
  mapping. Example: spam classifier.
- **Unsupervised** — trained on **unlabeled** data; finds natural groupings/
  structure. Example: topic modeling.
- **Reinforcement** — learns via interaction + reward/penalty feedback;
  maximizes cumulative reward. Example: game-playing agent.
- Google Cloud examples: predictive maintenance = supervised (Agent
  Platform); anomaly detection = unsupervised (BigQuery ML); product
  recommendations = reinforcement (Agent Platform).

### ML lifecycle stages (Google Cloud tools)
1. **Gather** — Pub/Sub (streaming), Cloud Storage (unstructured), Cloud
   SQL/Spanner (structured).
2. **Prepare** — BigQuery (analysis), BigQuery universal catalog
   (governance).
3. **Train** — Agent Platform (managed training).
4. **Deploy & predict** — Agent Platform.
5. **Manage** — versioning, drift monitoring, Feature Store, Model Garden,
   Agent Platform Pipelines.

- **IAM** in this context: manage user accounts/roles, grant/revoke
  resource permissions, audit activity, monitor security posture.

### Foundation models
- Deep-learning models trained on massive datasets; broad understanding
  across domains, not just one task.
- **LLMs** — understand/generate language (translate, write, answer
  questions).
- **Diffusion models** — generate images/audio/video via iterative
  refinement.
- Google Cloud's models: **Gemini** (multimodal, conversational, content
  creation), **Gemma** (lightweight, customizable, local/specialized
  deployment), **Nano Banana** (text→image), **Veo** (text/image→video).

### Choosing a model — 8 factors
Modality · Context window · Security · Availability & reliability · Cost ·
Performance · Fine-tuning/customization · Ease of integration.

### Foundation model limitations
- **Data dependency** — output quality tied to training data quality.
- **Knowledge cut-off** — last date the model saw new training data.
- **Bias** — inherited from training data, can be magnified in outputs.
- **Fairness** — subjective; assessments only cover specific bias
  categories, may miss others.
- **Hallucinations** — outputs not grounded in real information. Fix:
  grounding.
- **Edge cases** — rare scenarios expose model weaknesses.

### Techniques to overcome limitations
- **Prompt engineering** — crafting precise prompts to guide output.
- **Grounding** — anchoring responses in specific data (e.g. company docs).
- **RAG** — grounding via search: retrieve (by meaning) → augment prompt →
  generate.
- **Fine-tuning** — further train a foundation model on a task-specific
  dataset; use when prompt engineering alone isn't enough.
- **Humans in the loop (HITL)** — content moderation, sensitive
  applications, high-risk decisions; applied pre- and post-generation.

### Secure AI — lifecycle controls
1. Gather — protect data at all times; control access/addition/input.
2. Prepare — anonymization, validation, secure processing, logging/
   monitoring for sensitive data.
3. Train — safeguard training data **and** model parameters from
   unauthorized access/modification.
4. Deploy — control model access; verify sources/check vulnerabilities in
   pre-built models.
5. Manage — stay current on best practices, regular updates, monitor for
   anomalies/tampering, review access permissions.
- Also: guard against adversarial attacks; monitor outputs for leaks/
  harmful content.
- **SAIF (Secure AI Framework)** — Google's security standards for
  responsibly building/deploying AI.
- Google Cloud security stack: secure-by-design infra, encryption, IAM,
  Security Command Center + monitoring; Google Threat Intelligence Group +
  Mandiant for proactive, AI-driven threat readiness.

### Responsible AI — 4 foundations
- **Transparency** — users understand how data is used and how the system
  works.
- **Privacy** — anonymize/pseudonymize data; prevent models leaking
  training data.
- **Data quality, bias, fairness** — ethical AI needs quality data;
  models inherit societal bias, so fairness must be designed in.
- **Accountability & explainability** — explainable AI makes decisions
  understandable; know how your app uses/interprets model output.

### Legal implications
- Key areas: **data privacy, non-discrimination, intellectual property,
  product liability**.
- AI laws require responsible data handling, bias mitigation, transparency,
  model compliance, and attention to model licensing terms.

### Exam-style Q&A drawn from module quizzes
- Factual errors in training data compromise **accuracy** (not
  completeness/consistency/relevance).
- Large datasets: volume helps but **isn't the only factor** influencing
  performance.
- A "model" in ML = **a complex mathematical structure that processes
  inputs to generate outputs**.
- Best model type for photorealistic images from text = **diffusion
  model**.
- Techniques to overcome foundation-model limitations = **grounding,
  prompt engineering, fine-tuning, HITL** (not raw compute/hardware).
- Fine-tuning is the right call when **prompt engineering alone doesn't
  achieve the desired outcome and the model needs task-specific
  specialization**.
- Ethical AI checklist includes **regular bias audits** and **diverse
  training data**, not black-box models or unsupervised deployment.
- SAIF's goal = **establish security standards for responsible AI
  build/deploy**, not restrict innovation or focus only on external
  attacks.

---

## Module 3: Navigate the Landscape

### The five-layer model
Top to bottom: **Applications → Agents → Platform → Models → Infrastructure**.

- **Applications** — user-facing frontend. *Gemini app, Google Workspace
  with Gemini, Gemini Notebook.*
- **Agents** — software that pursues a goal autonomously using tools.
  *Customer, code, data, security agents.*
- **Platform** — tools/services connecting agents and models: APIs, data
  management, deployment. *Agent Platform.*
- **Models** — the "brain": trained algorithms that generate content,
  translate, answer questions. *LLMs, image models, recommenders.*
- **Infrastructure** — hardware/software to store and run models and
  training data. *GPUs/TPUs, hypercomputers, storage, networking.*

Layer-identification drill (common exam pattern — given a scenario, name the
layer):
- Labeling/training-tool workflow → Platform
- Text→image generation on a website → Application
- More compute/specialized processors needed → Infrastructure
- Predicting the next line of code from training → Model
- Autonomous monitoring + drafting a response → Agent

### Agents
- Definition: an application that achieves a goal by observing the world
  and acting on it with available tools.
- Capabilities: understand/respond to natural language, automate
  multi-step tasks, personalize the experience.
- **Reasoning loop + tool use** is what distinguishes an agent from a
  standalone LLM.
- Reasoning frameworks: rule-based calculations, thought chains, ML
  algorithms, probabilistic reasoning. Named prompting patterns: **ReAct**
  (reason + act), **Chain-of-Thought (CoT)**.
- Two agent categories:
  - **Conversational agent** — input → understand → call tool → generate
    response → deliver. *Q&A, casual chat, info lookup.*
  - **Workflow agent** — input/trigger → understand → call tool → generate
    result → deliver. *Order fulfillment, onboarding, research,
    security-log parsing.*
- Use-case taxonomy (exam likes matching agent type → scenario):
  customer service, employee productivity, creative, code, data, security
  agents.
- Multi-agent systems: an application composes several specialized agents
  (e.g., a travel app = conversational agent + planning agent + booking
  agent), with the application supplying the shared UI.
- Agents (define capabilities) vs. Applications (provide the UI/overall
  goal) — a recurring exam distinction.

### Platform, Models, Infrastructure

#### Platform — Agent Platform
Streamlines the ML workflow: infrastructure + pre-trained models + build/
deploy/manage tooling. MLOps tools (know which tool solves which job):

| Tool | Job |
|---|---|
| **Feature Store** | Share/serve/reuse ML features |
| **Model Registry** | Version, track changes, organize models |
| **Model Evaluation** | Evaluate/compare model performance |
| **Workflow orchestration** (Pipelines) | Automate the end-to-end ML pipeline |
| **Model Monitoring** | Detect performance drift, trigger retraining |

#### Models — Model Garden vs. build-your-own
- **Model Garden**: discover/customize/deploy 160+ existing models,
  some usable out-of-the-box. Right choice when you need something
  readily available and don't require full control.
  - First-party foundation models: **Gemini, Nano Banana, Veo, Chirp**.
  - First-party pre-trained APIs: Speech-to-Text, NLP, Translation, Vision.
  - Open models: **Gemma 2, CodeGemma, PaliGemma, Llama 3.1/3.2, Mistral
    AI/AI21, TII**.
  - Third-party: **Anthropic's Claude** family.
- **Build with Agent Platform**: fully custom training, or **AutoML**
  (no/low-code) — right choice when you need full control over
  architecture/training (e.g., novel research).
  - AutoML objectives: image → classification/object detection; video →
    action recognition/classification/tracking; tabular →
    classification/regression/forecasting.
- Standard model workflow: gather data → prepare data → train → deploy &
  predict → manage.
- Agent (task/guideline logic) vs. Model (raw generation, e.g.
  grammatically correct text) — another recurring exam distinction.

#### Infrastructure
- **Compute**: GPUs (general-purpose parallel processing) vs. **TPUs**
  (custom-designed, AI-optimized) vs. **Hypercomputers** (many nodes
  connected for massive training/inference scale).
- **Storage**: large-scale + fast read/write, optimized for AI throughput,
  scalability, dense compute clusters.
- **Networking**: Google's global fiber network — high bandwidth, low
  latency, needed to coordinate processors.
- Infrastructure matters at *every* dev stage if you're not on a managed
  platform: data collection, training, deployment, monitoring, refinement.

#### Edge computing
- Runs AI on-device/near the data source instead of the cloud.
- Benefits: real-time responsiveness, better privacy, less reliance on
  connectivity.
- **LiteRT** (Lite Runtime) — runs models efficiently on edge/mobile.
- **Gemini Nano** — Google's edge-optimized model. Benefits: privacy
  (data stays on-device), speed (no round trip), offline access. Powers
  Pixel's Call Notes and Pixel Recorder; exposed to Android devs via the
  AI Edge SDK.
- Edge deployment tooling (Agent Platform): convert to LiteRT → package
  into containers for edge hardware → manage/monitor deployments.
- Edge vs. cloud decision rule: pick **edge** when latency is critical
  (e.g., real-time surgical feedback); pick **cloud** when you need scale
  (millions of requests) or centralized/aggregate analysis (e.g.,
  city-wide traffic optimization).

### Roles → layers mapping

| Role | Responsibility | Layer |
|---|---|---|
| **Business leaders** | Use pre-built gen AI solutions to improve operations | Applications |
| **Developers** | Build/deploy custom agents, integrate AI into apps | Agents |
| **AI practitioners** | Customize, deploy, optimize models; responsible AI | Platform / Models / Infrastructure |

### Cost
- Three billable activities: **training**, **deploying** (to an endpoint),
  **inference** (predictions) — compute time, training-data storage, and
  outputs all factor in.
- Pricing models: **usage-based** (per token/character), **subscription**
  (recurring fee, usage limits), **licensing** (one-time/recurring,
  commercial use), **free tier** (limited, experimentation).
- Pricing metrics: tokens, characters, requests, compute time.
- Cost drivers: model size/complexity, context window size, specialized
  features, deployment (compute-based costs).
- Google Cloud pricing calculator: cloud.google.com/products/calculator.

### Choosing a solution — decision framework
- **Scale**: small → use pre-built tools/existing apps. Large → optimize
  for scalability, security, infra cost, data storage, latency.
- **Customization**: start from existing models; ask what's actually
  unique about the need (domain data? task complexity? UX?); fine-tune on
  domain-specific data only when justified.
- **User interaction**: UI (embed vs. dedicated interface) and UX
  (conversational/informative/task-oriented; how much guidance users need).
- **Privacy**: data security (encryption, access control, secure data
  centers) and compliance (specific regulations).
- **Other factors**: latency tolerance, connectivity/offline needs,
  accuracy tolerance, explainability requirements.
- Solution-fit pattern: fast + non-coder → pre-built app/pre-trained API
  (e.g. Nano Banana, AI Applications). Coder + moderate customization →
  fine-tune from Model Garden. Full control/novel domain → build custom.

### Maintenance
- Model monitoring + periodic retraining.
- Regular data updates to keep the model fresh.
- Software updates/bug fixes, applied properly.
- Hardware/infra upkeep: server maintenance, security updates, capacity
  planning.
- Ongoing security review and regulatory compliance.

### High-yield exam facts
- Agents = reasoning loop + tool use (the two-element differentiator vs.
  plain LLMs).
- Model Registry = versions/changes; Model Monitoring = drift/retraining
  trigger; Workflow orchestration = full pipeline automation — don't mix
  these up.
- Edge computing's #1 advantage = real-time responsiveness / reduced
  latency.
- The largest single cost driver called out repeatedly = **model
  training**.
- Context window size is explicitly called out as a cost driver (bigger
  window → higher cost).

---

## Module 4: Gen AI Apps — Transform Your Work

### Prompting techniques
- **Zero-shot**: model completes a task with no examples given.
- **One-shot**: model is shown exactly one example before the real task.
- **Few-shot**: model is shown multiple examples before the real task —
  most reliable of the three for matching a desired output pattern/format.
- **Role prompting**: assign the model a persona ("You are a customer
  service agent with ten years of experience...") to control style, tone,
  and focus of the response.
- **Prompt chaining**: a multi-turn sequence where each prompt builds on
  the model's prior response within the same thread, refining toward a
  more sophisticated result. Process: set a goal → start the chain (initial
  prompt) → build the chain (follow-up refinements) → observe and analyze.
- **Reusable prompt templates**: parameterized prompts (`[bracketed]`
  fields) built once per role/task and reused — e.g., a fixed template for
  social posts, blog content, customer-email replies, or code generation.
- **Grounding**: connecting a model's output to verifiable, specific
  sources of information.
- **RAG (retrieval-augmented generation)**: retrieve relevant info from a
  knowledge base (via a vector DB), then generate output conditioned on
  that retrieved context, instead of relying solely on the model's
  parametric/memorized knowledge.
  - Benefits: improved accuracy/relevance, improved explainability (can
    show sources used), extends the model beyond what it memorized.

### Google Workspace with Gemini
- **Gemini side panel**: appears in Workspace apps (Docs, Gmail, Sheets,
  Slides, Meet); summarizes/analyzes/generates content using your own
  emails/documents/context without switching apps.
- Per-app functions: Gmail (write/refine emails) · Docs (draft, refine,
  proofread) · Slides (generate photorealistic images for decks) · Sheets
  (generate formulas from natural-language description) · Meet (real-time
  transcription/translation, meeting summaries, action items).
- **Google Vids**: online video creation/editing — first-draft video
  generation.
- **AppSheet**: no-code app builder — generates app structure (tables,
  columns, links) from a description.

### Gemini Advanced / Saved Info / Gems / Gemini Notebook — know the distinctions
This is the recurring exam pattern for this module: given a scenario, pick
the right Gemini surface.

- **Gemini Advanced**: paid upgrade tier of the base Gemini app; strongest
  at coding, logical reasoning, nuanced instruction-following, creative
  collaboration; priority access to newest experimental features/models.
- **Saved Info**: a setting that lets Gemini remember specific context
  (e.g., "I'm a sales rep") *without* carrying the entire conversation
  history — use when you want persistent light context but not full-thread
  memory.
- **Gems**: custom/pre-made personalized AI assistants inside Gemini for
  *repeatable* tasks or a fixed interaction style. Three properties:
  personalized responses (tailored instructions), streamlined workflows
  (templates/prompts saved for reuse), reset context (each chat with a Gem
  is isolated — no bleed-through between sessions, unlike Saved Info).
  Built by identifying a base Gem (consider functionality, license,
  simplicity) and copying it, then supplying role-prompting, documents,
  instructions, and examples.
- **Gemini Notebook (NotebookLM)**: a research assistant *grounded only* in
  sources you upload (Docs, Slides, YouTube, websites, audio, PDF, text) —
  does not draw on general web knowledge. Extracts text and keeps a local
  copy; can't edit/delete your originals. Distinguishing features vs.
  Gemini/Gems: hyper-focused on only the provided sources, interactive
  learning (quizzes/summaries/Q&A), source-based (traceable) answers.
  Notable feature: Studio → Audio Overview, a two-host "Deep Dive"
  discussion of the sources with an interactive join mode.
  - Notebook access levels: Viewer/Editor; sharing a notebook does **not**
    share the underlying source file; chat-only mode hides sources
    entirely.
  - Data from notebooks is not used to train models.
  - Tiers: **Pro** (more capacity, response customization, usage
    analytics) vs. **Enterprise** (adds compliance/admin controls, extra
    privacy/security, IAM-managed access, sharing restricted to chosen
    collaborators).

**Quick-match cheat sheet** (as tested directly in the deck's matching
activity):

| Need | Tool |
|---|---|
| Create your own custom version of Gemini | Gems |
| Personalize an assistant for a repeatable task/style | Gems |
| Assistant grounded *only* in documents you provide, no web knowledge | Gemini Notebook |
| Write/summarize/brainstorm inside Docs, Gmail, Sheets | Google Workspace with Gemini |
| Priority access to newest features; best at coding/reasoning | Gemini Advanced |
| Feedback isolated from prior sessions (no cross-session interference) | Gems (reset context) — not Saved Info, which *retains* light context |

### Gemini for Google Cloud (developer/admin-facing tools)
- **Gemini Cloud Assist**: design/manage/optimize Google Cloud
  applications; guidance + lifecycle management; analyzes your cloud
  environment, resources, metrics, and logs.
- **Gemini in BigQuery**: data analysis — write code, understand data,
  auto-generate insights.
- **Gemini Code Assist**: AI pair programmer — code suggestions, generated
  blocks, explanations; supports 20+ languages/editors/platforms.
- **Gemini in Colab Enterprise**: AI assistance inside notebooks — suggests
  Python code segments from descriptions.
- **Gemini in Databases**: helps devs/DBAs manage databases more
  effectively.
- **Gemini in Looker**: data analysis, visualizations, reports.
- **Gemini in Security (Security Command Center)**: detects/contains
  threats, near-instant analysis of security findings and attack paths,
  summarizes threat-actor tactics/techniques/procedures.
- Enterprise security note: prompts/responses to Gemini for Google Cloud
  are **not used for training**; standard Google Cloud protections apply.

### Quiz Q&A
Answers inferred from the deck's own definitions — the PDF's visual
answer-highlight didn't survive text extraction, so treat these as
high-confidence, not verbatim-confirmed.

- Technique relying entirely on pre-existing knowledge, no examples →
  **Zero-shot prompting**.
- Best role-prompt for a language-tutor AI → the one giving it a persona
  *and* a tone ("You are a helpful and encouraging tutor who provides
  constructive feedback...").
- Primary function of RAG → enabling the model to access/use **external
  knowledge sources** for generating outputs.
- True statements about grounding/Notebook (pick two) → grounding connects
  responses to specific sources; **Gemini Notebook can generate quizzes**
  from your uploaded documents. (False: Notebook does not browse the whole
  internet; grounding is not exclusive to Notebook.)
- Making a multilingual Google Meet accessible → **live translated
  captions with speaker identification**.
- Freelance writer needing consistent tone/style across content types →
  **Gems**.
- Product manager prepping from Drive documents → Gemini Notebook
  **summarizes key findings, flags challenges, and drafts talking points**
  (it does not auto-build slide decks or send calendar invites).
- Main advantage of role prompting → it **shapes style, tone, and focus**
  by assigning a persona.
- Sales rep wanting pitch feedback isolated from earlier sessions → **use a
  Gem** (isolated/reset context per chat), not Saved Info (which retains
  context across sessions).
- Team wanting better coding efficiency/collaboration → **Gemini Code
  Assist**.

---

## Module 5: Gen AI Agents — Transform Your Organization

### Agent evolution: deterministic vs. generative
- **Deterministic (traditional) agents** — predefined paths/actions, workflow-based and event-driven, high control and predictability, same input → same output. Reasoning loop + tools, **no foundation model**.
- **Generative agents** — natural, flexible conversation; may give different answers to the same input. Reasoning loop + tools + **foundation model**. RAG enables integration from external sources.
- **Hybrid agents** — combine deterministic control with generative flexibility.

### Three components of a generative AI agent
- **Foundation model** — the underlying LLM powering the agent; choose one trained on data relevant to the use case.
- **Tools** — let the agent observe and act on the world (extensions/APIs, functions, data stores).
- **Reasoning loop** — the decision-making core; iteratively considers the goal, available tools, and gathered info. Guided by reasoning frameworks.

### Sampling parameters (model settings)
- **Token count** — 1 token ≈ 4 characters; models have a max token limit per call.
- **Temperature** — controls randomness/"creativity" of word choice.
- **Top K** — model randomly picks from the K most probable next words.
- **Top P (nucleus sampling)** — cumulative probability threshold for candidate tokens.
- **Safety settings** — filter harmful/inappropriate output.
- **Output length** — max length of generated text.

### Google AI Studio vs. Agent Studio

| | Google AI Studio | Agent Studio |
|---|---|---|
| Audience | Beginners, students, researchers | Professionals, enterprise projects |
| Access | Standard Google account, usage limits | Google Cloud console, part of **Agent Platform** |
| Purpose | Try Gemini models, prototype with Gemini Developer API | Build/train/deploy ML models & agents at scale |
| Governance | — | Enterprise-grade security, Google Cloud policy compliance, flexible quotas, service charges |
| Extras | Simple interface for parameter experimentation | Tool integration, grounding for accuracy |

### Reasoning loop + prompt engineering
- **Reasoning loop cycle:** iterative evaluation → internal reasoning (think through steps) → decision making (choose tool/action) → guided by reasoning frameworks (prompt engineering).
- **Chain-of-thought (CoT)** — guides the LLM through intermediate reasoning steps instead of jumping straight to an answer.
  - *Self-consistency* — generate multiple solutions, pick the most consistent.
  - *Active-prompting* — LLM asks clarifying questions / requests more info.
  - *Multimodal CoT* — combines text with images/video to enhance reasoning.
  - Benefits: improved reasoning, better accuracy, enhanced explainability.
- **ReAct (Reason + Act)** — "thought → action → observation → response" loop; lets the LLM interact with the real world and gather info before answering.
  - Benefits: dynamic problem solving, reduced hallucination (via grounding), increased trustworthiness (visible reasoning).
- **CoT vs. ReAct** — CoT = internal reasoning only; ReAct = external interaction. Combine both for deeper reasoning + dynamic action.
  - Rule of thumb: needs external info/action → ReAct (e.g., "find a restaurant nearby," "search research papers"); pure internal reasoning/synthesis → CoT (e.g., "summarize an article," "brainstorm ideas").

### Agent tools (4 types)
- **Extensions (APIs)** — standardize how the agent interacts with external APIs.
- **Functions** — specialized, reusable actions; reasoning system picks the right one.
- **Data stores** — give access to real-time/historical/knowledge-based info.
- **Plugins** — add new skills/integrations, connect to other services/platforms.

**Reasoning loop with tools (4-step cycle):** Reasoning (select tool) → Acting (execute tool) → Observation (receive tool output) → Iteration (reason about next steps).

### Google Cloud tools for agents
- **Cloud Storage** — scalable/durable object storage.
- **Databases** (Cloud SQL, Spanner, Firestore) — store/retrieve agent data, manage user data, track progress.
- **Cloud Run functions** — serverless, event-triggered, auto-scaling; act as specialized agent tools.
- **Cloud Run** — serverless containers; for custom tools needing specific dependencies/more control.
- **Agent Platform** — build agents that are themselves callable as tools by other agents.

### Pre-built Google AI APIs
- **Speech-to-Text API** — speech → text (transcription).
- **Text-to-Speech API** — text → natural speech (voice UIs).
- **Translation API** — translate text/documents/websites/audio/video.
- **Document Translation API** — translates formatted docs, preserves layout.
- **Document AI API** — extracts data from documents, automates capture/processing, summarizes.
- **Cloud Vision API** — image understanding: tagging, moderation, visual search.
- **Cloud Video Intelligence API** — video analysis: content recommendation, video search, media analysis.
- **Natural Language API** — text insights: sentiment, classification, entity extraction.
- Broader **API Library** also covers Google Maps, Workspace, YouTube, Photos, etc.

### Deploying agents into applications
- **Two-step API integration:** (1) generate an API key / set up auth, (2) make API calls from app code (send prompt+params → receive generated text).
- **Cloud Run functions** — event-triggered code, no server management, good for lightweight automation on top of the API.
- **Cloud Run** — containerized apps, more control, for complex application needs.
- Gemini API works over HTTP — integrates into web, mobile, desktop, embedded systems.
- **Low/no-code:** **Apps Script** (low-code, JavaScript, automates Google Workspace with Gemini API add-ons) vs. **AppSheet** (no-code, custom business apps using the Gemini API).
- **Multi-agent applications** — multiple specialized agents, working independently or interacting; improves efficiency/flexibility/scalability; an agent can itself be a tool for another agent.

### Retrieval-augmented generation (RAG)
- **Retrieval** — LLM (with retrieval tools: data stores, vector databases, search engines, knowledge graphs) finds relevant external info.
- **Augmentation** — retrieved info is merged into the prompt alongside the user's original query.
- **Generation** — LLM produces the response from the augmented prompt.
- Some RAG systems iterate the retrieval step to improve relevance.
- **Data stores** = structured/unstructured knowledge bases (websites, structured DBs, unstructured data).

### Google's search & recommendation agent products (Agent Platform)
- **Document search** — over unstructured docs in Cloud Storage.
- **Media search** — images/video/audio libraries.
- **Healthcare search** — healthcare data, supports regulatory compliance.
- **Search for commerce** — retail catalog search.
- **Media recommendations** — consumer media apps (streaming, publishing).
- **Recommendations for commerce** — personalized e-commerce recommendations, drives sales.
- **Agent Search** — grounds LLM responses in first-party data, curated third-party data, and Google's knowledge graph (RAG-based); adds **search summaries** and **answers/follow-ups** (AI-generated, natural-language Q&A over results).

### Customer experience (CX) product line — Gemini Enterprise for CX
- **Customer Experience agents** — chatbots for customers. Three types: **Deterministic** (rules-based, low/medium code), **Generative** (LLM-driven, minimal/no code), **Hybrid** (via **CX Agent Studio** — deterministic control + generative flexibility).
- **Agent Assist** — real-time AI help for *human* contact-center agents: generated responses, knowledge-base suggestions, transcription, translation, summaries.
- **Customer Experience Insights (CX Insights)** — analyzes customer interactions; Generative FAQ surfaces common questions and response effectiveness.
- **Contact Center as a Service (CCaaS)** — 24/7 omnichannel support, CRM integration, infrastructure management, multichannel + tool integration.

### Gemini Enterprise app
- Creates AI-powered custom agents that access/understand company data from any source; acts as a personal work research assistant.
- Launch points: **Gemini Notebook Enterprise** (upload/analyze data, audio summaries), **multimodal search agents** (grounded across company data systems), **generative AI assistants** (grounded in enterprise data, act via connectors/tools), **custom agents** (built via CX Agent Studio).

### Planning gen AI organizational transformation
**6-step integration plan:**
1. Establish a clear vision — align with strategy, get leadership buy-in, appoint an adoption champion.
2. Prioritize high-impact use cases — align with business goals, weigh feasibility/transformation potential.
3. Invest in capabilities — build skills via training/recruitment, foster experimentation culture.
4. Drive organizational change — manage workflow shifts, agile collaboration, knowledge sharing.
5. Measure and demonstrate value — track impact with data.
6. Champion responsible AI — fairness, transparency, privacy, security framework.

**Plan for impact:** define key metrics → collect and analyze data → iterate and improve.

**Plan for change:** regularly review/refine strategy, stay informed, engage the gen AI community, invest in training, attract/retain top talent.

[^module1-slides]: [Module 1 slide deck (Generative AI Leader course)](references/genai-leader-module-1-slides.md)
[^module2-slides]: [Module 2 slide deck (Generative AI Leader course)](references/genai-leader-module-2-slides.md)
[^module3-slides]: [Module 3 slide deck (Generative AI Leader course)](references/genai-leader-module-3-slides.md)
[^module4-slides]: [Module 4 slide deck (Generative AI Leader course)](references/genai-leader-module-4-slides.md)
[^module5-slides]: [Module 5 slide deck (Generative AI Leader course)](references/genai-leader-module-5-slides.md)

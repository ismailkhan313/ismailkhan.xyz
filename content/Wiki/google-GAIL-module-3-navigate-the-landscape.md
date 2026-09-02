---
type: Study Guide
title: "Gen AI Leader — Module 3: Navigate the Landscape"
description: Exam-prep notes on the five-layer gen AI landscape (applications, agents, platform, models, infrastructure) and the Google Cloud products, roles, and cost factors that map to each layer.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL]
sources:
  - id: module3-slides
    resource: references/genai-leader-module-3-slides.md
    title: "Module 3 slide deck (Generative AI Leader course)"
generated: { by: claude-code/sonnet-5, at: 2026-09-02T18:55:15Z }
status: draft
---

# Module 03: Gen AI — Navigate the Landscape

## The five-layer model

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

## Agents

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

## Platform, Models, Infrastructure

### Platform — Agent Platform

Streamlines the ML workflow: infrastructure + pre-trained models + build/
deploy/manage tooling. MLOps tools (know which tool solves which job):

| Tool | Job |
|---|---|
| **Feature Store** | Share/serve/reuse ML features |
| **Model Registry** | Version, track changes, organize models |
| **Model Evaluation** | Evaluate/compare model performance |
| **Workflow orchestration** (Pipelines) | Automate the end-to-end ML pipeline |
| **Model Monitoring** | Detect performance drift, trigger retraining |

### Models — Model Garden vs. build-your-own

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

### Infrastructure

- **Compute**: GPUs (general-purpose parallel processing) vs. **TPUs**
  (custom-designed, AI-optimized) vs. **Hypercomputers** (many nodes
  connected for massive training/inference scale).
- **Storage**: large-scale + fast read/write, optimized for AI throughput,
  scalability, dense compute clusters.
- **Networking**: Google's global fiber network — high bandwidth, low
  latency, needed to coordinate processors.
- Infrastructure matters at *every* dev stage if you're not on a managed
  platform: data collection, training, deployment, monitoring, refinement.

### Edge computing

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

## Roles → layers mapping

| Role | Responsibility | Layer |
|---|---|---|
| **Business leaders** | Use pre-built gen AI solutions to improve operations | Applications |
| **Developers** | Build/deploy custom agents, integrate AI into apps | Agents |
| **AI practitioners** | Customize, deploy, optimize models; responsible AI | Platform / Models / Infrastructure |

## Cost

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

## Choosing a solution — decision framework

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

## Maintenance

- Model monitoring + periodic retraining.
- Regular data updates to keep the model fresh.
- Software updates/bug fixes, applied properly.
- Hardware/infra upkeep: server maintenance, security updates, capacity
  planning.
- Ongoing security review and regulatory compliance.

## High-yield exam facts

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

[^module3-slides]: [Module 3 slide deck](references/genai-leader-module-3-slides.md), Google Cloud Generative AI Leader (ILT) course.

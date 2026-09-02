---
type: Study Guide
title: "Gen AI Leader — Module 5: Gen AI Agents - Transform Your Organization"
description: Exam study notes on gen AI agent components, prompt-engineering reasoning frameworks, agent tooling, RAG, and Google Cloud's agent/CX product line.
tags: [google-cloud, generative-ai, certification, study-guide, agents, GAIL]
sources:
  - id: module5-slides
    resource: references/genai-leader-module-5-slides.md
    title: "Module 5 slide deck (Generative AI Leader course)"
generated: { by: claude-code/sonnet-5, at: 2026-09-02T18:55:15Z }
status: draft
---

# Gen AI Leader — Module 5: Gen AI Agents - Transform Your Organization

## Agent evolution: deterministic vs. generative

- **Deterministic (traditional) agents** — predefined paths/actions, workflow-based and event-driven, high control and predictability, same input → same output. Reasoning loop + tools, **no foundation model**.
- **Generative agents** — natural, flexible conversation; may give different answers to the same input. Reasoning loop + tools + **foundation model**. RAG enables integration from external sources.
- **Hybrid agents** — combine deterministic control with generative flexibility.

## Three components of a generative AI agent

- **Foundation model** — the underlying LLM powering the agent; choose one trained on data relevant to the use case.
- **Tools** — let the agent observe and act on the world (extensions/APIs, functions, data stores).
- **Reasoning loop** — the decision-making core; iteratively considers the goal, available tools, and gathered info. Guided by reasoning frameworks.

## Sampling parameters (model settings)

- **Token count** — 1 token ≈ 4 characters; models have a max token limit per call.
- **Temperature** — controls randomness/"creativity" of word choice.
- **Top K** — model randomly picks from the K most probable next words.
- **Top P (nucleus sampling)** — cumulative probability threshold for candidate tokens.
- **Safety settings** — filter harmful/inappropriate output.
- **Output length** — max length of generated text.

## Google AI Studio vs. Agent Studio

| | Google AI Studio | Agent Studio |
|---|---|---|
| Audience | Beginners, students, researchers | Professionals, enterprise projects |
| Access | Standard Google account, usage limits | Google Cloud console, part of **Agent Platform** |
| Purpose | Try Gemini models, prototype with Gemini Developer API | Build/train/deploy ML models & agents at scale |
| Governance | — | Enterprise-grade security, Google Cloud policy compliance, flexible quotas, service charges |
| Extras | Simple interface for parameter experimentation | Tool integration, grounding for accuracy |

## Reasoning loop + prompt engineering

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

## Agent tools (4 types)

- **Extensions (APIs)** — standardize how the agent interacts with external APIs.
- **Functions** — specialized, reusable actions; reasoning system picks the right one.
- **Data stores** — give access to real-time/historical/knowledge-based info.
- **Plugins** — add new skills/integrations, connect to other services/platforms.

**Reasoning loop with tools (4-step cycle):** Reasoning (select tool) → Acting (execute tool) → Observation (receive tool output) → Iteration (reason about next steps).

## Google Cloud tools for agents

- **Cloud Storage** — scalable/durable object storage.
- **Databases** (Cloud SQL, Spanner, Firestore) — store/retrieve agent data, manage user data, track progress.
- **Cloud Run functions** — serverless, event-triggered, auto-scaling; act as specialized agent tools.
- **Cloud Run** — serverless containers; for custom tools needing specific dependencies/more control.
- **Agent Platform** — build agents that are themselves callable as tools by other agents.

## Pre-built Google AI APIs

- **Speech-to-Text API** — speech → text (transcription).
- **Text-to-Speech API** — text → natural speech (voice UIs).
- **Translation API** — translate text/documents/websites/audio/video.
- **Document Translation API** — translates formatted docs, preserves layout.
- **Document AI API** — extracts data from documents, automates capture/processing, summarizes.
- **Cloud Vision API** — image understanding: tagging, moderation, visual search.
- **Cloud Video Intelligence API** — video analysis: content recommendation, video search, media analysis.
- **Natural Language API** — text insights: sentiment, classification, entity extraction.
- Broader **API Library** also covers Google Maps, Workspace, YouTube, Photos, etc.

## Deploying agents into applications

- **Two-step API integration:** (1) generate an API key / set up auth, (2) make API calls from app code (send prompt+params → receive generated text).
- **Cloud Run functions** — event-triggered code, no server management, good for lightweight automation on top of the API.
- **Cloud Run** — containerized apps, more control, for complex application needs.
- Gemini API works over HTTP — integrates into web, mobile, desktop, embedded systems.
- **Low/no-code:** **Apps Script** (low-code, JavaScript, automates Google Workspace with Gemini API add-ons) vs. **AppSheet** (no-code, custom business apps using the Gemini API).
- **Multi-agent applications** — multiple specialized agents, working independently or interacting; improves efficiency/flexibility/scalability; an agent can itself be a tool for another agent.

## Retrieval-augmented generation (RAG)

- **Retrieval** — LLM (with retrieval tools: data stores, vector databases, search engines, knowledge graphs) finds relevant external info.
- **Augmentation** — retrieved info is merged into the prompt alongside the user's original query.
- **Generation** — LLM produces the response from the augmented prompt.
- Some RAG systems iterate the retrieval step to improve relevance.
- **Data stores** = structured/unstructured knowledge bases (websites, structured DBs, unstructured data).

## Google's search & recommendation agent products (Agent Platform)

- **Document search** — over unstructured docs in Cloud Storage.
- **Media search** — images/video/audio libraries.
- **Healthcare search** — healthcare data, supports regulatory compliance.
- **Search for commerce** — retail catalog search.
- **Media recommendations** — consumer media apps (streaming, publishing).
- **Recommendations for commerce** — personalized e-commerce recommendations, drives sales.
- **Agent Search** — grounds LLM responses in first-party data, curated third-party data, and Google's knowledge graph (RAG-based); adds **search summaries** and **answers/follow-ups** (AI-generated, natural-language Q&A over results).

## Customer experience (CX) product line — Gemini Enterprise for CX

- **Customer Experience agents** — chatbots for customers. Three types: **Deterministic** (rules-based, low/medium code), **Generative** (LLM-driven, minimal/no code), **Hybrid** (via **CX Agent Studio** — deterministic control + generative flexibility).
- **Agent Assist** — real-time AI help for *human* contact-center agents: generated responses, knowledge-base suggestions, transcription, translation, summaries.
- **Customer Experience Insights (CX Insights)** — analyzes customer interactions; Generative FAQ surfaces common questions and response effectiveness.
- **Contact Center as a Service (CCaaS)** — 24/7 omnichannel support, CRM integration, infrastructure management, multichannel + tool integration.

## Gemini Enterprise app

- Creates AI-powered custom agents that access/understand company data from any source; acts as a personal work research assistant.
- Launch points: **Gemini Notebook Enterprise** (upload/analyze data, audio summaries), **multimodal search agents** (grounded across company data systems), **generative AI assistants** (grounded in enterprise data, act via connectors/tools), **custom agents** (built via CX Agent Studio).

## Planning gen AI organizational transformation

**6-step integration plan:**
1. Establish a clear vision — align with strategy, get leadership buy-in, appoint an adoption champion.
2. Prioritize high-impact use cases — align with business goals, weigh feasibility/transformation potential.
3. Invest in capabilities — build skills via training/recruitment, foster experimentation culture.
4. Drive organizational change — manage workflow shifts, agile collaboration, knowledge sharing.
5. Measure and demonstrate value — track impact with data.
6. Champion responsible AI — fairness, transparency, privacy, security framework.

**Plan for impact:** define key metrics → collect and analyze data → iterate and improve.

**Plan for change:** regularly review/refine strategy, stay informed, engage the gen AI community, invest in training, attract/retain top talent.

[^module5-slides]: [Module 5 slide deck — Generative AI Leader course](references/genai-leader-module-5-slides.md).

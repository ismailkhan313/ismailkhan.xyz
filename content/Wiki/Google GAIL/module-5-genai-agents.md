---
type: Study Guide
title: "GAIL Module 5: Gen AI Agents — Transform Your Organization"
description: Agent architecture (foundation model, tools, reasoning loop), CoT/ReAct, RAG, Google Cloud agent tooling, and planning org-wide gen AI transformation.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL, agents]
sources:
  - id: module5-slides
    resource: references/genai-leader-module-5-slides.md
    title: "Module 5 slide deck (Generative AI Leader course)"
generated: { by: claude-code/opus-5, at: 2026-09-10T01:46:57Z }
status: draft
---

Module 5 opens up the agent that Module 3 treated as a single box on a
diagram. It has three parts, and they build on each other: what an agent is
made of, how you assemble one on Google Cloud, and how an organization adopts
the result. This module owns the deepest treatment of the reasoning
frameworks and of RAG — the other modules mention both and point here.[^module5-slides]

## How agents evolved: deterministic, generative, hybrid

Agents existed before gen AI. Comparing the two generations is the fastest way
to see what the foundation model actually adds — and the component lists below
differ by exactly one item.

- **Deterministic (traditional) agents** — built on predefined paths and
  actions, workflow-based and event-driven. They offer a high degree of
  control and predictability: **the same input always produces the same
  output.** Composed of a **reasoning loop + tools — no foundation model.**
- **Generative agents** — allow far more natural and flexible conversation,
  and **may give different answers to the same input.** Composed of a
  **reasoning loop + tools + a foundation model.** RAG lets them integrate
  information from external sources.
- **Hybrid agents** — combine deterministic control with generative
  flexibility.

The tradeoff is explicit: determinism buys predictability, generation buys
flexibility, and you give up one to get the other unless you go hybrid.

## The three components of a generative AI agent

- **Foundation model** — the underlying LLM powering the agent. The selection
  criterion the course states: pick a model whose **training data is relevant
  to the agent's intended use case.**
- **Tools** — what let the agent observe the world and act upon it. Without
  tools the model can only talk; with them it can retrieve, calculate, book,
  and change things. *Extensions connecting to APIs, functions, data stores.*
- **Reasoning loop** — the core of the agent, responsible for making decisions
  and taking actions. An iterative process in which the agent considers its
  goal, the tools available, and the information gathered so far. Reasoning
  frameworks guide it.

## Model settings: sampling parameters

These are the dials exposed when you call a model directly. They matter to a
leader because they're the cheapest way to change agent behavior — no
retraining, no new data.

- **Token count** — a token is a group of characters, roughly **1 token ≈ 4
  characters.** Models cap how many tokens they can handle at once.
- **Temperature** — controls the model's "creativity" by adjusting the
  randomness of word choice. Low temperature means predictable output; high
  means diverse and unpredictable.
- **Top K** — the model randomly returns a word from the **top K most probable
  words**, a fixed-count cutoff.
- **Top P (nucleus sampling)** — uses a **cumulative probability** threshold
  over the most likely tokens instead of a fixed count.
- **Safety settings** — filter potentially harmful or inappropriate content
  out of the output.
- **Output length** — the maximum length of the generated text.

### Don't confuse these: Top K vs. Top P

Both narrow the pool of candidate next words; they differ in **what the deck
says the cut is based on.** Top K is a **count** — the model picks randomly
from the top K most probable words. Top P is a **cumulative probability** — the
threshold applies to the accumulated likelihood of the most probable tokens
rather than to a fixed number of them.

## Google AI Studio vs. Agent Studio

Two prototyping surfaces, and the exam asks which fits a described user. The
split is essentially hobbyist-and-researcher versus enterprise.

| | Google AI Studio | Agent Studio |
|---|---|---|
| **Audience** | Developers, students, researchers | Professionals, enterprise projects |
| **Access** | Standard Google account, usage limits | Google Cloud console; part of **Agent Platform** |
| **Purpose** | Try Gemini models, start building with the Gemini Developer API | Rapidly prototype and test models; build, train, and deploy at scale |
| **Governance** | — | Respects Google Cloud policies; enterprise-grade security, flexible quotas, service charges |
| **Extras** | Simple interface designed for ease of use and accessibility | Design and save prompts, tune foundation models, tool integration, grounding for accuracy |

## The reasoning loop and prompt engineering

The reasoning loop has four characteristics: it's **iterative** (the agent
continuously evaluates progress and determines the next best action), it does
**internal reasoning** (using the language model to think through the steps a
task requires), it does **decision making** (choosing tools and determining
their inputs based on that reasoning), and it's shaped by **reasoning
frameworks** — prompt engineering techniques that guide how it reasons and
plans. The two named frameworks are CoT and ReAct.

### Chain-of-thought (CoT)

**CoT guides an LLM through a problem-solving process by providing examples
containing intermediate reasoning steps.** Rather than prompting and expecting
an answer to appear, you walk the model through the reasoning — and those
intermediate steps are the "chain of thought." It works because forcing the
problem into smaller sequential steps prevents the model from leaping to a
plausible-sounding conclusion it can't support.

**Three ways to implement it:**

- **Self-consistency** — have the LLM generate multiple solutions and choose
  the most consistent one.
- **Active-prompting** — let the LLM ask clarifying questions or request more
  information.
- **Multimodal CoT** — combine text with images or video to enhance the
  reasoning.

**Three benefits:** improved reasoning on problems requiring logical thinking,
better accuracy from breaking problems into smaller steps, and enhanced
explainability — you can see how the model reached its answer, which builds
trust.

*CoT in action: complex reasoning tasks, explanation generation, multi-step
planning.*

### ReAct (Reason and Act)

**ReAct is a prompting framework letting the LLM reason about and take action
on a user query, with or without in-context examples.** Its significance:
it lets the model **interact with the real world and gather information**
before answering, rather than being confined to what it already knows.

The **thought–action–observation loop**, which repeats as needed:

1. **Think** — the LLM generates a thought about the problem.
2. **Act** — the LLM decides what action to take and specifies the input.
3. **Observe** — the LLM receives feedback from that action.
4. **Respond** — the LLM generates a response.

**Three benefits:** dynamic problem solving (tackling tasks that require
external resources and adapting to new information), reduced hallucination
(grounding in real observations lowers the risk of nonsensical output), and
increased trustworthiness (the reasoning process and external interactions are
visible).

*ReAct in action: question answering, fact verification, decision making.*

### Don't confuse these: CoT vs. ReAct

**CoT focuses on internal reasoning; ReAct enables external interaction.** The
two can be combined for deeper reasoning *and* dynamic action. The sorting
rule for scenario questions: **does answering require information the model
doesn't already have?** If yes, ReAct. If it's synthesis, distillation, or
ideation over what's already present, CoT.

| Task | Framework | Why |
|---|---|---|
| Find a restaurant near my current location | **ReAct** | Needs external, real-time information |
| Summarize an article | **CoT** | Understanding and distilling what's already given |
| Brainstorm product ideas | **CoT** | Creative ideation, no external lookup |
| Search for research papers on a topic | **ReAct** | Requires interaction with an external database |

## Agent tools

Four types. The exam tests the one-line distinction between them, so learn
them as a contrast set rather than four separate definitions.

- **Extensions (APIs)** — sets of rules governing how software interacts. They
  **standardize** how the agent talks to external APIs, so varying API designs
  don't each need custom handling.
- **Functions** — specialized, reusable actions in the agent's toolbox; the
  reasoning system selects the appropriate one for the task.
- **Data stores** — give the agent access to real-time, historical, and
  knowledge-based information, keeping responses accurate and relevant.
- **Plugins** — add new **skills and integrations**, extending the agent by
  connecting it to services, specialized tools, or other platforms.

> **Exam note:** the one-line mapping the deck's quiz recap uses —
> **Extensions** connect to external services via APIs, **Functions** define
> specific actions and tasks, **Data stores** provide access to information,
> **Plugins** add new skills and integrations.

### The reasoning loop with tools

A four-step cycle that repeats:

1. **Reasoning (tool selection)** — the agent analyzes the task and determines
   which tools are needed.
2. **Acting (tool execution)** — the agent executes the selected tool.
3. **Observation** — the agent receives the tool's output.
4. **Iteration** — the agent reasons about the next steps.

*Worked example — scheduling a garden consultation: the agent needs a time
slot, so it uses a scheduling plugin to check availability and accesses the
customer database; the plugin returns available slots; the agent presents them
to the client.*

## Google Cloud tools for agents

- **Cloud Storage** — highly scalable, durable object storage.
- **Databases** (Cloud SQL, Spanner, Firestore) — store and retrieve the data
  an agent needs; manage user data or track the agent's own progress.
- **Cloud Run functions** — serverless functions acting as specialized tools;
  easily triggered, scale automatically.
- **Cloud Run** — serverless platform for stateless containers; the right
  choice for custom tools with specific dependencies or when you need more
  control.
- **Agent Platform** — create models or agents that are themselves **called as
  tooling by other agents.**

### Pre-built AI APIs

Ready-made capabilities you call rather than build. Knowing which API does
which job is a recurring question shape.

| API | What it does | Typical use |
|---|---|---|
| **Speech-to-Text** | Speech → text | Transcribing meetings, calls, video |
| **Text-to-Speech** | Text → natural-sounding speech | Voice interfaces, personalized communication |
| **Translation** | Translates text, documents, websites, audio, video | Multilingual content |
| **Document Translation** | Translates formatted documents, preserving layout | Contracts, forms, reports |
| **Document AI** | Extracts data from documents, automates capture, summarizes | Invoice and form processing |
| **Cloud Vision** | Understands image content | Image tagging, content moderation, visual search |
| **Cloud Video Intelligence** | Analyzes video, extracts meaningful information | Content recommendation, video search, media analysis |
| **Natural Language** | Derives insights from unstructured text | Sentiment, classification, entity extraction |

Google Cloud also offers a broad **API Library** connecting to other Google
products — Maps, Workspace, YouTube, Photos.

*Chained example — a meeting location planner: **Document AI** extracts
addresses from an uploaded document → the **Google Maps Geocoding API**
converts them to coordinates and calculates travel times → custom logic in a
**Cloud Run function** determines the suggested location.*

## Building applications from your agents

**Integrating the API takes two steps:** (1) generate an API key or set up
authentication so your application can securely access the Gemini API, and
(2) start making API calls from your application code — sending prompts and
parameters, receiving generated text back. API access is enabled through
Agent Studio or Google AI Studio.

**Where the agent runs:**

- **Cloud Run functions** — small pieces of code triggered by specific events,
  processing them via the API with no server management. Good for lightweight
  automation.
- **Cloud Run** — containerized applications, easy to deploy and scale. Good
  for complex apps needing specific software or configuration.

The Gemini API works over HTTP, so it integrates into any application that can
make HTTP requests: web, mobile, desktop, embedded systems.

**Low-code and no-code:**

- **Apps Script** — *low-code*. Automates Google Workspace with JavaScript and
  built-in services, and uses the Gemini API to create gen AI add-ons for
  Workspace.
- **AppSheet** — *no-code*. Builds custom business apps, combining AppSheet
  with the Gemini API for automation and intelligent features.

**Multi-agent applications** use multiple agents, each specialized for a task.
They can work independently or interact with one another, improving
efficiency, flexibility, and scalability — and **an agent can itself be a tool
within another agent**, which is the recursion that makes the pattern scale.

## Retrieval-augmented generation (RAG)

RAG is the mechanism behind most enterprise agents, because it's how an agent
answers from company knowledge it was never trained on. Three stages:

1. **Retrieval** — the LLM, equipped with retrieval tools, identifies relevant
   information from external sources. Those tools can include **data stores,
   vector databases, search engines, and knowledge graphs.**
2. **Augmentation** — the retrieved information is incorporated into the
   prompt fed to the LLM. The augmented prompt contains **the user's original
   query plus the relevant retrieved context.**
3. **Generation** — the LLM processes the augmented prompt and generates the
   response.

Some RAG systems **iterate** the retrieval step, continuously improving the
quality and relevance of the response.

*Worked example — "What were the main developments at the recent climate
conference in Dubai?": the query goes to a vector database and search engine
(retrieval) → the query is combined with what came back (augmentation) → the
LLM generates a summary citing its sources (generation) → it may iterate with
different search terms or additional data sources.*

**Data stores** in AI applications act as the structured and unstructured
knowledge bases the agent draws on: websites, structured databases, and
unstructured data.

> **Exam note:** the three stages map to one verb each — **retrieval** is
> fetching relevant documents from a knowledge base based on the user query,
> **augmentation** is adding that context to the query, and **generation** is
> creating the natural-language response.

## Search and recommendation agents

**Agent Platform search solutions:**

- **Document search** — search a large repository of unstructured documents in
  Cloud Storage.
- **Media search** — understands and searches image, video, and audio
  libraries.
- **Healthcare search** — search across healthcare data while supporting
  regulatory compliance.
- **Search for commerce** — search over a retail catalog.

**Agent Platform recommendations solutions:**

- **Media recommendations** — for consumer media applications: audio/video
  streaming, digital publishing.
- **Recommendations for commerce** — optimized for e-commerce, driving sales
  through personalized product recommendations.

**Agent Search** uses intelligent data connection and generative AI, acting as
an agent that retrieves and recommends information from diverse data stores
based on context. **Its key strength is grounding LLM responses in your
first-party data, curated third-party data, and Google's knowledge graph — a
RAG approach.** Two extra generative features sit on top: **search summaries**
(concise, tailored summaries of results) and **answers and follow-ups**
(AI-generated answers users can question in natural language). It offers
secure, scalable search with advanced analytics and API/SDK integration.

## Customer experience: Gemini Enterprise for CX

Three components, distinguished by **who they serve** — the customer, the
human support agent, or the manager reviewing the operation.

- **Customer Experience agents** — chatbots that communicate with customers.
- **Agent Assist** — supports *live human* contact-center agents.
- **Customer Experience Insights** — insight into all customer communications.

**The three CX agent types** mirror the deterministic/generative/hybrid split
from the start of the module, now expressed as how much code they need:

1. **Deterministic** — follows explicitly defined rules and logic; requires
   **low-to-medium code** for all actions.
2. **Generative** — uses LLMs for natural conversation, determining actions
   from prompts with **minimal-to-no code.**
3. **Hybrid** — built in **CX Agent Studio**, combining deterministic control
   with generative flexibility.

**Agent Assist** gives live human agents real-time AI help: generated
responses, knowledge base suggestions, transcription, translation, and
summaries, for faster and more accurate resolutions.

**Customer Experience Insights (CX Insights)** analyzes customer interactions
to boost efficiency and improve agent performance. Its **Generative FAQ**
identifies common questions and how effective the responses were, highlighting
areas to improve.

**Contact Center as a Service (CCaaS)** simplifies complex contact centers
with 24/7 omnichannel support, CRM integration, and infrastructure management,
handling multichannel communication and integrating with the agent and insight
tools.

> **Exam note:** the product-matching recap — **Agent Search** delivers search
> over organizational data with tuning for retail, media, and healthcare;
> **Agent Assist** guides human contact-center agents during live calls,
> improving first-call resolution; **Recommendations** provides personalized
> product and content suggestions; **CX Agent Studio** designs, builds, and
> deploys chatbots and voice bots that understand user intent and extract key
> information.

## Gemini Enterprise app

The Gemini Enterprise app creates AI-powered custom agents that access and
understand company data from any source, integrating into internal systems to
act as personal work research assistants. It's the launch point for four kinds
of enterprise-ready agent:

- **Gemini Notebook Enterprise** — employees upload information to analyze,
  get insights, and listen to audio summaries.
- **Multimodal search agents** — grounded in your data across multiple
  systems, so employees can find relevant information anywhere in the company.
- **Generative AI assistants** — grounded in enterprise data, and able to take
  actions through connectors (tools).
- **Custom agents** — built through CX Agent Studio.

## Planning organizational transformation

The module closes on adoption, which is the part a Generative AI Leader
actually owns. Three plans, nested: an integration plan for getting started, an
impact plan for proving it worked, and a change plan for staying current.

**Plan for gen AI integration — six steps:**

1. **Establish a clear vision** — align gen AI with strategy, secure
   leadership buy-in, appoint an adoption champion.
2. **Prioritize high-impact use cases** — align opportunities with business
   goals, weighing feasibility against transformation potential.
3. **Invest in capabilities** — develop skills through training and
   recruitment; foster a learning and experimentation culture.
4. **Drive organizational change** — manage the workflow shifts gen AI causes;
   encourage agile collaboration and knowledge sharing to scale.
5. **Measure and demonstrate value** — track impact with data, both to improve
   and to prove the case.
6. **Champion responsible AI** — implement a robust framework ensuring
   fairness, transparency, privacy, and security.

**Plan for impact — three steps:** define key metrics relevant to your goals →
collect and analyze data through tracking, surveys, or existing sources →
iterate and improve, using those insights to refine strategy.

**Plan for change — five practices:** regularly review and refine your
strategy, stay informed, engage with the gen AI community, invest in training
and development, and attract and retain top talent.

## The exam itself

From the course closing: **90 minutes, 50–60 multiple-choice questions.** The
certification describes a Generative AI Leader as someone with comprehensive
business knowledge of how gen AI transforms businesses using Google Cloud's
products — identifying use cases, fostering collaboration across technical and
non-technical teams, and driving responsible adoption. The questions are
written to that profile: business judgment and product selection, not
implementation detail.

[^module5-slides]: [Module 5 slide deck (Generative AI Leader course)](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/genai-leader-module-5-slides.md)

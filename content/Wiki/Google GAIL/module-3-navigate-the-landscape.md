---
type: Study Guide
title: "GAIL Module 3: Navigate the Landscape"
description: The five-layer gen AI stack (Applications, Agents, Platform, Models, Infrastructure), agent categories, Google Cloud's MLOps tooling, cost, and solution selection.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL, agents]
sources:
  - id: module3-slides
    resource: references/genai-leader-module-3-slides.md
    title: "Module 3 slide deck (Generative AI Leader course)"
generated: { by: claude-code/opus-5, at: 2026-09-10T01:46:57Z }
status: draft
---

Module 3 is a map. It divides the gen AI world into five layers, then walks
down them one at a time, naming the Google Cloud product that lives at each.
The reason to learn the layering rather than just the product names is that
the exam's favorite question shape is a scenario plus "which layer is this?" —
and the layers are also how the course assigns roles, costs, and decisions.
Knowing where something sits tells you who owns it and what it costs.[^module3-slides]

## The five layers

Top to bottom: **Applications → Agents → Platform → Models → Infrastructure.**
Each layer consumes the one below it and hides that complexity from the one
above.

- **Gen AI applications** — the user-facing frontend, where people actually
  interact with AI capabilities. *The Gemini app, Google Workspace with
  Gemini, Gemini Notebook.*
- **Agents** — software that learns how best to achieve a goal given its
  inputs and the tools available to it. The defining word is **autonomous
  action**: an agent does things, it doesn't just answer. *Customer agents,
  code agents, data agents.*
- **Platform** — the tools and services that let agents and models interact:
  APIs, data management, model deployment. This is the layer that makes the
  others usable together. *Agent Platform.*
- **Models** — the brain. A complex algorithm trained on vast data that
  generates content, translates, and answers questions. *LLMs, image
  recognition models, recommendation systems.*
- **Infrastructure** — the core computing resources: the hardware and
  software needed to store and run models and training data.

### Layer-identification drill

The exam gives a scenario and wants the layer. The tell is usually a single
verb — *training tools* means Platform, *generates instantly for a user* means
Application, *processing power* means Infrastructure.

| Scenario | Layer |
|---|---|
| Tools to label training data, experiment with architectures, deploy a finalized model | **Platform** |
| A website that generates an image instantly from a text description | **Application** |
| Needing more processing power and high-speed data connections to train a large model | **Infrastructure** |
| A system trained on millions of lines of code that suggests the next line | **Model** |
| Monitoring social media, identifying negative sentiment, and drafting a response automatically | **Agent** |
| A data science team needing powerful hardware for compute-intensive training | **Infrastructure** |
| Defining the behaviors and personalities of game NPCs that adapt to players | **Agents** |

## The agents layer

A gen AI agent is **an application that tries to achieve a goal by observing
the world and acting upon it using the tools at its disposal.** Module 5
covers how one is built internally; here the concern is what agents do and how
they relate to the applications that contain them.

**Three capabilities:**

- **Understand and respond to natural language** — more intuitive interfaces
  that handle complex requests.
- **Automate complex tasks** — multi-step processes carried out within an
  application.
- **Personalization** — learn user preferences and tailor the experience.

### Don't confuse these: agents vs. applications

This distinction is tested repeatedly and in both directions. **The agents
layer defines the AI's capabilities — searching, booking, summarizing,
recommending. The applications layer provides the user-facing tool and the
overall goal — the website, the chat window, the progress tracking.** An agent
is an intelligent component functioning *inside* a larger gen AI-powered
application.

A related pairing, from the creative-writing-assistant activity: the **model**
layer generates grammatically correct text; the **agent** layer identifies and
applies the appropriate guidelines based on content type. Raw generation is
the model; judgment about which rules apply is the agent.

### Two agent categories

Both follow the same internal sequence — understand, call a tool, generate,
deliver. What differs is the trigger and the output.

- **Conversational agent** — you provide input by typing or speaking; the
  agent understands, calls a tool, generates a **response**, and delivers it.
  *Answering questions, casual chat, accessing information.*
- **Workflow agent** — you define a task or trigger a process; the agent
  understands, calls a tool, generates a **result**, and delivers it.
  *Ecommerce order fulfillment, customer onboarding, automated research,
  security log parsing.*

> **Exam note:** guiding new customers through account setup, tutorials, and
> FAQs is **customer onboarding** — a **workflow agent**, despite involving
> conversation. Match on whether a process is being executed, not on whether
> the interface is chat-like.

### Agent use cases

Six categories the exam likes to match against scenarios: **customer service**
(answer questions, resolve issues, recommend), **employee productivity** (find
information, manage tasks, automate workflows), **creative** (generate ideas,
create content, translate), **code** (write, review, debug, generate),
**data** (analyze datasets, identify trends, extract insights), and
**security** (automate security tasks).

### Multi-agent systems

An application composes several specialized agents while supplying the shared
interface. *A travel booking app: one agent finds flights and hotels, another
suggests activities, and the application provides browsing and reservation.*
The same shape appears in the customer support example (an agent answers,
troubleshoots, and escalates to humans) and the personalized learning example
(an agent assesses knowledge, recommends materials, generates exercises).

### Reasoning frameworks

The reasoning loop often uses advanced prompt engineering frameworks to guide
its decisions — simple rule-based calculations, complex thought chains, ML
algorithms, or probabilistic reasoning. The two named patterns are **ReAct**
(reasoning + acting) and **chain-of-thought (CoT)** prompting, both covered in
full in [Module 5](</Google GAIL/module-5-genai-agents.md>).

> **Exam note:** the two elements distinguishing AI agents from standalone
> LLMs are **a reasoning loop and the ability to use tools.** This is the
> single most repeated fact in the module — it appears in the lesson quiz and
> again in the wrap-up.

## The platform layer

The platform layer is the foundation for building and scaling AI initiatives.
**Agent Platform** streamlines the entire ML workflow by supplying
infrastructure, pre-trained models, and tools to build, deploy, and manage.
Its selling points: open and flexible, powerful infrastructure, pre-trained
models, comprehensive tooling, customization, and easy integration.

**MLOps tools** — know which tool solves which job, because the exam tests
exactly that discrimination:

| Tool | Job |
|---|---|
| **Feature Store** | Share, serve, and reuse ML features for consistency across models |
| **Model Registry** | Manage versions, track changes, organize models across their lifecycle |
| **Model Evaluation** | Evaluate and compare model performance |
| **Workflow orchestration** (Pipelines) | Automate the end-to-end ML pipeline, preprocessing through deployment |
| **Model Monitoring** | Detect performance degradation and input skew/drift, trigger retraining |

> **Exam note:** the three scenarios and their answers — tracking experiments
> and model versions is **Model Registry**; a deployed model whose performance
> is declining is **Model Monitoring**; automating the whole pipeline is
> **workflow orchestration**. Registry records, Monitoring watches,
> orchestration runs.

## The models layer

At the heart of every AI system is the model — a sophisticated mathematical
structure trained on massive data. Agent Platform acts as a **model hub**
offering two paths, and choosing between them is a recurring exam question.

**Use existing models with Model Garden** — discover, customize, and deploy
from 160+ models, some usable out of the box. The right choice when you need
something readily available and high-performing and don't need control over
architecture.

- First-party foundation models: **Gemini, Nano Banana, Veo, Chirp**.
- First-party pre-trained APIs: Speech-to-Text, Natural Language Processing,
  Translation, Vision.
- Open models: **Gemma 2, CodeGemma, PaliGemma, Llama 3.1/3.2, Mistral AI,
  AI21, TII**.
- Third-party models: **Anthropic's Claude** family.

**Build models with Agent Platform** — either fully custom (create and train
at scale, complete control over architecture and training) or **AutoML**, which
creates and trains models with little or no code.

AutoML objectives by data type:

| Data type | Supported objectives |
|---|---|
| Image | Classification, object detection |
| Video | Action recognition, classification, object tracking |
| Tabular | Classification or regression, forecasting |

The standard model workflow is the same five stages as the ML lifecycle in
Module 2: gather data → prepare data → train → deploy and predict → manage.

> **Exam note:** a global ecommerce platform needing a readily available,
> high-performing translation model on a moderate budget → **Model Garden**. A
> researcher building a cutting-edge protein-folding model who needs complete
> control over architecture and training → **build a custom model on Agent
> Platform**. The discriminator is control, not sophistication.

## The infrastructure layer

Infrastructure is the hardware and software providing the resources to train,
deploy, and scale models. Three components:

**High-performance computing**

- **GPUs and TPUs** — the workhorses of AI, both excelling at parallel
  processing. GPUs provide general-purpose parallel processing power; **TPUs
  are custom-designed and optimized specifically for AI tasks.**
- **Hypercomputers** — supercomputers built by connecting many individual
  nodes, providing the massive scale needed to train and run gen AI models.

**High-performance storage** — Google Cloud's storage is optimized for AI
workloads with high throughput, scalability, and the ability to create dense
compute clusters for faster training and inference. Fast read/write speeds
matter because storage that can't keep up starves the processors.

**Networking** — coordinating many processors requires fast, efficient
communication; Google's global fiber network supplies high-bandwidth,
low-latency connectivity.

> **Exam note:** GPUs and TPUs are **specialized processors designed for
> parallel processing in AI tasks**. High-performance storage exists **to
> store and efficiently access the massive datasets used in training**. And if
> you're not on a managed platform, infrastructure must be considered at
> **every** development stage — data collection, training, deployment,
> monitoring, and refinement, all of them.

### The travel chatbot, mapped through all five layers

The course's integrating example: the **application** is the website and chat
window; the **agents** are a conversational agent as the front door, a
planning agent for flight search, and a booking agent; the **platform** is
Agent Platform; the **model** is Gemini Pro; the **infrastructure** is the
underlying compute, storage, and networking.

## Edge computing

**Edge computing** runs AI on devices or servers closer to the data source or
the point of need, rather than in a centralized cloud. The tradeoff it buys:
you give up cloud scale to gain latency, privacy, and independence from
connectivity.

- **Real-time responsiveness** — no network round trip.
- **Increased data privacy** — data stays on the device.
- **Reduced reliance on internet connectivity** — it works offline.

**LiteRT (Lite Runtime)** helps ML models run efficiently on edge devices and
mobile phones. **Gemini Nano** is Google's edge-designed model, delivering
privacy, speed, and offline access. It powers Pixel's **Call Notes**
(summarizing phone conversations) and **Pixel Recorder** (summarizing voice
recordings), and is available to Android developers through the **AI Edge
SDK**.

Edge deployment on Agent Platform is three steps: **convert** models to LiteRT
for optimal edge performance, **package** models and dependencies into
containers for edge hardware, then **manage and monitor** deployments and
gather insights.

**Edge or cloud?** Pick edge when latency is genuinely critical; pick cloud
when you need scale or centralized aggregate analysis.

| Scenario | Answer | Why |
|---|---|---|
| Medical device analyzing patient data in real time during surgery | **Edge** | Cloud latency is unacceptable |
| Customer service chatbot handling millions of daily inquiries | **Cloud** | Needs scalable, robust infrastructure |
| Smart-city traffic pattern analysis and optimization | **Cloud** | Needs a centralized system with cloud-scale capacity |

> **Exam note:** edge computing's primary advantage is **real-time
> responsiveness and reduced latency.** Privacy and offline access are real
> benefits but are not the answer to "primary advantage."

## Roles mapped to layers

The course assigns each role a home layer, which is also how it frames who
should be handed which product.

| Role | Responsibility | Layer |
|---|---|---|
| **Business leaders** | Interact with pre-built gen AI solutions to enhance operations and customer experience (*Workspace with Gemini*) | Applications |
| **Developers** | Build and deploy custom AI agents, integrate AI into existing applications (*AI Applications, code generation, pre-trained APIs*) | Agents |
| **AI practitioners** | Customize, deploy, and optimize models; scale workloads; implement responsible AI | Platform / Models / Infrastructure |

> **Exam note:** AI practitioners' primary responsibility is **customizing,
> deploying, and optimizing generative AI models while ensuring responsible AI
> practices** — the responsible-AI clause is part of the correct answer.
> Developers are the ones **building and deploying custom agents.**

## Cost

**Three paid activities:** training the model, deploying it to an endpoint,
and using it to make predictions. Compute time, storage for training data, and
model outputs all factor in.

**Pricing models:**

- **Usage-based** — pay for what you use, measured in tokens or characters.
- **Subscription-based** — a recurring fee for access, with usage limits or
  feature tiers.
- **Licensing fees** — one-time or recurring, for commercial use or embedding
  in products.
- **Free tiers** — limited free access for experimentation or non-commercial
  use.

**Pricing metrics:** tokens (a piece of text — a word or part of a word),
characters, requests (charged regardless of complexity), and compute time
(significant for resource-intensive tasks).

**Cost drivers:** model size and complexity (larger and more capable costs
more), **context window** (a larger window increases cost), specialized
features (separately priced), and deployment (compute-based costs). Google
Cloud's [pricing calculator](https://cloud.google.com/products/calculator) is
the tool the course points at.

> **Exam note:** the primary cost associated with building gen AI solutions is
> **model training.** And when asked which factor increases the cost of *using*
> a model, the answer is **a larger context window.**

**Time** scales with customization: the more custom the solution, the more
time and resources it takes to build.

## Choosing a solution

Five dimensions to work through, plus a set of secondary constraints that
often turn out to be the deciding ones.

- **Scale** — small scale means selecting pre-built tools and leveraging
  existing applications; large scale means designing for scalability and
  security while weighing infrastructure cost, data storage, and latency.
- **Customization** — start with existing models, then ask what's genuinely
  unique: specialized knowledge, complex tasks, or a distinctive user
  experience. Fine-tune on domain-specific data only when the domain actually
  demands it.
- **User interaction** — UI (a dedicated interface, or embedded in existing
  workflows) and UX (conversational, informative, or task-oriented; how much
  guidance and feedback users need).
- **Privacy** — data security through encryption, access controls, and secure
  data centers; plus compliance with whatever regulations apply.
- **Other considerations** — latency tolerance, connectivity and offline
  needs, acceptable accuracy and error tolerance, and explainability
  (whether you need to understand the AI's reasoning, which is
  non-negotiable in some domains).

> **Exam note:** the key factor in deciding how custom a solution needs to be
> is **whether grounding or fine-tuning is sufficient, or a brand-new model is
> required.**

**Solution-fit patterns from the activities:** realistic images from text,
some coding skill, short on time → **a pre-trained API like Nano Banana**. A
recommendation chatbot with no coding experience → **AI Applications to create
a conversational agent**. Product descriptions needed quickly by a marketing
team → **a gen AI-powered application like Google Workspace with Gemini**. The
pattern: the less time and skill available, the higher up the stack the answer
sits.

## Decisions and maintenance

**Making decisions** — evaluate model capabilities, compare pricing
structures, factor in additional costs, and read the fine print. Sources for
comparison: provider websites, research papers and benchmarks, and community
forums.

> **Exam note:** an important step in deciding on a gen AI solution is
> **comparing different companies and models.** The course treats
> single-vendor evaluation as a mistake.

**Maintenance** — five ongoing obligations: model monitoring and periodic
retraining; regular **data updates** to keep the model fresh and relevant;
software updates and bug fixes; hardware and infrastructure upkeep (server
maintenance, security updates, capacity planning); and continuing security and
compliance review.

[^module3-slides]: [Module 3 slide deck (Generative AI Leader course)](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/genai-leader-module-3-slides.md)

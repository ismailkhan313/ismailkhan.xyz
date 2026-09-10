---
type: Study Guide
title: "GAIL Module 2: Unlock Foundational Concepts"
description: Core AI/ML/DL definitions, data quality and types, ML lifecycle, foundation model limitations, secure and responsible AI, and legal implications.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL, agents]
sources:
  - id: module2-slides
    resource: references/genai-leader-module-2-slides.md
    title: "Module 2 slide deck (Generative AI Leader course)"
generated: { by: claude-code/opus-5, at: 2026-09-10T01:46:57Z }
status: draft
---

Module 2 goes underneath the vocabulary from Module 1 and asks what gen AI is
actually made of. The through-line is data: a model's behavior comes from the
data it learned on, so data quality determines capability, data gaps determine
limitations, and data handling determines whether the whole thing is secure and
lawful. That single dependency explains why one module covers definitions,
data pipelines, model limitations, and responsible AI — they're the same
subject viewed at four distances.[^module2-slides]

## The hierarchy: AI, ML, deep learning, gen AI

These four terms nest, and the exam tests placement rather than definition
recall.

- **Artificial intelligence** — the broad field of building machines that do
  tasks normally requiring human intelligence. A field, not a technique.
- **Machine learning** — a subset of AI where machines learn from data rather
  than from explicit programming. The consequence worth internalizing:
  **different data creates different models.** Change the data and you get a
  different system, even with identical code.
- **Deep learning** — a specific ML technique that teaches computers using
  artificial neural networks. Neural networks can leverage both labeled and
  unlabeled data, which makes deep learning **semi-supervised**. This is what
  gives gen AI the ability to produce text, images, and audio.
- **Generative AI** — an application of the above, focused on creating new
  content.

So: **AI ⊃ ML ⊃ DL**, with gen AI built on top of deep learning.

> **Exam note:** three definition questions map one-to-one onto this list —
> "learns from data without explicit programming" is **machine learning**, "the
> broad field of computer science" is **artificial intelligence**, and
> "multi-layer neural networks for complex patterns" is **deep learning**.

## Why data is the lever

An ML model analyzes the data it's given, identifies patterns, and calculates
the likelihood of outcomes when it meets new information. Nothing in that loop
corrects for bad input — so the quality and accessibility of data set a ceiling
on everything the model can do.

> **Exam note:** a **model** in ML is "a complex mathematical structure that
> processes inputs to generate outputs." The distractors anthropomorphize it
> or describe it as a database.

### Data quality — five factors

- **Accuracy** — inaccurate data teaches incorrect patterns, producing faulty
  predictions. *Wrong dates and mislabeled details in a training set.*
- **Completeness** — the dataset needs enough size and enough representation
  within it for the model to predict accurately.
- **Representative** — data must be inclusive; a skewed sample produces biased
  outcomes. Distinct from completeness: you can have a large dataset that
  still represents only one kind of case.
- **Consistency** — inconsistent formats or labeling confuses the model and
  hinders learning. *The same field recorded as "NY" in some rows and "New
  York" in others.*
- **Relevance** — the data has to fit the task the AI is designed to perform.

> **Exam note:** factual errors in training data compromise **accuracy** —
> not completeness, consistency, or relevance, all of which appear as
> distractors. Separately: large volume is often beneficial but is **not the
> only** data aspect influencing performance.

### Data accessibility — three factors

- **Availability** — no data, no training. The first question, not the last.
- **Cost** — acquiring high-quality data can itself be the barrier that stops
  an AI project.
- **Format** — data must arrive in a form the model can process.

### Structured vs. unstructured data

- **Structured** — organized and easily searchable. *Customer ID, name,
  delivery address, purchase date, order cost — and a 1–5 star rating, which
  is structured despite being "feedback."*
- **Unstructured** — no predefined structure, messy and complex, not easily
  organized. *A product image, free-text customer feedback, the body of an
  email.*

## Three types of machine learning

The three are distinguished by **what the training data looks like**, which is
the fastest way to sort a scenario.

- **Supervised learning** — trained on **labeled** data, where tags assign
  meaning to each example. The labels let the algorithm learn the
  input→output relationship and predict on new, unseen inputs. *A spam
  classifier trained on manually labeled emails.*
- **Unsupervised learning** — trained on **unlabeled** data with no inherent
  correct answer. The model finds natural groupings in raw data; it's
  exploratory, uncovering structure nobody specified in advance. *Topic
  modeling that discovers the themes in a document collection.*
- **Reinforcement learning** — learns through interaction and feedback,
  receiving rewards or penalties and discovering which actions produce the
  best outcomes. Useful precisely when you **can't** supply explicit
  instructions or labeled data. *A game-playing AI improving by trial and
  error.*

**Google Cloud examples, as the slides pair them:**

| Use case | Learning type | Tool |
|---|---|---|
| Predictive maintenance — predict machine failure from sensor data | Supervised | Agent Platform |
| Anomaly detection — flag transactions deviating from the norm | Unsupervised | BigQuery ML |
| Product recommendations — maximize engagement and sales | Reinforcement | Agent Platform |

> **Exam note:** agents in reinforcement learning learn primarily **by
> interacting with their environment and receiving feedback** — not from
> labeled examples or from being programmed with rules.

## The ML lifecycle

Five stages, each with the Google Cloud tools the exam associates with it.
This same five-stage frame returns later in the module as the skeleton for
security controls, so it's worth learning once properly.

1. **Gather** — determine what data you need based on the desired outcome.
   *Pub/Sub* for real-time streaming, *Cloud Storage* for unstructured data,
   *Cloud SQL* and *Spanner* for structured data.
2. **Prepare** — clean and transform raw data into a usable format, including
   formatting and labeling. *BigQuery* for analysis, *BigQuery universal
   catalog* for governance.
3. **Train** — create the model from the prepared data. *Agent Platform* as a
   managed training environment.
4. **Deploy and predict** — make the trained model available for use. *Agent
   Platform.*
5. **Manage** — maintain models over time: versioning, performance tracking,
   drift monitoring. *Agent Platform Feature Store* for data management,
   *Model Garden* for storage, *Agent Platform Pipelines* for automation.

**Identity and Access Management (IAM)** runs across all of it: create and
manage user accounts, assign roles, grant and revoke permissions to resources,
audit user activity, and monitor your security position.

## Foundation models

Foundation models use deep learning and train on massive datasets, which lets
them learn complex patterns and perform a variety of tasks across domains.
Module 1 covered what makes them flexible and adaptable; this module adds the
two families and the selection criteria.

- **Large language models (LLMs)** — understand and generate human language:
  translation, writing, question answering.
- **Diffusion models** — generate high-quality images, audio, and video by
  **iteratively refining** data and patterns. The iterative refinement is the
  mechanism that distinguishes them, and it's why they dominate image
  generation.

> **Exam note:** the best model type for producing photorealistic images from
> a text description is a **diffusion model**. An LLM is the reflexive wrong
> answer.

**Google Cloud's gen AI models:**

- **Gemini** — multimodal understanding, advanced conversational AI, content
  creation, question answering.
- **Gemma** — lightweight, user-friendly, and customizable; built for local
  deployments and specialized applications.
- **Nano Banana** — generates high-quality images from text descriptions.
- **Veo** — generates video from text descriptions or still images.

### Choosing a model — eight factors

- **Modality** — the data types the model can process and generate.
- **Context window** — how much information the model can consider at once
  when generating a response.
- **Security** — model security features and industry standards, critical with
  sensitive data.
- **Availability and reliability** — uptime guarantees, redundancy, disaster
  recovery for production use.
- **Cost** — pricing model and cost effectiveness; match model size to task
  rather than defaulting to the largest.
- **Performance** — accuracy, speed, efficiency, evaluated on relevant
  benchmarks.
- **Fine-tuning and customization** — whether the model can be specialized.
- **Ease of integration** — well-documented APIs and SDKs, fit with existing
  systems.

## Foundation model limitations

Each limitation traces back to the training data, which is why the fixes in
the next section are all about supplying better or more current information.

- **Data dependency** — performance is bounded by training data quality; bias
  or incompleteness seeps straight into outputs.
- **Knowledge cut-off** — the last date the model saw new information.
  Anything after it simply isn't in the model.
- **Bias** — training data contains societal biases, and subtle ones can be
  *magnified* in outputs rather than merely reproduced.
- **Fairness** — different people interpret it differently, and fairness
  assessments have inherent limits: they typically target specific bias
  categories and can overlook others. The point is that "we tested for
  fairness" is never a complete claim.
- **Hallucinations** — outputs that aren't accurate or grounded in real
  information. The model has no internal signal distinguishing recall from
  invention.
- **Edge cases** — rare or atypical scenarios expose weaknesses, producing
  errors, misinterpretations, and unexpected results.

## Techniques to overcome limitations

Four techniques plus human oversight. They escalate in cost and effort, and
the exam cares about knowing which to reach for when.

- **Prompt engineering** — crafting precise prompts to guide the model toward
  the output you want. Cheapest intervention; try it first.
- **Grounding** — anchoring the model in specific data, such as company
  documents, so responses are accurate, relevant, and enterprise-specific.
  This is the direct fix for hallucinations: instead of relying on what the
  model absorbed during training, you hand it source material at generation
  time, which makes the answer both more accurate and more trustworthy.
- **RAG (retrieval-augmented generation)** — a grounding *method* that uses
  search. Three steps: **retrieve** relevant information from a knowledge base
  by meaning, **augment** the prompt with it, then **generate** the response.
  Covered in full, with the retrieval tooling, in
  [Module 5](</Google GAIL/module-5-genai-agents.md>).
- **Fine-tuning** — further training a foundation model on a new,
  task-specific dataset so it excels in a particular area or output format.
  The heavyweight option, reached for when prompting isn't enough.
- **Humans in the loop (HITL)** — integrating human expertise where judgment
  or context is required. Use cases: content moderation, sensitive
  applications, high-risk decision making. Applied at **pre-generation
  review** and **post-generation review**.

> **Exam note:** the four techniques are **grounding, prompt engineering,
> fine-tuning, and HITL** — distractors offer more compute or better hardware,
> which address speed, not limitation. And fine-tuning is specifically right
> **when prompt engineering alone doesn't achieve the desired outcome and the
> model needs specializing for a task or output format with a new dataset.**

## Building AI securely

The security section reuses the ML lifecycle, applying controls stage by
stage. The logic is that an AI system has more attack surface than a
conventional app — the data, the trained parameters, and the outputs are each
separately worth protecting.

1. **Gather** — secure data is the foundation; protect it at all times and
   control who can access, add to, and input data.
2. **Prepare** — pay special attention to confidential data in the training
   set: anonymization, validation, secure processing, logging, and real-time
   monitoring.
3. **Train** — safeguard both the training data **and the model parameters**
   from unauthorized access or modification. The parameters are the asset
   here, not just the inputs.
4. **Deploy and predict** — control access to the model, and verify sources
   and check for vulnerabilities in any pre-built models you adopt.
5. **Manage** — stay current on best practices, update regularly, monitor
   performance and outputs for anomalies or tampering, and review access
   permissions on a schedule.

Across all stages: guard against adversarial attacks, and monitor outputs to
prevent leaks and harmful content.

**SAIF (Secure AI Framework)** establishes security standards for building and
deploying AI systems responsibly. Google Cloud supports it with
secure-by-design infrastructure, encryption, IAM, Security Command Center, and
monitoring tools. The **Google Threat Intelligence Group**'s global insights
combined with **Mandiant**'s frontline expertise shift protection from reactive
to proactive, AI-driven operational readiness.

> **Exam note:** SAIF's goal is **to establish security standards for building
> and deploying AI responsibly**, addressing threats unique to the AI
> landscape. It is not about restricting innovation, and not solely about
> external attacks. Separately, the key aspect of securing the *training*
> phase is **safeguarding training data and model parameters from unauthorized
> access.**

## Building AI responsibly — four foundations

- **Transparency** — users need to understand how their information is used
  and how the system works.
- **Privacy** — anonymize or pseudonymize data, and safeguard against models
  inadvertently leaking sensitive training data. Note the second half: the
  model itself can be the leak.
- **Data quality, bias, and fairness** — ethical AI requires high-quality data
  and responsible use of it. AI inherits societal biases and produces unfair
  outcomes as a result, so fairness has to be designed in from the start
  rather than audited on at the end.
- **Accountability and explainability** — fairness requires someone
  accountable. Explainable AI makes decision-making transparent and
  understandable, and you need to know how your own application uses and
  interprets the model's output.

> **Exam note:** for an ethically sound AI system — the loan-assessment
> scenario — the two correct actions are **regular audits of model performance
> to identify and mitigate emerging biases** and **training on a diverse
> dataset representing different demographics and socioeconomic backgrounds**.
> Black-box models and unsupervised deployment are the distractors. The
> primary goal of ethical AI development is **to ensure AI systems are used
> responsibly and do not cause harm.**

## Legal implications

Four legal areas carry the risk: **data privacy, non-discrimination,
intellectual property, and product liability.** AI laws require responsible
data handling, bias mitigation, transparency, and model compliance — and the
landscape is still evolving, so trustworthy AI requires ongoing vigilance and
legal counsel rather than a one-time review.

> **Exam note:** the key legal responsibility is adherence to **data privacy
> laws, non-discrimination principles, and the specific licensing terms of AI
> models.** Model licensing is the clause people forget.

[^module2-slides]: [Module 2 slide deck (Generative AI Leader course)](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/genai-leader-module-2-slides.md)

---
type: Study Guide
title: "Gen AI Leader — Module 2: Unlock Foundational Concepts"
description: Exam-prep bullet notes on AI/ML/gen AI definitions, data quality, learning types, foundation models, and secure/responsible AI, from the Google Generative AI Leader certification course.
tags: [google-cloud, generative-ai, certification, study-guide, GAIL]
sources:
  - id: module2-slides
    resource: references/genai-leader-module-2-slides.md
    title: "Module 2 slide deck (Generative AI Leader course)"
generated: { by: claude-code/sonnet-5, at: 2026-09-02T18:55:15Z }
status: draft
---

# Gen AI Leader — Module 2: Unlock Foundational Concepts

## Core definitions

- **AI** — machines doing tasks that normally require human intelligence.
- **ML** — subset of AI; machines learn from data to perform specific
  tasks. Different data → different models.
- **Gen AI** — subset of ML focused on creating new content.
- **Deep learning (DL)** — a ML technique using artificial neural networks;
  networks leverage labeled + unlabeled data (semi-supervised). Powers gen
  AI's ability to create text/image/audio/video content.
- Hierarchy: **AI ⊃ ML ⊃ DL**; gen AI is an application built on DL.

## Data quality — 5 factors

- **Accuracy** — wrong data → wrong patterns → faulty predictions.
- **Completeness** — dataset size/representation must be sufficient.
- **Representative** — must be inclusive, or outcomes get skewed/biased.
- **Consistency** — inconsistent formats/labeling confuses the model.
- **Relevance** — data must fit the task.

## Data accessibility — 3 factors

- **Availability** — no data, no training.
- **Cost** — high-quality data acquisition can be a major barrier.
- **Format** — must be in a format the model can process.

## Data types

- **Structured** — organized, easily searchable (IDs, dates, costs).
- **Unstructured** — no predefined structure, messy (free-text feedback,
  images, email content).

## Types of machine learning

- **Supervised** — trained on **labeled** data; learns input→output
  mapping. Example: spam classifier.
- **Unsupervised** — trained on **unlabeled** data; finds natural groupings/
  structure. Example: topic modeling.
- **Reinforcement** — learns via interaction + reward/penalty feedback;
  maximizes cumulative reward. Example: game-playing agent.
- Google Cloud examples: predictive maintenance = supervised (Agent
  Platform); anomaly detection = unsupervised (BigQuery ML); product
  recommendations = reinforcement (Agent Platform).

## ML lifecycle stages (Google Cloud tools)

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

## Foundation models

- Deep-learning models trained on massive datasets; broad understanding
  across domains, not just one task.
- **LLMs** — understand/generate language (translate, write, answer
  questions).
- **Diffusion models** — generate images/audio/video via iterative
  refinement.
- Google Cloud's models: **Gemini** (multimodal, conversational, content
  creation), **Gemma** (lightweight, customizable, local/specialized
  deployment), **Nano Banana** (text→image), **Veo** (text/image→video).

## Choosing a model — 8 factors

Modality · Context window · Security · Availability & reliability · Cost ·
Performance · Fine-tuning/customization · Ease of integration.

## Foundation model limitations

- **Data dependency** — output quality tied to training data quality.
- **Knowledge cut-off** — last date the model saw new training data.
- **Bias** — inherited from training data, can be magnified in outputs.
- **Fairness** — subjective; assessments only cover specific bias
  categories, may miss others.
- **Hallucinations** — outputs not grounded in real information. Fix:
  grounding.
- **Edge cases** — rare scenarios expose model weaknesses.

## Techniques to overcome limitations

- **Prompt engineering** — crafting precise prompts to guide output.
- **Grounding** — anchoring responses in specific data (e.g. company docs).
- **RAG** — grounding via search: retrieve (by meaning) → augment prompt →
  generate.
- **Fine-tuning** — further train a foundation model on a task-specific
  dataset; use when prompt engineering alone isn't enough.
- **Humans in the loop (HITL)** — content moderation, sensitive
  applications, high-risk decisions; applied pre- and post-generation.

## Secure AI — lifecycle controls

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

## Responsible AI — 4 foundations

- **Transparency** — users understand how data is used and how the system
  works.
- **Privacy** — anonymize/pseudonymize data; prevent models leaking
  training data.
- **Data quality, bias, fairness** — ethical AI needs quality data;
  models inherit societal bias, so fairness must be designed in.
- **Accountability & explainability** — explainable AI makes decisions
  understandable; know how your app uses/interprets model output.

## Legal implications

- Key areas: **data privacy, non-discrimination, intellectual property,
  product liability**.
- AI laws require responsible data handling, bias mitigation, transparency,
  model compliance, and attention to model licensing terms.

## Exam-style Q&A drawn from module quizzes

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

[^module2-slides]: [Module 2 slide deck (Generative AI Leader course)](references/genai-leader-module-2-slides.md)

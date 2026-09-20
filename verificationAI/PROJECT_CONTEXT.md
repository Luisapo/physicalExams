Read PROJECT_CONTEXT.md and inspect the current project.

This project is an insurance verification copilot.
PROJECT_CONTEXT.md contains the department rules and architecture
we established previously.

Do not change existing department rules without asking me.

First inspect the existing rule modules and tests and tell me
whether the implementation matches PROJECT_CONTEXT.md.

After that, we are continuing with the AI interpreter layer.

# Insurance Verification Copilot

## Project Purpose

This project is an internal Insurance Verification Copilot designed to assist insurance verifiers.

The system does NOT replace the verifier.

The system:

1. Interprets insurance call transcripts.
2. Extracts structured facts.
3. Applies department rules.
4. Identifies missing information.
5. Suggests follow-up questions.
6. Produces verification template values.
7. Produces EMR copay box values.

The goal is to replicate experienced verifier reasoning and reduce training time for new employees.

---

# Architecture

The project follows a strict separation:

TRANSCRIPT
↓
AI Interpreter
↓
Structured Verification Object
↓
Rule Engine
↓
Verification Results

The AI must NEVER determine final benefits.

The AI only extracts facts.

All business logic belongs in the rule engine.

---

# Current Rule Modules

Completed:

- sickRules.js
- serviceRules.js
- cobRules.js
- hsaHraRules.js
- copayBoxRules.js
- verificationEngine.js

All modules have passing tests.

---

# Department Terminology

## SICK

Amount patient pays for office visit.

Possible forms:

### Copay

Examples:

30.00
45.00
60.00

Represents fixed amount.

### Coinsurance

Examples:

80/20
90/10
70/30

Format:

INSURANCE/PATIENT

80/20 means:

Insurance pays 80%
Patient pays 20%

### Deductible

Examples:

30.00 AFTER DED
80/20 AFTER DED
0.00 AFTER DED

0.00 AFTER DED means:

Covered at 100% after deductible.

---

# SICK Rules

Examples:

30.00

30.00 AFTER DED

80/20

80/20 AFTER DED

0.00 AFTER DED

COVERED AT 100%

The rule engine determines formatting.

The AI interpreter should only provide facts.

---

# Surgery / Diagnostic Labs

Department rule:

Experienced verifiers frequently inherit benefits from SICK.

Examples:

80/20 AFTER DED

→ Surgery inherits
→ Diagnostic Labs inherit

No additional question required.

---

If SICK is a fixed copay:

Example:

30.00

The verifier must determine:

Is Surgery covered under the office visit copay?

OR

Does Surgery have an additional benefit?

Same rule for Diagnostic Labs.

---

# Department Rule

If Surgery or Diagnostic Labs are covered under the office visit benefit:

Output:

COVERED UNDER OV

OV = Office Visit

---

# Department Rule

If office visit copay exceeds $99:

Output:

{amount} MAX ALLOWED TO BE CHARGED PER VISIT ADDTL TO OV

Reason:

Clinic policy prevents charging more than procedure cost.

Examples:

120.00 office visit copay

Procedure:

120 MAX ALLOWED TO BE CHARGED PER VISIT ADDTL TO OV

---

# COB

COB = Coordination of Benefits

Different from Other Insurance.

Other Insurance:
Tracks additional coverage.

COB:
Tracks whether patient must update coordination information.

---

# COB Rules

If representative states patient must update COB:

REQ

---

If representative states COB is updated:

NOT REQ

Examples:

Updated today

Updated 3 months ago

Updated recently

---

If insurance is secondary:

NOT REQ

---

If patient has active additional insurance:

NOT REQ

Examples:

Commercial
AHCCCS
Medicare
Advantage

---

If representative cannot see COB:

Verifier must ask:

"If the patient does not have another insurance, do they need to update COB?"

---

If COB update older than 6 months:

Must ask:

"Does the patient currently need to update COB if they do not have another insurance?"

Older than 6 months does NOT automatically mean REQ.

---

# HSA

Health Savings Account

Output:

HSA

No balance required.

No funds inquiry required.

---

# HRA

Health Reimbursement Account

Balance matters.

Threshold:

$90.00

If balance < 90:

No special handling.

If balance >= 90:

Must determine:

Who gets billed?

Options:

- Patient
- Insurance/HRA

---

If Insurance/HRA gets billed:

EMR Copay Box override:

0.00

SICK DOES NOT CHANGE.

---

Example:

SICK = 30.00

HRA = $500

Insurance billed

Result:

SICK = 30.00

EMR Copay Box = 0.00

---

# EMR Copay Box

The EMR Copay Box is operational.

It does NOT change insurance benefits.

---

# Copay Box Rules

## Fixed Copay

30.00

Copay Box:

30.00

---

## Covered At 100%

Copay Box:

0.00

---

## Deductible Applies

If deductible not met:

Copay Box:

90.00

Examples:

30.00 AFTER DED

80/20 AFTER DED

0.00 AFTER DED

Deductible NOT met

→ Copay Box = 90.00

---

## Deductible Met

30.00 AFTER DED

→ Copay Box = 30.00

---

0.00 AFTER DED

→ Copay Box = 0.00

---

80/20 AFTER DED

→ Copay Box = 20%

---

90/10 AFTER DED

→ Copay Box = 10%

---

## Coinsurance Without Deductible

80/20

→ Copay Box = 20%

90/10

→ Copay Box = 10%

70/30

→ Copay Box = 30%

The EMR stores percentage.

Not a dollar amount.

---

## OOP Met

If patient currently has 100% coverage due to Out-of-Pocket Maximum being satisfied:

Copay Box:

0.00

---

# Verification Engine

verificationEngine.js coordinates all modules.

Dependencies:

SICK
↓
SURGERY
↓
DX LABS

COB

HSA/HRA
↓
EMR COPAY BOX

---

The engine returns:

- template values
- EMR values
- follow-up questions
- readiness status

ready = true

Means:

Verification can be completed.

ready = false

Means:

Additional information required.

---

# AI Interpreter Requirements

The AI does NOT determine benefits.

The AI only extracts facts.

The AI should output structured JSON.

Example:

{
  "sick": {
    "type": "coinsurance",
    "patientPercent": 20,
    "deductibleApplies": true
  }
}

NOT:

{
  "sick": "80/20 AFTER DED"
}

The rule engine determines:

80/20 AFTER DED

---

# AI Evidence Requirement

Every extracted fact should include supporting evidence.

Example:

{
  "patientPercent": 20,
  "evidence": [
    "member responsible for twenty percent after deductible"
  ]
}

Purpose:

- auditing
- transcript review
- caption error detection

---

# Future Roadmap

Phase 1
✓ Rule Engine

Phase 2
→ interpreterSchema.js

Phase 3
→ aiInterpreter.js

Phase 4
→ Transcript-to-Verification pipeline

Phase 5
→ Live caption integration

Phase 6
→ Internal deployment

---

# Important Rule

Do NOT modify department rules without user approval.

When uncertain:

Ask before changing logic.

The goal is to preserve department behavior exactly.
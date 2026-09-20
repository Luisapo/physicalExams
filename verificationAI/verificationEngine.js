// verificationAI/verificationEngine.js

import { determineSick } from "./rules/sickRules.js";
import { determineServiceBenefit } from "./rules/serviceRules.js";
import { determineCOB } from "./rules/cobRules.js";
import { determineHsaHra } from "./rules/hsaHraRules.js";
import { determineCopayBox } from "./rules/copayBoxRules.js";


export function analyzeVerification(input) {

  // ==========================================================
  // 1. SICK
  // ==========================================================

  const sick =
    determineSick(input.sick);


  // ==========================================================
  // 2. SURGERY
  //
  // This receives the completed SICK result because Surgery
  // may inherit its benefit.
  // ==========================================================

  const surgery =
    determineServiceBenefit(
      input.surgery,
      sick
    );


  // ==========================================================
  // 3. DIAGNOSTIC LABS
  // ==========================================================

  const dxLabs =
    determineServiceBenefit(
      input.dxLabs,
      sick
    );


  // ==========================================================
  // 4. COB
  // ==========================================================

  const cob =
    determineCOB(input.cob);


  // ==========================================================
  // 5. HSA / HRA
  // ==========================================================

  const hsaHra =
    determineHsaHra(input.hsaHra);


  // ==========================================================
  // 6. EMR COPAY BOX
  //
  // This is calculated LAST because it can depend on:
  //
  // - SICK
  // - deductible status
  // - OOP status
  // - HRA override
  // ==========================================================

  const copayBox =
    determineCopayBox({
      sickResult: sick,
      deductibleMet: input.accumulators?.deductibleMet ?? null,
      oopMet: input.accumulators?.oopMet ?? null,
      hraResult: hsaHra
    });


  // ==========================================================
  // 7. DETERMINE WHETHER VERIFICATION NEEDS ATTENTION
  // ==========================================================

  const fields = {
    sick,
    surgery,
    dxLabs,
    cob,
    hsaHra,
    copayBox
  };


  const needsAttention =
    Object.values(fields).some(field =>
      field.status === "INCOMPLETE" ||
      field.status === "REVIEW"
    );


  // ==========================================================
  // 8. COLLECT FOLLOW-UP QUESTIONS
  //
  // Eventually these are what our live copilot can show
  // before the verifier hangs up.
  // ==========================================================

  const followUps =
    Object.entries(fields)
      .filter(([_, field]) => field.followUp)
      .map(([fieldName, field]) => ({
        field: fieldName,
        question: field.followUp
      }));


  // ==========================================================
  // 9. FINAL RESULT
  // ==========================================================

  return {

    ready:
      !needsAttention,

    fields,

    followUps,

    template: {
      sick: sick.value,
      surgery: surgery.value,
      dxLabs: dxLabs.value,
      cob: cob.value,
      hsaHra: hsaHra.value
    },

    emr: {
      copayBox: copayBox.value
    }

  };
}
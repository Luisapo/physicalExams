// verificationAI/rules/sickRules.js

export function determineSick(sick) {
  if (!sick) {
    return {
      status: "NOT_DISCUSSED",
      value: null,
      followUp: null,
      reason: "SICK benefit was not discussed."
    };
  }

  const {
    type,
    copayAmount,
    patientPercent,
    deductibleApplies,
    afterDeductible,
    coveredAt100
  } = sick;

  // ---------------------------------------
  // 1. REGULAR COPAY
  // ---------------------------------------

  if (type === "copay") {

    if (copayAmount == null) {
      return {
        status: "INCOMPLETE",
        value: null,
        followUp: "What is the office visit copay?",
        reason: "A copay was mentioned but no amount was established."
      };
    }

    // Copay + deductible
    if (deductibleApplies === true) {
      return {
        status: "CONFIRMED",
        value: `${Number(copayAmount).toFixed(2)} AFTER DED`,
        followUp: null,
        reason: `The office visit has a $${Number(copayAmount).toFixed(2)} copay after deductible.`
      };
    }

    return {
      status: "CONFIRMED",
      value: Number(copayAmount).toFixed(2),
      followUp: null,
      reason: `The office visit has a $${Number(copayAmount).toFixed(2)} copay.`
    };
  }


  // ---------------------------------------
  // 2. COINSURANCE
  // ---------------------------------------

  if (type === "coinsurance") {

    if (patientPercent == null) {
      return {
        status: "INCOMPLETE",
        value: null,
        followUp: "What percentage is the patient responsible for?",
        reason: "Coinsurance was mentioned but the patient's percentage was not established."
      };
    }

    const patient = Number(patientPercent);
    const insurance = 100 - patient;

    if (deductibleApplies === true) {
      return {
        status: "CONFIRMED",
        value: `${insurance}/${patient} AFTER DED`,
        followUp: null,
        reason: `Patient responsibility is ${patient}% after deductible.`
      };
    }

    if (deductibleApplies === false) {
      return {
        status: "CONFIRMED",
        value: `${insurance}/${patient}`,
        followUp: null,
        reason: `Patient responsibility is ${patient}% and deductible does not apply.`
      };
    }

    return {
      status: "INCOMPLETE",
      value: `${insurance}/${patient}`,
      followUp: "Does the deductible apply to the office visit coinsurance?",
      reason: "Coinsurance is known, but deductible applicability was not established."
    };
  }


  // ---------------------------------------
  // 3. DEDUCTIBLE ONLY
  // ---------------------------------------

  if (type === "deductible") {

    if (!afterDeductible) {
      return {
        status: "INCOMPLETE",
        value: null,
        followUp: "What is the patient's responsibility after the deductible has been met?",
        reason: "The deductible applies, but the benefit after deductible was not established."
      };
    }

    // Covered 100% after deductible
    if (afterDeductible.type === "covered100") {
      return {
        status: "CONFIRMED",
        value: "0.00 AFTER DED",
        followUp: null,
        reason: "The deductible applies and the plan pays 100% after deductible."
      };
    }

    // Coinsurance after deductible
    if (afterDeductible.type === "coinsurance") {

      if (afterDeductible.patientPercent == null) {
        return {
          status: "INCOMPLETE",
          value: null,
          followUp: "What percentage is the patient responsible for after deductible?",
          reason: "Coinsurance applies after deductible, but the percentage is missing."
        };
      }

      const patient = Number(afterDeductible.patientPercent);
      const insurance = 100 - patient;

      return {
        status: "CONFIRMED",
        value: `${insurance}/${patient} AFTER DED`,
        followUp: null,
        reason: `After deductible, the patient is responsible for ${patient}%.`
      };
    }

    // Copay after deductible
    if (afterDeductible.type === "copay") {

      if (afterDeductible.amount == null) {
        return {
          status: "INCOMPLETE",
          value: null,
          followUp: "What is the copay after the deductible has been met?",
          reason: "A copay applies after deductible, but the amount is missing."
        };
      }

      return {
        status: "CONFIRMED",
        value: `${Number(afterDeductible.amount).toFixed(2)} AFTER DED`,
        followUp: null,
        reason: `After deductible, the patient has a $${Number(afterDeductible.amount).toFixed(2)} copay.`
      };
    }
  }


  // ---------------------------------------
  // 4. COVERED AT 100%
  // ---------------------------------------

  if (type === "covered100" || coveredAt100 === true) {

    if (deductibleApplies === true) {
      return {
        status: "CONFIRMED",
        value: "0.00 AFTER DED",
        followUp: null,
        reason: "The plan covers the office visit at 100% after deductible."
      };
    }

    return {
      status: "CONFIRMED",
      value: "COVERED AT 100%",
      followUp: null,
      reason: "The office visit is covered at 100%."
    };
  }


  // ---------------------------------------
  // UNKNOWN
  // ---------------------------------------

  return {
    status: "INCOMPLETE",
    value: null,
    followUp: "What does the patient have to pay for an office visit with their PCP?",
    reason: "The SICK benefit could not be determined."
  };
}
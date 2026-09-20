// verificationAI/rules/serviceRules.js

export function determineServiceBenefit(service, sickResult) {
  if (!service) {
    return {
      status: "NOT_DISCUSSED",
      source: null,
      value: null,
      followUp: null,
      reason: "The service benefit was not discussed and could not be derived."
    };
  }

  const {
    explicitlyDiscussed = false,
    type,
    copayAmount,
    patientPercent,
    deductibleApplies,
    sameAsOfficeVisit,
    additionalToOfficeVisit,
    frequency
  } = service;


  // ==========================================================
  // 1. NOT EXPLICITLY DISCUSSED
  //    Try to derive the benefit from SICK.
  // ==========================================================

  if (!explicitlyDiscussed) {

    if (!sickResult || sickResult.status !== "CONFIRMED") {
      return {
        status: "INCOMPLETE",
        source: "DERIVED",
        value: null,
        followUp:
          "The office visit benefit is incomplete, so this service benefit cannot be determined yet.",
        reason:
          "This service may inherit the SICK benefit, but SICK has not been confirmed."
      };
    }


    // Coinsurance can be inherited directly.
    //
    // Examples:
    // SICK 80/20 AFTER DED → SERVICE 80/20 AFTER DED
    // SICK 70/30 → SERVICE 70/30

    if (/^\d+\/\d+( AFTER DED)?$/.test(sickResult.value)) {
      return {
        status: "CONFIRMED",
        source: "DERIVED",
        value: sickResult.value,
        followUp: null,
        reason:
          `The service inherits the confirmed office visit coinsurance: ${sickResult.value}.`
      };
    }


    // 0.00 AFTER DED means the office visit is covered
    // at 100% after deductible.
    //
    // For Surgery / DX Labs, department wording becomes:
    // COVERED UNDER OV AFTER DED

    if (sickResult.value === "0.00 AFTER DED") {
      return {
        status: "CONFIRMED",
        source: "DERIVED",
        value: "COVERED UNDER OV AFTER DED",
        followUp: null,
        reason:
          "SICK is covered at 100% after deductible, so this service is covered under the office visit benefit after deductible."
      };
    }


    // IMPORTANT:
    // A regular office visit copay cannot automatically
    // establish the Surgery / DX Lab benefit.
    //
    // Example:
    // SICK = 30.00
    //
    // We still need to know whether the service is:
    // - covered under that $30
    // - another $30
    // - or has a completely different benefit.

    if (/^\d+\.\d{2}$/.test(sickResult.value)) {
      return {
        status: "INCOMPLETE",
        source: null,
        value: null,
        followUp:
          `If the patient has this service during the office visit, is it covered under the ${sickResult.value} office visit copay, or is there an additional benefit?`,
        reason:
          "A fixed office visit copay does not automatically establish the service benefit."
      };
    }


    // SICK covered at 100% with no deductible.
    // We should NOT silently assume the service is also free.

    if (sickResult.value === "COVERED AT 100%") {
      return {
        status: "INCOMPLETE",
        source: null,
        value: null,
        followUp:
          "If this service is done during the office visit, is it covered under the office visit benefit or does it have a separate benefit?",
        reason:
          "The office visit is covered at 100%, but the service benefit was not established."
      };
    }


    return {
      status: "INCOMPLETE",
      source: null,
      value: null,
      followUp:
        "What does the patient have to pay for this service when performed in office with the PCP and billed with an office visit?",
      reason:
        "The service benefit could not be safely derived from SICK."
    };
  }


  // ==========================================================
  // 2. REP EXPLICITLY SAYS SERVICE IS COVERED UNDER OV
  // ==========================================================

  if (sameAsOfficeVisit === true && additionalToOfficeVisit === false) {

    const afterDed =
      sickResult?.value?.includes("AFTER DED") ||
      deductibleApplies === true;

    return {
      status: "CONFIRMED",
      source: "DIRECT",
      value: afterDed
        ? "COVERED UNDER OV AFTER DED"
        : "COVERED UNDER OV",
      followUp: null,
      reason:
        "The representative confirmed that this service is covered under the office visit benefit."
    };
  }


  // ==========================================================
  // 3. COINSURANCE
  // ==========================================================

  if (type === "coinsurance") {

    if (patientPercent == null) {
      return {
        status: "INCOMPLETE",
        source: "DIRECT",
        value: null,
        followUp:
          "What percentage is the patient responsible for this service?",
        reason:
          "Coinsurance was mentioned, but the patient's percentage was not established."
      };
    }

    const patient = Number(patientPercent);
    const insurance = 100 - patient;

    if (deductibleApplies === true) {
      return {
        status: "CONFIRMED",
        source: "DIRECT",
        value: `${insurance}/${patient} AFTER DED`,
        followUp: null,
        reason:
          `The representative confirmed ${patient}% patient coinsurance after deductible for this service.`
      };
    }

    if (deductibleApplies === false) {
      return {
        status: "CONFIRMED",
        source: "DIRECT",
        value: `${insurance}/${patient}`,
        followUp: null,
        reason:
          `The representative confirmed ${patient}% patient coinsurance and deductible does not apply.`
      };
    }

    return {
      status: "INCOMPLETE",
      source: "DIRECT",
      value: `${insurance}/${patient}`,
      followUp:
        "Does the deductible apply to this service coinsurance?",
      reason:
        "The service coinsurance is known, but deductible applicability was not established."
    };
  }


  // ==========================================================
  // 4. SERVICE COPAY
  // ==========================================================

  if (type === "copay") {

    if (copayAmount == null) {
      return {
        status: "INCOMPLETE",
        source: "DIRECT",
        value: null,
        followUp:
          "What is the copay amount for this service?",
        reason:
          "A service copay was mentioned but the amount was not established."
      };
    }

    const copay = Number(copayAmount);


    // ----------------------------------------------------------
    // $0 / covered at 100%
    // ----------------------------------------------------------

    if (copay === 0) {
      return {
        status: "CONFIRMED",
        source: "DIRECT",
        value:
          deductibleApplies === true
            ? "COVERED UNDER OV AFTER DED"
            : "COVERED UNDER OV",
        followUp: null,
        reason:
          "The service has no separate patient copay under the office visit."
      };
    }


    // ----------------------------------------------------------
    // Greater than $99
    //
    // Department rule:
    // automatically use MAX ALLOWED wording.
    // No per-visit/per-service follow-up needed.
    // ----------------------------------------------------------

    if (copay > 99) {
      return {
        status: "CONFIRMED",
        source: "DEPARTMENT_RULE",
        value:
          `${copay.toFixed(2)} MAX ALLOWED TO BE CHARGED PER VISIT ADDTL TO OV`,
        followUp: null,
        reason:
          "The service copay is greater than $99, so the department maximum-charge rule applies."
      };
    }


    // ----------------------------------------------------------
    // Rep confirms it is NOT additional.
    // ----------------------------------------------------------

    if (additionalToOfficeVisit === false) {
      return {
        status: "CONFIRMED",
        source: "DIRECT",
        value:
          deductibleApplies === true
            ? "COVERED UNDER OV AFTER DED"
            : "COVERED UNDER OV",
        followUp: null,
        reason:
          "The representative confirmed that the service does not create an additional copay beyond the office visit."
      };
    }


    // ----------------------------------------------------------
    // We know there IS an additional copay,
    // but still need frequency.
    // ----------------------------------------------------------

    if (additionalToOfficeVisit === true) {

      if (frequency === "per_visit") {
        return {
          status: "CONFIRMED",
          source: "DIRECT",
          value:
            `${copay.toFixed(2)} PER VISIT ADDTL TO OV`,
          followUp: null,
          reason:
            "The representative confirmed an additional service copay per visit."
        };
      }


      if (frequency === "per_service") {
        return {
          status: "CONFIRMED",
          source: "DIRECT",
          value:
            `${copay.toFixed(2)} PER SERVICE ADDTL TO OV`,
          followUp: null,
          reason:
            "The representative confirmed an additional copay for each service."
        };
      }


      return {
        status: "INCOMPLETE",
        source: "DIRECT",
        value: `${copay.toFixed(2)} ADDTL TO OV`,
        followUp:
          "Is that additional copay charged per visit or per service?",
        reason:
          "An additional service copay was confirmed, but its frequency was not established."
      };
    }


    // ----------------------------------------------------------
    // We have a copay but don't know whether it is included
    // in the OV copay or additional.
    // ----------------------------------------------------------

    return {
      status: "INCOMPLETE",
      source: "DIRECT",
      value: copay.toFixed(2),
      followUp:
        `If the patient has an office visit and this service on the same day, is the ${copay.toFixed(2)} covered under the office visit copay or charged additionally?`,
      reason:
        "The service copay is known, but we do not know whether it is additional to the office visit."
    };
  }


  // ==========================================================
  // 5. EXPLICIT COVERED AT 100%
  // ==========================================================

  if (type === "covered100") {
    return {
      status: "CONFIRMED",
      source: "DIRECT",
      value:
        deductibleApplies === true
          ? "COVERED UNDER OV AFTER DED"
          : "COVERED UNDER OV",
      followUp: null,
      reason:
        "The representative confirmed that the service is covered at 100% under the office visit."
    };
  }


  // ==========================================================
  // UNKNOWN
  // ==========================================================

  return {
    status: "INCOMPLETE",
    source: null,
    value: null,
    followUp:
      "What does the patient have to pay for this service when performed in office with the PCP and billed with an office visit?",
    reason:
      "The service benefit could not be determined."
  };
}
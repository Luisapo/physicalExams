// verificationAI/rules/copayBoxRules.js

export function determineCopayBox({
  sickResult,
  deductibleMet = null,
  oopMet = null,
  hraResult = null
}) {

  // ==========================================================
  // 1. SICK MUST BE CONFIRMED FIRST
  // ==========================================================

  if (!sickResult || sickResult.status !== "CONFIRMED") {
    return {
      status: "INCOMPLETE",
      value: null,
      reason:
        "SICK must be confirmed before the EMR Copay Box can be determined."
    };
  }


  // ==========================================================
  // 2. OOP SATISFIED / 100% COVERAGE
  //
  // This should only be true when we know the consequence
  // is that the patient is currently covered at 100%.
  // ==========================================================

  if (oopMet === true) {
    return {
      status: "CONFIRMED",
      value: "0.00",
      reason:
        "The applicable out-of-pocket maximum has been satisfied and the patient is currently covered at 100%."
    };
  }


  // ==========================================================
  // 3. HRA OVERRIDE
  //
  // IMPORTANT:
  // This changes the EMR Copay Box only.
  // It does NOT change SICK.
  // ==========================================================

  if (hraResult?.emrOverride === "0.00") {
    return {
      status: "CONFIRMED",
      value: "0.00",
      reason:
        "The HRA/insurance is billed for the office visit, so the patient should not be charged in the EMR Copay Box."
    };
  }


  const sick = sickResult.value;

  const subjectToDeductible =
    sick.includes("AFTER DED");


  // ==========================================================
  // 4. BENEFIT IS SUBJECT TO DEDUCTIBLE
  // ==========================================================

  if (subjectToDeductible) {

    // --------------------------------------------------------
    // Deductible has NOT been met.
    //
    // Department rule:
    // EMR Copay Box = $90.00
    // --------------------------------------------------------

    if (deductibleMet === false) {
      return {
        status: "CONFIRMED",
        value: "90.00",
        reason:
          "The office visit is still subject to an unmet deductible, so the department $90.00 Copay Box rule applies."
      };
    }


    // --------------------------------------------------------
    // We don't know whether deductible has been met.
    //
    // Do NOT guess $90.
    // --------------------------------------------------------

    if (deductibleMet == null) {
      return {
        status: "INCOMPLETE",
        value: null,
        reason:
          "The SICK benefit applies after deductible, but we do not know whether the deductible has been met."
      };
    }


    // --------------------------------------------------------
    // Deductible HAS been met.
    //
    // Now use the post-deductible benefit.
    // --------------------------------------------------------

    if (deductibleMet === true) {

      // 0.00 AFTER DED
      if (sick === "0.00 AFTER DED") {
        return {
          status: "CONFIRMED",
          value: "0.00",
          reason:
            "The deductible has been met and the plan covers the office visit at 100% afterward."
        };
      }


      // Fixed copay AFTER DED
      //
      // Example:
      // 30.00 AFTER DED
      if (/^\d+\.\d{2} AFTER DED$/.test(sick)) {

        const copay =
          sick.replace(" AFTER DED", "");

        return {
          status: "CONFIRMED",
          value: copay,
          reason:
            `The deductible has been met, so the post-deductible office visit copay of $${copay} applies.`
        };
      }


      // Coinsurance AFTER DED
      //
      // Example:
      // 80/20 AFTER DED
      //
      // A percentage does not give us an exact dollar
      // amount to place into the EMR Copay Box.
      if (/^\d+\/\d+ AFTER DED$/.test(sick)) {

  const coinsurance =
    sick.replace(" AFTER DED", "");

  const patientPercent =
    coinsurance.split("/")[1];

  return {
    status: "CONFIRMED",
    value: `${patientPercent}%`,
          reason:
            "The deductible has been met and SICK is coinsurance. The exact patient charge cannot be calculated from the percentage alone."
        };
      }
    }
  }


  // ==========================================================
  // 5. REGULAR FIXED COPAY — NO DEDUCTIBLE
  //
  // Example:
  // SICK = 30.00
  // Copay Box = 30.00
  // ==========================================================

  if (/^\d+\.\d{2}$/.test(sick)) {
    return {
      status: "CONFIRMED",
      value: sick,
      reason:
        `The office visit has a fixed copay of $${sick}.`
    };
  }


  // ==========================================================
  // 6. COVERED AT 100% — NO DEDUCTIBLE
  // ==========================================================

  if (sick === "COVERED AT 100%") {
    return {
      status: "CONFIRMED",
      value: "0.00",
      reason:
        "The office visit is currently covered at 100%."
    };
  }


  // ==========================================================
  // 7. COINSURANCE WITHOUT DEDUCTIBLE
  //
  // We know the percentage but not the actual dollar amount.
  // ==========================================================

  if (/^\d+\/\d+$/.test(sick)) {
     const patientPercent =
    sick.split("/")[1];

  return {
    status: "CONFIRMED",
    value: `${patientPercent}%`,
      reason:
        "SICK is coinsurance. The exact patient charge cannot be calculated from the percentage alone."
    };
  }


  // ==========================================================
  // 8. FALLBACK
  // ==========================================================

  return {
    status: "REVIEW",
    value: null,
    reason:
      "The EMR Copay Box could not be safely determined from the available information."
  };
}
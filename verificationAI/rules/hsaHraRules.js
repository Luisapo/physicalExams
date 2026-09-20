// verificationAI/rules/hsaHraRules.js

export function determineHsaHra(account) {

  if (!account || account.discussed === false) {
    return {
      status: "NOT_DISCUSSED",
      value: null,
      emrOverride: null,
      followUp: null,
      reason: "HSA/HRA was not discussed."
    };
  }

  const {
    type = "unknown",
    balance = null,
    billedTo = null
  } = account;


  // ==========================================================
  // 1. NO HSA / HRA
  // ==========================================================

  if (type === "none") {
    return {
      status: "CONFIRMED",
      value: "NONE",
      emrOverride: null,
      followUp: null,
      reason: "The representative confirmed there is no HSA or HRA."
    };
  }


  // ==========================================================
  // 2. HSA
  //
  // Department rule:
  // Record HSA.
  // We do NOT need to obtain the HSA balance.
  // ==========================================================

  if (type === "hsa") {
    return {
      status: "CONFIRMED",
      value: "HSA",
      emrOverride: null,
      followUp: null,
      reason:
        "The patient has an HSA. HSA balance is not required."
    };
  }


  // ==========================================================
  // 3. HRA
  // ==========================================================

  if (type === "hra") {

    // --------------------------------------------------------
    // We need the HRA balance first.
    // --------------------------------------------------------

    if (balance == null) {
      return {
        status: "INCOMPLETE",
        value: "HRA",
        emrOverride: null,
        followUp:
          "How much is currently available in the HRA?",
        reason:
          "An HRA was identified, but the available balance was not established."
      };
    }

    const hraBalance = Number(balance);


    // --------------------------------------------------------
    // Balance <= $90
    //
    // No special EMR Copay Box override.
    // --------------------------------------------------------

    if (hraBalance < 90) {
      return {
        status: "CONFIRMED",
        value: "HRA",
        emrOverride: null,
        followUp: null,
        reason:
          `The HRA balance is $${hraBalance.toFixed(2)}, so the HRA billing override does not apply.`
      };
    }


    // --------------------------------------------------------
    // Balance > $90
    //
    // We MUST establish who is billed.
    // --------------------------------------------------------

    if (billedTo == null) {
      return {
        status: "INCOMPLETE",
        value: "HRA",
        emrOverride: null,
        followUp:
          "Who will be billed for the office visit: the insurance/HRA or the patient?",
        reason:
          `The HRA has $${hraBalance.toFixed(2)} available, which is more than $90.00, so billing responsibility must be established.`
      };
    }


    // --------------------------------------------------------
    // Insurance / HRA gets billed
    //
    // SICK DOES NOT CHANGE.
    // Only EMR Copay Box gets overridden to 0.00.
    // --------------------------------------------------------

    if (
      billedTo === "insurance" ||
      billedTo === "hra"
    ) {
      return {
        status: "CONFIRMED",
        value: "HRA",
        emrOverride: "0.00",
        followUp: null,
        reason:
          "The HRA has more than $90.00 available and the insurance/HRA is billed, so the EMR Copay Box should be 0.00."
      };
    }


    // --------------------------------------------------------
    // Patient gets billed
    //
    // Use normal SICK / Copay Box logic.
    // --------------------------------------------------------

    if (billedTo === "patient") {
      return {
        status: "CONFIRMED",
        value: "HRA",
        emrOverride: null,
        followUp: null,
        reason:
          "The patient is billed directly, so normal SICK and EMR Copay Box rules apply."
      };
    }


    return {
      status: "INCOMPLETE",
      value: "HRA",
      emrOverride: null,
      followUp:
        "Who will be billed for the office visit: the insurance/HRA or the patient?",
      reason:
        "The HRA billing responsibility could not be determined."
    };
  }


  // ==========================================================
  // 4. REP CANNOT DETERMINE / UNKNOWN
  //
  // Very important:
  // UNKNOWN must never silently become NONE.
  // ==========================================================

  return {
    status: "INCOMPLETE",
    value: null,
    emrOverride: null,
    followUp:
      "Does the patient have an HSA or HRA?",
    reason:
      "HSA/HRA information could not be determined."
  };
}
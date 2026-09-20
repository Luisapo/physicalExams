// verificationAI/rules/cobRules.js

export function determineCOB(cob) {

  if (!cob || cob.discussed === false) {
    return {
      status: "NOT_DISCUSSED",
      value: null,
      followUp: null,
      reason: "COB was not discussed."
    };
  }

  const {
    patientNeedsUpdate = null,
    currentPlanSecondary = false,
    otherInsurance = "unknown",
    otherInsuranceInactive = false,
    lastUpdatedMonthsAgo = null,
    lastUpdatedDate = null,
    repCanSeeCOB = true
  } = cob;


  // ==========================================================
  // 1. REP EXPLICITLY SAYS PATIENT MUST UPDATE COB
  // ==========================================================

  if (patientNeedsUpdate === true) {
    return {
      status: "CONFIRMED",
      value: "REQ",
      followUp: null,
      reason:
        "The representative confirmed that the patient needs to update COB."
    };
  }


  // ==========================================================
  // 2. CURRENT PLAN IS SECONDARY
  // ==========================================================

  if (currentPlanSecondary === true) {
    return {
      status: "CONFIRMED",
      value: "NOT REQ",
      followUp: null,
      reason:
        "The representative confirmed that the current insurance is secondary."
    };
  }


  // ==========================================================
  // 3. PATIENT HAS OTHER INSURANCE
  //
  // Important:
  // OTHER INS and COB are different concepts.
  //
  // If another ACTIVE insurance exists → NOT REQ.
  //
  // We must NOT let AI determine whether another insurance
  // is active unless that fact is explicitly known.
  // ==========================================================

  if (
    otherInsurance === "yes" &&
    otherInsuranceInactive === false
  ) {
    return {
      status: "CONFIRMED",
      value: "NOT REQ",
      followUp: null,
      reason:
        "Another insurance was reported, so COB does not require an update under the department rule."
    };
  }


  // ==========================================================
  // 4. OTHER INSURANCE IS KNOWN TO BE INACTIVE
  //
  // Having an inactive policy does NOT let us automatically
  // conclude NOT REQ.
  // ==========================================================

  if (
    otherInsurance === "yes" &&
    otherInsuranceInactive === true
  ) {
    return {
      status: "INCOMPLETE",
      value: null,
      followUp:
        "The other insurance is inactive. Does the patient need to update COB with this plan?",
      reason:
        "The usual other-insurance exception cannot be used because the other coverage is inactive."
    };
  }


  // ==========================================================
  // 5. REP EXPLICITLY SAYS UPDATE IS NOT REQUIRED
  // ==========================================================

  if (patientNeedsUpdate === false) {

    let value = "NOT REQ";

    if (lastUpdatedDate) {
      value += `, ${lastUpdatedDate}`;
    }

    return {
      status: "CONFIRMED",
      value,
      followUp: null,
      reason:
        "The representative confirmed that a COB update is not currently required."
    };
  }


  // ==========================================================
  // 6. REP CANNOT SEE COB
  //
  // This is NOT the same as NOT REQ.
  // ==========================================================

  if (repCanSeeCOB === false) {
    return {
      status: "INCOMPLETE",
      value: null,
      followUp:
        "If the patient does not have another insurance, do they need to update COB?",
      reason:
        "The representative cannot see COB information, so update requirements still need to be established."
    };
  }


  // ==========================================================
  // 7. COB WAS UPDATED RECENTLY
  //
  // Department rule:
  // an update within 6 months → NOT REQ.
  // ==========================================================

  if (
    lastUpdatedMonthsAgo != null &&
    lastUpdatedMonthsAgo <= 6
  ) {

    let value = "NOT REQ";

    if (lastUpdatedDate) {
      value += `, ${lastUpdatedDate}`;
    }

    return {
      status: "CONFIRMED",
      value,
      followUp: null,
      reason:
        "COB was updated within the last six months."
    };
  }


  // ==========================================================
  // 8. COB UPDATE OLDER THAN 6 MONTHS
  //
  // IMPORTANT:
  // >6 months does NOT automatically mean REQ.
  // It means ASK.
  // ==========================================================

  if (
    lastUpdatedMonthsAgo != null &&
    lastUpdatedMonthsAgo > 6
  ) {
    return {
      status: "INCOMPLETE",
      value: null,
      followUp:
        "Does the patient currently need to update COB if they do not have another insurance?",
      reason:
        "The last COB update is more than six months old, so current update requirements must be confirmed."
    };
  }


  // ==========================================================
  // 9. COB DISCUSSED, BUT WE STILL DON'T HAVE AN ANSWER
  // ==========================================================

  return {
    status: "INCOMPLETE",
    value: null,
    followUp:
      "Does the patient currently need to update COB if they do not have another insurance?",
    reason:
      "COB was discussed, but whether an update is required was not established."
  };
}
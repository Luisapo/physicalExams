const dateBirthInput = document.getElementById("dateOfBirth");
const DOS = document.getElementById("dateOfService");
const dateVerified = document.getElementById("verificationDate");
const lastPhysicalServiceDate = document.getElementById("lastPhysicalDone");
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(nextDay.getDate() + 1);
const formattedNextDay = nextDay.toISOString().substring(0, 10);
const submitButton = document.getElementsByClassName("submit");
const extractDOBandDOS = document.getElementById("extractDOBandDOS");
const undoButton = document.getElementById("undoButton");
const verificationAndPE = document.getElementsByClassName("copyBothTextBoxes");
let textBoxes = document.getElementsByClassName("output");
const resetButtons = document.getElementsByClassName("reset");
const radioAHCCCS = document.getElementById("AHCCCS");
const radioAHCCCSVerification = document.getElementById("AHCCCSVerification");
const radioMedicare = document.getElementById("medicarePartB");
const medicareGcodes = document.getElementById("assignGcode");
const medicareGcodeButtons = document.querySelectorAll(
  '.radioStyle input[type="radio"]',
);
const radioMedicareVerification = document.getElementById(
  "medicarePartBVerification",
);
const radioMedicareReplacement = document.getElementById("medicareReplacement");
//const radioMedicareReplacementVerification = document.getElementById('medicareReplacementVerification');
const radioCommerical = document.getElementById("commercial");
const radioCommericalVerification = document.getElementById(
  "commercialVerification",
);
let textBox = document.getElementById("output");
const verificationTemplateOptions = document.querySelectorAll(
  'input[name="checkboxes"]',
);
const templateContents = document.querySelectorAll('[id^="template"]');
const getInitials = document.getElementById("initals");
const ahcccsInputBoxes = document.getElementById("verification1");
const medicareInputBoxes = document.getElementById("verification2");
const replacementInputBoxes = document.getElementById("verification3");
const commericalInputBoxes = document.getElementById("verification4");
const newPatientCheckLabel = document.getElementById("newPatient");
const newPatientCheckCheckBox = document.getElementById("autoEligible");

// ahcccs input boxes
const effectiveDateInput = document.getElementById("effectiveDate");
const sickInput = document.getElementById("sick");
const otherInsuranceInput = document.getElementById("otherInsurance");
const spokeInput = document.getElementById("spoke");
const pcpInput = document.getElementById("primaryCarePhysician");
const mercyCareOptions = document.getElementById("mercyCare");
const mercyCareCheck = document.getElementById("mercyCarePlan");
const mercyCarelabel = document.getElementById("mercyCarelabel");
const rateGroupInput = document.getElementById("mercyCareAdditional");
const uhcTag = document.getElementById("uhcCommunity");
const uhcCheckBox = document.getElementById("uhcCommunityPlan");
const otherInsNoneButton = document.querySelectorAll(".otherInsNone");
const zeroSickButton = document.getElementById("copayZero");
const threeSickButton = document.getElementById("copayThree");
const fourSickButton = document.getElementById("copayFour");

// medicare input boxes
const effectiveDateInputTwo = document.getElementById("effectiveDate2");
const coinsInput2 = document.getElementById("coins2");
const dedInputTwo = document.getElementById("ded2");
const dedMetInputTwo = document.getElementById("dedMet2");
const ineligibleInput = document.getElementById("ineligiblePeriod");
const otherInsTwoInput = document.getElementById("otherIns2");
const spokeInputTwo = document.getElementById("spoke2");
const uhcDualCheck = document.getElementById("uhcDual");
const uhcDualCheckBox = document.getElementById("uhcDualplan");
const goldKidneyLabel = document.getElementById("goldKidney");
const goldKidneyCheckbox = document.getElementById("goldKidneySelection");

// medicare advantage input boxes
const contractedInputThree = document.getElementById("contracted3");
const effectiveDateInputThree = document.getElementById("effectiveDate3");
const planInputThree = document.getElementById("plan3");
const groupInputThree = document.getElementById("group3");
const sickInputThree = document.getElementById("sick3");
const dedinputThree = document.getElementById("ded3");
const otherInsThree = document.getElementById("otherIns3");
const verifiedOnlineInputThree = document.getElementById("verifiedOnline3");
const pcpInputThree = document.getElementById("primaryCarePhysician3");

//commercial input boxes

const contractedInputFour = document.getElementById("contracted4");
const sickInputFour = document.getElementById("sick4");
const hsahraInputFour = document.getElementById("hsahra4");
const telehealthInputFour = document.getElementById("telehealth4");
const pExamsInputFour = document.getElementById("pExams4");
const proceduresInputFour = document.getElementById("procedures4");
const labsInputFour = document.getElementById("labs4");
const immunizationsInputFour = document.getElementById("immunizations4");
const spokeInputFour = document.getElementById("spoke4");
const referenceInputFour = document.getElementById("reference4");
const effectiveDateInputFour = document.getElementById("effectiveDate4");
const planTypeInputFour = document.getElementById("planType4");
const networkInputFour = document.getElementById("plan4");
const primarycareCommericalInputFour = document.getElementById(
  "primarycareCommerical4",
);
const otherIns4Input = document.getElementById("otherIns4");
const policyHolderInputFour = document.getElementById("policyHolder4");
const groupInputFour = document.getElementById("group4");
const oopInputFour = document.getElementById("oop4");
const oopMetInputFour = document.getElementById("oopMet4");
const deductibleInputFour = document.getElementById("deductible4");
const dedMetInputFour = document.getElementById("dedMet4");
const claimAddressInputFour = document.getElementById("claimAddress4");
const payorIDInputFour = document.getElementById("payorID4");
const verifiedOnlineInputFour = document.getElementById("verifiedOnline4");
const theCOB = document.getElementById("askCOB");
const monthlyBenefits = document.getElementById("monthly-benefits");
const monthlyBenefitsCheckBox = document.getElementById("monthlyBenefits");
const acaExchangeStandardHealthCheckbox = document.getElementById(
  "acaExchangeStandardHealth",
);
const chatSection = document.querySelector(".chatQuestionsSection");
const cptChecker = document.getElementById("dobForCPT");

let dobString = "";

cptChecker.addEventListener("input", function () {
  let input = this.value;
  if (input.length > 30) {
    // makes sure length does not exceed 10
    this.value = input.substring(0, 10);
    return;
  }

  input = input.replace(/\s*\D\s*/g, ""); // Only allow numbers

  if (input.length > 1) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  } else if (input.length > 2) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
  this.value = input;
  dobString = this.value;
});

otherInsNoneButton[0].addEventListener("click", () => {
  otherInsuranceInput.value = "NONE";
});

otherInsNoneButton[1].addEventListener("click", () => {
  otherInsThree.value = "NONE";
});

zeroSickButton.addEventListener("click", () => {
  sickInput.value = "0.00";
});

threeSickButton.addEventListener("click", () => {
  sickInput.value = "3.40";
});

fourSickButton.addEventListener("click", () => {
  sickInput.value = "4.00";
});

//-------------------Date Of birth Formatting--------------------//

dateBirthInput.addEventListener("input", function () {
  let input = this.value;
  if (input.length > 30) {
    // makes sure length does not exceed 10
    this.value = input.substring(0, 10);
    return;
  }

  input = input.replace(/\s*\D\s*/g, ""); // Only allow numbers

  if (input.length > 1) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  } else if (input.length > 2) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
  this.value = input;
  dateOfBirthValue = this.value;
});

//-------------------Last PE Done Formatting--------------------//

lastPhysicalServiceDate.addEventListener("input", function () {
  let input = this.value;
  if (input.length > 30) {
    this.value = input.substring(0, 10);
    return;
  }

  input = input.replace(/\s*\D\s*/g, "");

  if (input.length > 1) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  } else if (input.length > 2) {
    input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
  this.value = input;
  lastPEValue = this.value;
});

//-------------------Allows the box content to be completely selected--------------------//
dateBirthInput.addEventListener("focus", function () {
  this.select();
});

lastPhysicalServiceDate.addEventListener("focus", function () {
  this.select();
});

//-------------------For patient less than 2 years old--------------------//

const calculateAgeInMonths = (birthdate) => {
  const birthDate = new Date(birthdate);
  const lastPE = new Date(lastPEValue);
  const [year, month, day] = DOS.value.split("-");
  const dateOfServiceValue = new Date(year, month - 1, day);
  const oneDay = 24 * 60 * 60 * 1000;

  const ageInMilliseconds = dateOfServiceValue - birthDate;

  const ageInDays = ageInMilliseconds / oneDay;

  let totalMonthsLastPE = (lastPE - birthDate) / (oneDay * 30.4);

  if (totalMonthsLastPE > 0.7 && totalMonthsLastPE < 0.99) {
    totalMonthsLastPE = Math.ceil((lastPE - birthDate) / (oneDay * 30.4));
  } else {
    totalMonthsLastPE = Math.floor((lastPE - birthDate) / (oneDay * 30.4));
  }
  getNextPhysicalExamination(ageInMilliseconds, totalMonthsLastPE, birthDate);
};

const getNextPhysicalExamination = (
  ageInMilliseconds,
  lastPhysicalAge,
  birthDate,
) => {
  textBox.value = "";

  const schedule = [1, 2, 4, 6, 9, 12, 15, 18, 24]; // The schedule for physical examinations

  let nextIndex = schedule.findIndex((months) => months > lastPhysicalAge); // Find the index of the next scheduled examination

  if (nextIndex === -1) {
    return moreThanTwoLessThanTwotwo(birthDate);
  }
  const nextPhysicalAge = schedule[nextIndex];

  const [year, month, day] = DOS.value.split("-");
  const dateOfServiceValue = new Date(year, month - 1, day);

  const nextExaminationDate = new Date(birthDate);
  nextExaminationDate.setMonth(
    nextExaminationDate.getMonth() + nextPhysicalAge,
  );

  const [month2, day2, year2] = lastPEValue.split("/");
  const lastExaminationDate = new Date(year2, month2 - 1, day2);

  if (
    dateOfServiceValue >= nextExaminationDate &&
    dateOfServiceValue > lastExaminationDate
  ) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    dateOfServiceValue > lastExaminationDate &&
    dateOfServiceValue < nextExaminationDate
  ) {
    textBox.value += ` PE: ELIGIBLE (ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextExaminationDate.toLocaleDateString()})`;
  } else {
    textBox.value += ` Recheck Dates!`;
  }
};

document.querySelectorAll(".color-picker").forEach((button) => {
  button.addEventListener("click", () => {
    const bg = button.dataset.bg;
    document.documentElement.style.setProperty("--bg-gradient", bg);
  });
});

const savedBg = localStorage.getItem("bg");
if (savedBg) {
  document.documentElement.style.setProperty("--bg-gradient", savedBg);
}

document.querySelectorAll(".color-picker").forEach((button) => {
  button.addEventListener("click", () => {
    const bg = button.dataset.bg;
    document.documentElement.style.setProperty("--bg-gradient", bg);
    localStorage.setItem("bg", bg);
  });
});

const calculateAgeInMonthsCommerical = (birthdate) => {
  const birthDate = new Date(birthdate);
  const lastPE = new Date(lastPEValue);
  const dateOfServiceValue = new Date(DOS.value);
  const oneDay = 24 * 60 * 60 * 1000;

  const ageInMilliseconds = dateOfServiceValue - birthDate;

  const ageInDays = Math.floor(ageInMilliseconds / oneDay);

  const totalMonthsLastPE = Math.floor((lastPE - birthDate) / (oneDay * 30.4));
  getNextPhysicalExaminationCommercial(ageInDays, totalMonthsLastPE, birthDate);
};

const getNextPhysicalExaminationCommercial = (
  totalDays,
  lastPhysicalAge,
  birthDate,
) => {
  textBox.value = "";

  const schedule = [1, 2, 4, 6, 9, 12, 15, 18, 24]; // The schedule for physical examinations

  let nextIndex = schedule.findIndex((months) => months > lastPhysicalAge); // Find the index of the next scheduled examination

  if (nextIndex === -1) {
    return (textBox.value += "Recheck Dates!");
  }
  const nextPhysicalAge = schedule[nextIndex]; // Check at which the next examination is due

  if (totalDays > nextPhysicalAge * 30.33) {
    // If the patient is already eligible for the next examination, return the date
    textBox.value += ` PE: ELIGIBLE (W/O OV)`;
  } else {
    const nextExaminationDate = new Date(birthDate);
    nextExaminationDate.setMonth(
      nextExaminationDate.getMonth() + nextPhysicalAge,
    );
    textBox.value += ` PE: ELIGIBLE (ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextExaminationDate.toLocaleDateString()}.)`;
  }
};

//-------------------For patient less than 22 years old / Also used for Medicare Part B / Also used for Commercial over 2 y/o--------------------//

const moreThanTwoLessThanTwotwo = (birthDate) => {
  textBox.value = "";
  const lastPE = new Date(lastPEValue);
  const lastPEYear = lastPE.getFullYear();
  const nextPEYear = lastPE.getFullYear() + 1;
  const lastPEMonth = lastPE.getMonth() + 1;
  const lastPEDay = lastPE.getDate();
  const birthMonth = birthDate.getMonth() + 1;
  const birthMonthFormatted = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const birthYear = birthDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const newDateOfService = new Date(DOS.value);
  const dateOfService = DOS.value;
  const dateOfServiceFormattted = new Date(dateOfService);
  const dateOfServiceFormatttedActualDate = dateOfServiceFormattted.setDate(
    dateOfServiceFormattted.getDate() + 1,
  );
  const dateOfServiceDayArray = dateOfService.split("-");
  const dateOfServiceYear = parseInt(dateOfServiceDayArray[0]);
  const dateOfServiceMonth = parseInt(dateOfServiceDayArray[1]);
  const dateOfServiceDay = parseInt(dateOfServiceDayArray[2]);
  const timeDifference = newDateOfService - lastPE;
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

  let nextEligibleDate = "";
  if (
    lastPEYear <= currentYear &&
    ((lastPEMonth < birthMonth &&
      (lastPEDay < birthDay || lastPEMonth === birthMonth)) ||
      dateOfServiceMonth < birthMonthFormatted ||
      (dateOfServiceMonth === birthMonthFormatted &&
        dateOfServiceDay <= birthDay))
  ) {
    nextEligibleDate = new Date(currentYear, birthMonth - 1, birthDay);
  } else {
    nextEligibleDate = new Date(nextPEYear, birthMonth - 1, birthDay);
  }

  if (timeDifference > oneYearInMilliseconds) {
    //Last PE more than a year ago
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    lastPEMonth < birthMonth &&
    lastPEDay < birthDay &&
    lastPEYear < currentYear
  ) {
    // last PE month, day less then DOB and done last year
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    lastPEYear === currentYear &&
    birthMonth < dateOfServiceMonth &&
    lastPEMonth < birthMonth
  ) {
    //last PE done current year and PE month before DOB
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    lastPEYear === currentYear &&
    birthMonth === dateOfServiceMonth &&
    birthDay < dateOfServiceDay &&
    lastPEMonth < birthMonth
  ) {
    //last PE done current year and PE month before DOB
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    lastPEYear === currentYear &&
    lastPEMonth === birthMonth &&
    lastPEDay < birthDay &&
    dateOfServiceDay > birthDay
  ) {
    //last PE done current year and PE donde in curreny month and pt had DOB
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    dateOfServiceYear === lastPEYear &&
    birthMonth < dateOfServiceMonth &&
    lastPEMonth < dateOfServiceMonth &&
    birthMonth === lastPEMonth &&
    birthDay > lastPEDay
  ) {
    // last PE done current year but pt has had birthday already this year and date of service is after birthday
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    dateOfServiceYear > lastPEYear &&
    birthMonth > lastPEMonth &&
    birthMonth > lastPEMonth &&
    lastPEMonth > dateOfServiceMonth &&
    lastPEDay > birthDay &&
    lastPEDay > dateOfServiceDay
  ) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    lastPEYear < currentYear &&
    lastPEMonth < birthMonth &&
    lastPEMonth === birthMonth &&
    lastPEDay < birthDay
  ) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    dateOfServiceYear > lastPEYear &&
    birthMonth === lastPEMonth &&
    birthDay > lastPEDay &&
    birthYear < dateOfServiceYear
  ) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (nextEligibleDate > dateOfServiceFormatttedActualDate) {
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()})`;
  } else if (nextEligibleDate <= dateOfServiceFormatttedActualDate) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (
    (currentYear > lastPEYear || currentYear === lastPEYear) &&
    (lastPEMonth < birthMonth || lastPEMonth === birthMonth) &&
    lastPEDay <= birthDay
  ) {
    nextEligibleDate.setFullYear(currentYear + 1);
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()})`;
  } else {
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()})`;
  }
};

//-------------------For patient more than 21 years old--------------------//

const Overtwentyone = () => {
  textBox.value = "";
  const lastPE = new Date(lastPEValue);
  const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
  const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;
  const dateOfService = new Date(DOS.value) - lastPE;

  if (timeDifference > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else if (dateOfService > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/ OV)`;
  } else {
    const nextEligibleDate = new Date(lastPE);
    nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

    nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

    const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, "0");
    const day = nextEligibleDate.getDate().toString().padStart(2, "0");
    const year = nextEligibleDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate})`;
  }
};

const OvertwentyoneCommerical = () => {
  textBox.value = "";
  const lastPE = new Date(lastPEValue);
  const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
  const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;
  const dateOfService = new Date(DOS.value) - lastPE;
  //    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/O OV)`;
  } else if (dateOfService > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/O OV)`;
  } else {
    const nextEligibleDate = new Date(lastPE);
    nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

    nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

    const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, "0");
    const day = nextEligibleDate.getDate().toString().padStart(2, "0");
    const year = nextEligibleDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate})`;
  }
};

const medicarePartBPhysical = () => {
  textBox.value = "";
  const lastPE = new Date(lastPEValue);
  const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
  const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;
  const dateOfService = new Date(DOS.value) - lastPE;
  //    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/ OV) ${selectedRadioButton}`;
  } else if (dateOfService > oneYearInMilliseconds) {
    textBox.value += ` PE: ELIGIBLE (W/ OV) ${selectedRadioButton}`;
  } else {
    const nextEligibleDate = new Date(lastPE);
    nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

    nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

    const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, "0");
    const day = nextEligibleDate.getDate().toString().padStart(2, "0");
    const year = nextEligibleDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    textBox.value += ` PE: ALREADY (DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate} ${selectedRadioButton})`;
  }
};
//---------------------------Beginning of AHCCCS Section----------------------------------//

const ahcccsPE = () => {
  const birthDate = new Date(dateOfBirthValue);
  const oneDay = 24 * 60 * 60 * 1000;
  const ageInMilliseconds = currentDate - birthDate;
  const ageInDays = Math.floor(ageInMilliseconds / oneDay);
  const age = ageInDays / 30.4 / 12;

  if (age < 3) {
    calculateAgeInMonths(birthDate);
  } else if (age < 21) {
    moreThanTwoLessThanTwotwo(birthDate);
  } else {
    Overtwentyone();
  }
};

//------------------------------End of AHCCCS Section----------------------------------//

//------------------------------Beginning of Medicare Replacement Section----------------------------------//

const replacementPE = () => {
  textBox.value = "";
  const lastPE = new Date(lastPEValue);
  const lastPEYear = lastPE.getFullYear();
  const currentYear = currentDate.getFullYear();
  if (lastPEYear === currentYear) {
    textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON 01/01/${
      currentYear + 1
    } ${selectedRadioButton}`;
  } else if (lastPEYear < currentYear) {
    textBox.value += ` PE: ELIGIBLE W/ OV ${selectedRadioButton}`;
  } else {
    textBox.value += ` Recheck Dates!`;
  }
};
//------------------------------End of Medicare ReplacementSection----------------------------------//

//------------------------------Beginning of Commerical Insurance----------------------------------//

const commercialPE = () => {
  const birthDate = new Date(dateOfBirthValue);
  const oneDay = 24 * 60 * 60 * 1000;
  const ageInMilliseconds = currentDate - birthDate;
  const ageInDays = Math.floor(ageInMilliseconds / oneDay);
  const age = ageInDays / 30.4 / 12;

  if (age < 2) {
    calculateAgeInMonthsCommerical(birthDate);
  } else {
    OvertwentyoneCommerical();
  }
};

//------------------------------End of Commerical Insurance----------------------------------//

//-------------------Default Value for Date of service--------------------//

DOS.value = formattedNextDay;
dateVerified.value = currentDate.toISOString().substring(0, 10);

//-------------------Special radio features--------------------//

radioAHCCCS.addEventListener("change", () => {
  if (radioAHCCCS.checked) {
    cleanSlatePE();
    goldKidneyClean();
    textBox.placeholder = "";
    newPatientCheckCheckBox.checked = false;
    newPatientCheckLabel.style.display = "block";
    extractDOBandDOS.textContent = "Extract DOB and DOS";
    medicareGcodes.style.display = "none";
    goldKidneyLabel.style.display = "none";
    goldKidneyCheckbox.checked = false;
  }
});

radioMedicare.addEventListener("change", () => {
  if (radioMedicare.checked) {
    cleanSlatePE();
    goldKidneyClean();
    extractDOBandDOS.textContent = "Extract DOS";
    newPatientCheckLabel.style.display = "none";
    goldKidneyLabel.style.display = "none";
    goldKidneyCheckbox.checked = false;
    dateBirthInput.classList.add("greyedOut");
    dateBirthInput.value = "01/01/1900";
    dateBirthInput.readOnly = true;
    medicareGcodes.style.display = "block";
    textBox.value = "";
    textBox.placeholder =
      "Remember to check correct GCODE for PE in Noridian or medical summary.";
    if (selectedRadioButton === "G0402") {
      lastPhysicalServiceDate.classList.add("greyedOut");
      lastPhysicalServiceDate.value = "01/01/1900";
      lastPEValue = "01/01/1900";
      lastPhysicalServiceDate.readOnly = true;
    }
  }
});

radioMedicareReplacement.addEventListener("change", () => {
  if (radioMedicareReplacement.checked) {
    cleanSlatePE();
    extractDOBandDOS.textContent = "Extract DOS";
    newPatientCheckLabel.style.display = "none";
    goldKidneyLabel.style.display = "block";
    goldKidneyCheckbox.checked = false;
    dateBirthInput.classList.add("greyedOut");
    dateBirthInput.value = "01/01/1900";
    dateBirthInput.readOnly = true;
    medicareGcodes.style.display = "block";
    textBox.value = "";
    textBox.placeholder =
      "Remember to check correct GCODE for PE in Noridian or medical summary.";
    if (selectedRadioButton === "G0402") {
      lastPhysicalServiceDate.classList.add("greyedOut");
      lastPhysicalServiceDate.value = "01/01/1900";
      lastPEValue = "01/01/1900";
      lastPhysicalServiceDate.readOnly = true;
    }
  }
});

radioCommerical.addEventListener("change", () => {
  if (radioCommerical.checked) {
    cleanSlatePE();
    goldKidneyClean();
    textBox.placeholder = "";
    extractDOBandDOS.textContent = "Extract DOB and DOS";
    newPatientCheckCheckBox.checked = false;
    newPatientCheckLabel.style.display = "block";
    goldKidneyLabel.style.display = "none";
    goldKidneyCheckbox.checked = false;
    medicareGcodes.style.display = "none";
  }
});

goldKidneyCheckbox.addEventListener("change", () => {
  if (goldKidneyCheckbox.checked) {
    contractedInputThree.value = "Out of Network";
    sickInputThree.value = "80/20% | Preventive Care(PE): 80/20%";
    pcpInputThree.value = "Not Required";
    contractedInputThree.readOnly = true;
    sickInputThree.readOnly = true;
    pcpInputThree.readOnly = true;
    contractedInputThree.classList.add("greyedOut");
    sickInputThree.classList.add("greyedOut");
    pcpInputThree.classList.add("greyedOut");
  } else {
    goldKidneyClean();
  }
});

uhcDualCheckBox.addEventListener("change", () => {
  if (uhcDualCheckBox.checked) {
    sickInputThree.value = "80/20 after ded";
    groupInputThree.value = "AZMCARE";
  } else {
    sickInputThree.value = "";
    groupInputThree.value = "";
  }
});

function goldKidneyClean() {
  contractedInputThree.value = "";
  sickInputThree.value = "";
  pcpInputThree.value = "";
  contractedInputThree.readOnly = false;
  sickInputThree.readOnly = false;
  pcpInputThree.readOnly = false;
  contractedInputThree.classList.remove("greyedOut");
  sickInputThree.classList.remove("greyedOut");
  pcpInputThree.classList.remove("greyedOut");
}

const monthlyNeededBenis = document.querySelectorAll(".sameMonthActive");
const noneNeededBenis = document.querySelectorAll(".sameMonthNotNeeded");

monthlyBenefitsCheckBox.addEventListener("change", () => {
  if (monthlyBenefitsCheckBox.checked) {
    contractedInputFour.placeholder = "If left blank,it will not show";
    sickInputFour.placeholder = "If left blank,it will not show";
    dedMetInputFour.placeholder = "If left blank,it will not show";
    deductibleInputFour.placeholder = "If left blank,it will not show";

    noneNeededBenis.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    noneNeededBenis.forEach((element) => {
      element.style.display = "block";
    });
    contractedInputFour.placeholder = "";
    sickInputFour.placeholder = "";
    dedMetInputFour.placeholder = "";
    deductibleInputFour.placeholder = "";
  }
});

//-------------------Sumbit data values for results--------------------//

for (let i = 0; i < verificationAndPE.length; i++) {
  verificationAndPE[i].addEventListener("click", () => {
    if (
      otherInsuranceInput.value === "CHECK MANUALLY" ||
      otherInsTwoInput.value === "CHECK MANUALLY" ||
      otherInsThree.value === "CHECK MANUALLY"
    ) {
      otherInsuranceInput.style.backgroundColor = "red";
      otherInsTwoInput.style.backgroundColor = "red";
      otherInsThree.style.backgroundColor = "red";

      setTimeout(() => {
        otherInsuranceInput.style.backgroundColor = "";
        otherInsTwoInput.style.backgroundColor = "";
        otherInsThree.style.backgroundColor = "";
        otherIns4Input.style.backgroundColor = "";
      }, 1000);

      return (textBoxes[1].value = "Check manually!");
    }

    if (pcpInput.value === "CHANGE") {
      pcpInput.style.backgroundColor = "purple";
      setTimeout(() => {
        pcpInput.style.backgroundColor = "";
      }, 1000);
    }

    if (
      verificationAndPE[i] === verificationAndPE[0] ||
      verificationAndPE[i] === verificationAndPE[1]
    ) {
      textBox.style.color = "black";
      textBoxes[1].style.color = "black";

      if (
        dateOfBirthChecker(dateBirthInput.value) === true &&
        dateOfBirthChecker(lastPhysicalServiceDate.value) === true &&
        dateValidation(dateBirthInput.value) === true &&
        dateValidation(lastPhysicalServiceDate.value) === true
      ) {
        if (radioAHCCCS.checked && ahcccsInputBoxes.checked) {
          ahcccsPE();
          AHCCCSVerification();
          textBox.value = textBoxes[1].value + textBox.value;
          textBoxes[1].value = textBox.value;
        } else if (radioMedicare.checked && medicareInputBoxes.checked) {
          medicarePartBPhysical();
          medicareVerification();
          textBox.value = textBoxes[1].value + textBox.value;
          textBoxes[1].value = textBox.value;
        } else if (
          radioMedicareReplacement.checked &&
          replacementInputBoxes.checked &&
          goldKidneyCheckbox.checked
        ) {
          medicarePartBPhysical();
          replacementVerification();
          textBox.value = textBoxes[1].value + textBox.value;
          textBoxes[1].value = textBox.value;
        } else if (
          radioMedicareReplacement.checked &&
          replacementInputBoxes.checked
        ) {
          replacementPE();
          replacementVerification();
          textBox.value = textBoxes[1].value + textBox.value;
          textBoxes[1].value = textBox.value;
        } else if (radioCommerical.checked && commericalInputBoxes.checked) {
          commercialPE();
          commercialVerificationText();
          textBox.value = textBoxes[1].value + textBox.value;
          textBoxes[1].value = textBox.value;
        } else {
          textBox.style.color = "red";
          textBox.value = "Insurances Do not Match";
          textBoxes[1].value = "";
          textBoxes[1].style.color = "red";
          textBoxes[1].value = "Insurances Do not Match";
          return;
        }
      } else {
        textBox.value = "";
        textBox.style.color = "red";
        return (textBox.value = "Check dates!");
      }

      textBoxes[i].select();
      document.execCommand("copy");
      textBoxes[1].setSelectionRange(0, 0);

      verificationAndPE[0].innerText = "Copied";
      verificationAndPE[0].style.color = "#ffffff";
      verificationAndPE[0].style.background = "#32936f";
      verificationAndPE[1].innerText = "Copied";
      verificationAndPE[1].style.color = "#ffffff";
      verificationAndPE[1].style.background = "#32936f";
      setTimeout(() => {
        verificationAndPE[0].innerText = "Verifcation+PE";
        verificationAndPE[0].style.background =
          "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)";
        verificationAndPE[0].style.color = "#000000";
        verificationAndPE[1].innerText = "Verifcation+PE";
        verificationAndPE[1].style.background =
          "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)";
        verificationAndPE[1].style.color = "#000000";
      }, 1000);
    }
  });
}

for (let i = 0; i < submitButton.length; i++) {
  submitButton[i].addEventListener("click", () => {
    if (submitButton[i] === submitButton[0]) {
      textBox.style.color = "black";

      if (
        dateOfBirthChecker(dateBirthInput.value) === true &&
        dateOfBirthChecker(lastPhysicalServiceDate.value) === true &&
        dateValidation(dateBirthInput.value) === true &&
        dateValidation(lastPhysicalServiceDate.value) === true
      ) {
        if (radioAHCCCS.checked) {
          ahcccsPE();
        } else if (radioMedicare.checked) {
          medicarePartBPhysical();
        } else if (
          radioMedicareReplacement.checked &&
          goldKidneyCheckbox.checked
        ) {
          medicarePartBPhysical();
        } else if (radioMedicareReplacement.checked) {
          replacementPE();
        } else if (radioCommerical.checked) {
          commercialPE();
        } else {
          textBox.value = "";
          textBox.style.color = "red";
          textBox.value = "Please choose an insurance type.";
        }
      } else {
        textBox.value = "";
        textBox.style.color = "red";
        return (textBox.value = "Check dates!");
      }
    } else if (submitButton[i] === submitButton[1]) {
      textBoxes[1].style.color = "black";

      if (
        otherInsuranceInput.value === "CHECK MANUALLY" ||
        otherInsTwoInput.value === "CHECK MANUALLY" ||
        otherInsThree.value === "CHECK MANUALLY"
      ) {
        otherInsuranceInput.style.backgroundColor = "red";
        otherInsTwoInput.style.backgroundColor = "red";
        otherInsThree.style.backgroundColor = "red";

        setTimeout(() => {
          otherInsuranceInput.style.backgroundColor = "";
          otherInsTwoInput.style.backgroundColor = "";
          otherInsThree.style.backgroundColor = "";
        }, 1000);

        return (textBoxes[1].value = "Check manually!");
      }

      if (ahcccsInputBoxes.checked) {
        AHCCCSVerification();
      } else if (medicareInputBoxes.checked) {
        medicareVerification();
      } else if (replacementInputBoxes.checked) {
        replacementVerification();
      } else if (commericalInputBoxes.checked) {
        commercialVerificationText();
      } else {
        textBoxes[1].value = "";
        textBoxes[1].style.color = "red";
        textBoxes[1].value = "Please choose an insurance type.";
      }

      if (pcpInput.value === "CHANGE") {
        pcpInput.style.backgroundColor = "purple";
        setTimeout(() => {
          pcpInput.style.backgroundColor = "";
        }, 1000);
      }

      textBoxes[i].select();
      document.execCommand("copy");
      textBoxes[1].setSelectionRange(0, 0);

      submitButton[1].innerText = "Copied";
      submitButton[1].style.color = "#ffffff";
      submitButton[1].style.background = "#32936f";
      setTimeout(() => {
        submitButton[1].innerText = "Submit";
        submitButton[1].style.background =
          "linear-gradient(to bottom, #7892c2 5%, #476e9e 100%)";
        submitButton[1].style.color = "#ffffff";
      }, 1000);
    }
  });
}

const autoFormatEffectiveDate = (inputElement) => {
  inputElement.addEventListener("blur", () => {
    inputElement.value = formatDate(inputElement.value.trim());
  });
};
autoFormatEffectiveDate(effectiveDateInput);
autoFormatEffectiveDate(effectiveDateInputTwo);
autoFormatEffectiveDate(effectiveDateInputThree);
autoFormatEffectiveDate(effectiveDateInputFour);

for (let i = 0; i < resetButtons.length; i++) {
  if (resetButtons[i] === resetButtons[0]) {
    resetButtons[i].addEventListener("click", () => {
      location.reload();
    });
  } else if (resetButtons[i] === resetButtons[1]) {
    resetButtons[i].addEventListener("click", () => {
      textBoxes[0].value = "";
      textBoxes[1].value = "";
      otherInsuranceInput.style.backgroundColor = "";
      let inputs = [
        effectiveDateInput.value,
        effectiveDateInputTwo.value,
        effectiveDateInputThree.value,
        effectiveDateInputFour.value,
      ];
      if (inputs.every((input) => input === "")) {
      } else {
        getLastValuesEntered();
      }
      resetInputValues();
      if (
        (radioAHCCCS.checked || radioCommerical.checked) &&
        !newPatientCheckCheckBox.checked
      ) {
        cleanSlatePE();
      }
    });
  }
}

// Set up a function to reset the input boxes
const originalValues = {
  // ahcccs input boxes
  effectiveDate: effectiveDateInput.value,
  sick: sickInput.value,
  otherInsuranceInput: otherInsuranceInput.value,
  spoke: spokeInput.value,
  primaryCarePhysician: pcpInput.value,
  rateGroup: rateGroupInput.value,

  // medicare input boxes
  effectiveDateTwo: effectiveDateInputTwo.value,
  coins2: coinsInput2.value,
  ded2: dedInputTwo.value,
  dedMet2: dedMetInputTwo.value,
  ineligiblePeriod: ineligibleInput.value,
  otherInsTwoInput: otherInsTwoInput.value,
  spokeTwo: spokeInputTwo.value,

  // medicare input boxes
  contractedThree: contractedInputThree.value,
  effectiveDateThree: effectiveDateInputThree.value,
  planThree: planInputThree.value,
  groupThree: groupInputThree.value,
  sickThree: sickInputThree.value,
  verifiedOnlineThree: verifiedOnlineInputThree.value,
  primaryCarePhysicianThree: pcpInputThree.value,

  // commercial input boxes
  contractedFour: contractedInputFour.value,
  sickFour: sickInputFour.value,
  hsahraFour: hsahraInputFour.value,
  telehealthFour: telehealthInputFour.value,
  pExamsFour: pExamsInputFour.value,
  proceduresFour: proceduresInputFour.value,
  labsFour: labsInputFour.value,
  immunizationsFour: immunizationsInputFour.value,
  spokeFour: spokeInputFour.value,
  referenceFour: referenceInputFour.value,
  effectiveDateFour: effectiveDateInputFour.value,
  planTypeFour: planTypeInputFour.value,
  networkFour: networkInputFour.value,
  primarycareCommericalFour: primarycareCommericalInputFour.value,
  otherInsFour: primarycareCommericalInputFour.value,
  policyHolderFour: policyHolderInputFour.value,
  groupFour: groupInputFour.value,
  oopFour: oopInputFour.value,
  oopMetFour: oopMetInputFour.value,
  deductibleFour: deductibleInputFour.value,
  dedMetFour: dedMetInputFour.value,
  claimAddressFour: claimAddressInputFour.value,
  payorIDFour: payorIDInputFour.value,
  verifiedOnlineFour: verifiedOnlineInputFour.value,
  theCOB: theCOB.value,
};

function resetInputValues() {
  // Reset ahcccs input boxes
  effectiveDateInput.value = originalValues.effectiveDate;
  otherInsuranceInput.value = originalValues.otherInsuranceInput;
  sickInput.value = originalValues.sick;
  spokeInput.value = originalValues.spoke;
  pcpInput.value = originalValues.primaryCarePhysician;
  rateGroupInput.value = originalValues.rateGroup;

  // Reset medicare input boxes
  effectiveDateInputTwo.value = originalValues.effectiveDateTwo;
  coinsInput2.value = originalValues.coins2;
  dedInputTwo.value = originalValues.ded2;
  dedMetInputTwo.value = originalValues.dedMet2;
  ineligibleInput.value = originalValues.ineligiblePeriod;
  otherInsTwoInput.value = originalValues.otherInsTwoInput;
  spokeInputTwo.value = originalValues.spokeTwo;

  // Reset medicare input boxes
  contractedInputThree.value = originalValues.contractedThree;
  effectiveDateInputThree.value = originalValues.effectiveDateThree;
  planInputThree.value = originalValues.planThree;
  groupInputThree.value = originalValues.groupThree;
  sickInputThree.value = originalValues.sickThree;
  dedinputThree.value = originalValues.sickThree;
  otherInsThree.value = originalValues.sickThree;
  verifiedOnlineInputThree.value = originalValues.verifiedOnlineThree;
  pcpInputThree.value = originalValues.primaryCarePhysicianThree;

  // Reset commercial input boxes
  contractedInputFour.value = originalValues.contractedFour;
  sickInputFour.value = originalValues.sickFour;
  hsahraInputFour.value = originalValues.hsahraFour;
  telehealthInputFour.value = originalValues.telehealthFour;
  pExamsInputFour.value = originalValues.pExamsFour;
  proceduresInputFour.value = originalValues.proceduresFour;
  labsInputFour.value = originalValues.labsFour;
  immunizationsInputFour.value = originalValues.immunizationsFour;
  spokeInputFour.value = originalValues.spokeFour;
  referenceInputFour.value = originalValues.referenceFour;
  effectiveDateInputFour.value = originalValues.effectiveDateFour;
  planTypeInputFour.value = originalValues.planTypeFour;
  networkInputFour.value = originalValues.networkFour;
  primarycareCommericalInputFour.value =
    originalValues.primarycareCommericalFour;
  otherIns4Input.value = originalValues.primarycareCommericalFour;
  policyHolderInputFour.value = originalValues.primarycareCommericalFour;
  groupInputFour.value = originalValues.primarycareCommericalFour;
  oopInputFour.value = originalValues.primarycareCommericalFour;
  oopMetInputFour.value = originalValues.primarycareCommericalFour;
  deductibleInputFour.value = originalValues.primarycareCommericalFour;
  dedMetInputFour.value = originalValues.primarycareCommericalFour;
  claimAddressInputFour.value = originalValues.primarycareCommericalFour;
  payorIDInputFour.value = originalValues.primarycareCommericalFour;
  theCOB.value = originalValues.theCOB;
}

const previousValuesEntered = {
  currentEffectiveDateInput: effectiveDateInput.value,
  currentSickInput: sickInput.value,
  currentOtherInsuranceInput: otherInsuranceInput.value,
  currentSpokeInput: spokeInput.value,
  currentPcpInput: pcpInput.value,
  currentRateGroupInput: rateGroupInput.value,

  // Medicare  input boxes
  currentEffectiveDateInputTwo: effectiveDateInputTwo.value,
  currentCoinsInput2: coinsInput2.value,
  currentDedInputTwo: dedInputTwo.value,
  currentDedMetInputTwo: dedMetInputTwo.value,
  currentIneligibleInput: ineligibleInput.value,
  currentOtherInsInputTwo: otherInsTwoInput.value,
  currentSpokeInputTwo: spokeInputTwo.value,

  // Medicare Replacement input boxes
  currentContractedInputThree: contractedInputThree.value,
  currentEffectiveDateInputThree: effectiveDateInputThree.value,
  currentPlanInputThree: planInputThree.value,
  currentGroupInputThree: groupInputThree.value,
  currentSickInputThree: sickInputThree.value,
  currentDedinputThree: dedinputThree.value,
  currentOtherInsThree: otherInsThree.value,
  currentVerifiedOnlineInputThree: verifiedOnlineInputThree.value,
  currentPcpInputThree: pcpInputThree.value,

  // Commercial input boxes
  currentEffectiveDateInput: effectiveDateInput.value,
  currentSickInput: sickInput.value,
  currentotherInsuranceInput: otherInsuranceInput.value,
  currentSpokeInput: spokeInput.value,
  currentPcpInput: pcpInput.value,
  currentRateGroupInput: rateGroupInput.value,

  // Medicare  input boxes
  currentEffectiveDateInputTwo: effectiveDateInputTwo.value,
  currentCoinsInput2: coinsInput2.value,
  currentDedInputTwo: dedInputTwo.value,
  currentDedMetInputTwo: dedMetInputTwo.value,
  currentIneligibleInput: ineligibleInput.value,
  currentOtherInsInputTwo: otherInsTwoInput.value,
  currentSpokeInputTwo: spokeInputTwo.value,

  // Medicare Replacement input boxes
  currentContractedInputThree: contractedInputThree.value,
  currentEffectiveDateInputThree: effectiveDateInputThree.value,
  currentPlanInputThree: planInputThree.value,
  currentGroupInputThree: groupInputThree.value,
  currentSickInputThree: sickInputThree.value,
  currentDedinputThree: dedinputThree.value,
  currentOtherInsThree: otherInsThree.value,
  currentVerifiedOnlineInputThree: verifiedOnlineInputThree.value,
  currentPcpInputThree: pcpInputThree.value,

  // Commercial input boxes
  currentContractedInputFour: contractedInputFour.value,
  currentSickInputFour: sickInputFour.value,
  currentHsahraInputFour: hsahraInputFour.value,
  currentTelehealthInputFour: telehealthInputFour.value,
  currentPExamsInputFour: pExamsInputFour.value,
  currentProceduresInputFour: proceduresInputFour.value,
  currentLabsInputFour: labsInputFour.value,
  currentImmunizationsInputFour: immunizationsInputFour.value,
  currentSpokeInputFour: spokeInputFour.value,
  currentReferenceInputFour: referenceInputFour.value,
  currentEffectiveDateInputFour: effectiveDateInputFour.value,
  currentPlanTypeInputFour: planTypeInputFour.value,
  currentNetworkInputFour: networkInputFour.value,
  currentPrimarycareCommericalInputFour: primarycareCommericalInputFour.value,
  currentOtherIns4Input: otherIns4Input.value,
  currentPolicyHolderInputFour: policyHolderInputFour.value,
  currentGroupInputFour: groupInputFour.value,
  currentOopInputFour: oopInputFour.value,
  currentOopMetInputFour: oopMetInputFour.value,
  currentDeductibleInputFour: deductibleInputFour.value,
  currentDedMetInputFour: dedMetInputFour.value,
  currentClaimAddressInputFour: claimAddressInputFour.value,
  currentPayorIDInputFour: payorIDInputFour.value,
};

const getLastValuesEntered = () => {
  // medicaid Replacement input boxes
  previousValuesEntered.currentEffectiveDateInput = effectiveDateInput.value;
  previousValuesEntered.currentSickInput = sickInput.value;
  previousValuesEntered.currentSpokeInput = spokeInput.value;
  previousValuesEntered.currentPcpInput = pcpInput.value;
  previousValuesEntered.currentRateGroupInput = rateGroupInput.value;

  // Medicare  input boxes
  previousValuesEntered.currentEffectiveDateInputTwo =
    effectiveDateInputTwo.value;
  previousValuesEntered.currentCoinsInput2 = coinsInput2.value;
  previousValuesEntered.currentDedInputTwo = dedInputTwo.value;
  previousValuesEntered.currentDedMetInputTwo = dedMetInputTwo.value;
  previousValuesEntered.currentIneligibleInput = ineligibleInput.value;
  previousValuesEntered.currentOtherInsInputTwo = otherInsTwoInput.value;
  previousValuesEntered.currentSpokeInputTwo = spokeInputTwo.value;

  // Medicare Replacement input boxes
  previousValuesEntered.currentContractedInputThree =
    contractedInputThree.value;
  previousValuesEntered.currentEffectiveDateInputThree =
    effectiveDateInputThree.value;
  previousValuesEntered.currentPlanInputThree = planInputThree.value;
  previousValuesEntered.currentGroupInputThree = groupInputThree.value;
  previousValuesEntered.currentSickInputThree = sickInputThree.value;
  previousValuesEntered.currentDedinputThree = dedinputThree.value;
  previousValuesEntered.currentOtherInsThree = otherInsThree.value;
  previousValuesEntered.currentVerifiedOnlineInputThree =
    verifiedOnlineInputThree.value;
  previousValuesEntered.currentPcpInputThree = pcpInputThree.value;

  // Commercial input boxes
  previousValuesEntered.currentContractedInputFour = contractedInputFour.value;
  previousValuesEntered.currentSickInputFour = sickInputFour.value;
  previousValuesEntered.currentHsahraInputFour = hsahraInputFour.value;
  previousValuesEntered.currentTelehealthInputFour = telehealthInputFour.value;
  previousValuesEntered.currentPExamsInputFour = pExamsInputFour.value;
  previousValuesEntered.currentProceduresInputFour = proceduresInputFour.value;
  previousValuesEntered.currentLabsInputFour = labsInputFour.value;
  previousValuesEntered.currentImmunizationsInputFour =
    immunizationsInputFour.value;
  previousValuesEntered.currentSpokeInputFour = spokeInputFour.value;
  previousValuesEntered.currentReferenceInputFour = referenceInputFour.value;
  previousValuesEntered.currentEffectiveDateInputFour =
    effectiveDateInputFour.value;
  previousValuesEntered.currentPlanTypeInputFour = planTypeInputFour.value;
  previousValuesEntered.currentNetworkInputFour = networkInputFour.value;
  previousValuesEntered.currentPrimarycareCommericalInputFour =
    primarycareCommericalInputFour.value;
  previousValuesEntered.currentOtherIns4Input = otherIns4Input.value;
  previousValuesEntered.currentPolicyHolderInputFour =
    policyHolderInputFour.value;
  previousValuesEntered.currentGroupInputFour = groupInputFour.value;
  previousValuesEntered.currentOopInputFour = oopInputFour.value;
  previousValuesEntered.currentOopMetInputFour = oopMetInputFour.value;
  previousValuesEntered.currentDeductibleInputFour = deductibleInputFour.value;
  previousValuesEntered.currentDedMetInputFour = dedMetInputFour.value;
  previousValuesEntered.currentClaimAddressInputFour =
    claimAddressInputFour.value;
  previousValuesEntered.currentPayorIDInputFour = payorIDInputFour.value;
};

undoButton.addEventListener("click", function () {
  effectiveDateInput.value = previousValuesEntered.currentEffectiveDateInput;
  sickInput.value = previousValuesEntered.currentSickInput;
  otherInsuranceInput.value = previousValuesEntered.currentotherInsuranceInput;
  spokeInput.value = previousValuesEntered.currentSpokeInput;
  pcpInput.value = previousValuesEntered.currentPcpInput;
  rateGroupInput.value = previousValuesEntered.currentRateGroupInput;

  // Medicare input boxes
  effectiveDateInputTwo.value =
    previousValuesEntered.currentEffectiveDateInputTwo;
  coinsInput2.value = previousValuesEntered.currentCoinsInput2;
  dedInputTwo.value = previousValuesEntered.currentDedInputTwo;
  dedMetInputTwo.value = previousValuesEntered.currentDedMetInputTwo;
  ineligibleInput.value = previousValuesEntered.currentIneligibleInput;
  otherInsTwoInput.value = previousValuesEntered.currentOtherInsInputTwo;
  spokeInputTwo.value = previousValuesEntered.currentSpokeInputTwo;

  // Medicare Replacement input boxes
  contractedInputThree.value =
    previousValuesEntered.currentContractedInputThree;
  effectiveDateInputThree.value =
    previousValuesEntered.currentEffectiveDateInputThree;
  planInputThree.value = previousValuesEntered.currentPlanInputThree;
  groupInputThree.value = previousValuesEntered.currentGroupInputThree;
  sickInputThree.value = previousValuesEntered.currentSickInputThree;
  dedinputThree.value = previousValuesEntered.currentDedinputThree;
  otherInsThree.value = previousValuesEntered.currentOtherInsThree;
  verifiedOnlineInputThree.value =
    previousValuesEntered.currentVerifiedOnlineInputThree;
  pcpInputThree.value = previousValuesEntered.currentPcpInputThree;

  // Commercial input boxes
  effectiveDateInput.value = previousValuesEntered.currentEffectiveDateInput;
  sickInput.value = previousValuesEntered.currentSickInput;
  thirdPartyInput.value = previousValuesEntered.currentThirdPartyInput;
  medicareBoxInput.value = previousValuesEntered.currentMedicareBoxInput;
  spokeInput.value = previousValuesEntered.currentSpokeInput;
  pcpInput.value = previousValuesEntered.currentPcpInput;
  rateGroupInput.value = previousValuesEntered.currentRateGroupInput;

  // Medicare input boxes
  effectiveDateInputTwo.value =
    previousValuesEntered.currentEffectiveDateInputTwo;
  coinsInput2.value = previousValuesEntered.currentCoinsInput2;
  dedInputTwo.value = previousValuesEntered.currentDedInputTwo;
  dedMetInputTwo.value = previousValuesEntered.currentDedMetInputTwo;
  ineligibleInput.value = previousValuesEntered.currentIneligibleInput;
  otherInsTwoInput.value = previousValuesEntered.currentOtherInsInputTwo;
  spokeInputTwo.value = previousValuesEntered.currentSpokeInputTwo;

  // Medicare Replacement input boxes
  contractedInputThree.value =
    previousValuesEntered.currentContractedInputThree;
  effectiveDateInputThree.value =
    previousValuesEntered.currentEffectiveDateInputThree;
  planInputThree.value = previousValuesEntered.currentPlanInputThree;
  groupInputThree.value = previousValuesEntered.currentGroupInputThree;
  sickInputThree.value = previousValuesEntered.currentSickInputThree;
  dedinputThree.value = previousValuesEntered.currentDedinputThree;
  otherInsThree.value = previousValuesEntered.currentOtherInsThree;
  verifiedOnlineInputThree.value =
    previousValuesEntered.currentVerifiedOnlineInputThree;
  pcpInputThree.value = previousValuesEntered.currentPcpInputThree;

  // Commercial input boxes
  contractedInputFour.value = previousValuesEntered.currentContractedInputFour;
  sickInputFour.value = previousValuesEntered.currentSickInputFour;
  hsahraInputFour.value = previousValuesEntered.currentHsahraInputFour;
  telehealthInputFour.value = previousValuesEntered.currentTelehealthInputFour;
  pExamsInputFour.value = previousValuesEntered.currentPExamsInputFour;
  proceduresInputFour.value = previousValuesEntered.currentProceduresInputFour;
  labsInputFour.value = previousValuesEntered.currentLabsInputFour;
  immunizationsInputFour.value =
    previousValuesEntered.currentImmunizationsInputFour;
  spokeInputFour.value = previousValuesEntered.currentSpokeInputFour;
  referenceInputFour.value = previousValuesEntered.currentReferenceInputFour;
  effectiveDateInputFour.value =
    previousValuesEntered.currentEffectiveDateInputFour;
  planTypeInputFour.value = previousValuesEntered.currentPlanTypeInputFour;
  networkInputFour.value = previousValuesEntered.currentNetworkInputFour;
  primarycareCommericalInputFour.value =
    previousValuesEntered.currentPrimarycareCommericalInputFour;
  otherIns4Input.value = previousValuesEntered.currentOtherIns4Input;
  policyHolderInputFour.value =
    previousValuesEntered.currentPolicyHolderInputFour;
  groupInputFour.value = previousValuesEntered.currentGroupInputFour;
  oopInputFour.value = previousValuesEntered.currentOopInputFour;
  oopMetInputFour.value = previousValuesEntered.currentOopMetInputFour;
  deductibleInputFour.value = previousValuesEntered.currentDeductibleInputFour;
  dedMetInputFour.value = previousValuesEntered.currentDedMetInputFour;
  claimAddressInputFour.value =
    previousValuesEntered.currentClaimAddressInputFour;
  payorIDInputFour.value = previousValuesEntered.currentPayorIDInputFour;
});

function getPreventiveCPT(dobString) {
  if (!dobString) return null;

  const birthDate = new Date(dobString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 1) return ["99391", "99381"];
  if (age <= 4) return ["99392", "99382"];
  if (age <= 11) return ["99393", "99383"];
  if (age <= 17) return ["99394", "99384"];
  if (age <= 39) return ["99395", "99385"];
  if (age <= 64) return ["99396", "99386"];
  return ["99397", "99387"];
}

document
  .getElementById("generateChatScript")
  .addEventListener("click", function () {
    const selectedQuestions = document.querySelectorAll(
      ".chatQuestion:checked",
    );
    const includeCPT = document.getElementById("includeCPTCheck").checked;
    const dobValue = document.getElementById("dobForCPT");

    let script = "Could you confirm general benefits for:\n\n";

    selectedQuestions.forEach((q) => {
      script += "• " + q.value + "\n";
    });

    if (selectedQuestions.length > 0) {
      script += "\n";
    }

    if (includeCPT && !dobString) {
      script = "";
      script +=
        "Please provide the patient's date of birth to include CPT code question or remove selection.";

      dobValue.classList.add("invalid");

      // Remove the "invalid" class after 3 second
      setTimeout(() => {
        dobValue.classList.remove("invalid");
      }, 3000);
      document.getElementById("chatScriptOutput").value = script.trim();
    }

    if (includeCPT && dobString) {
      const cptCodes = getPreventiveCPT(dobString);

      if (cptCodes) {
        script += `Can you tell me if the patient has used ${cptCodes[0]} or ${cptCodes[1]} in the last 12 months?\n\n`;
      }
    }
    document.getElementById("chatScriptOutput").value = script.trim();
    chatScriptOutput.select();
    document.execCommand("copy");
    chatScriptOutput.setSelectionRange(0, 0);
    const chatScriptButton = document.getElementById("generateChatScript");
    chatScriptButton.innerText = "Copied";
    chatScriptButton.style.background = "#32936f";
    setTimeout(() => {
      chatScriptButton.innerText = "Generate Chat Script";
      chatScriptButton.style.background = "#0d6efd";
    }, 1000);
  });

const dateOfBirthChecker = (dateString) => {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(dateString)) {
    return false;
  }

  // Parse the date components
  const dateParts = dateString.split("/");
  const month = parseInt(dateParts[0], 10);
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  // Check if the month, day, and year are within valid ranges
  if (
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31 &&
    year >= 1900 &&
    year <= new Date().getFullYear()
  ) {
    // Additional custom validation can be added here if needed
    return true;
  }

  return false;
};

const dateValidation = (dateString) => {
  const dateInquiry = new Date(dateString);
  if (dateInquiry <= currentDate) {
    return true;
  }
};

//------------make the appropriate template section show------------//

verificationTemplateOptions.forEach((verificationOption, index) => {
  verificationOption.addEventListener("change", () => {
    templateContents.forEach((contentElement, contentIndex) => {
      if (contentIndex === index) {
        contentElement.style.display = "grid";
        textBoxes[1].value = "";
        if (contentIndex === 0) {
          mercyCareOptions.style.display = "block";
          uhcDualCheck.style.display = "none";
          uhcTag.style.display = "block";
          monthlyBenefits.style.display = "none";
          chatSection.style.display = "none";
        } else if (contentIndex === 2) {
          uhcDualCheck.style.display = "block";
          mercyCareOptions.style.display = "none";
          uhcTag.style.display = "none";
          monthlyBenefits.style.display = "none";
          chatSection.style.display = "none";
        } else if (contentIndex === 3) {
          uhcDualCheck.style.display = "none";
          mercyCareOptions.style.display = "none";
          uhcTag.style.display = "none";
          monthlyBenefits.style.display = "block";
          chatSection.style.display = "block";
        } else {
          mercyCareOptions.style.display = "none";
          uhcDualCheck.style.display = "none";
          uhcTag.style.display = "none";
          monthlyBenefits.style.display = "none";
          chatSection.style.display = "none";
        }
      } else {
        contentElement.style.display = "none";
      }
    });
  });
});

mercyCareCheck.addEventListener("change", () => {
  if (mercyCareCheck.checked) {
    // If checked display the label
    mercyCarelabel.style.display = "block";
  } else {
    mercyCarelabel.style.display = "none";
  }
});

const AHCCCSVerification = () => {
  let verifcationText = "";
  actualVerificationDate = dateVerified.value;
  actualVerificationDateFormatted =
    actualVerificationDate.substring(5, 7) +
    "/" +
    actualVerificationDate.substring(8, 10) +
    "/" +
    actualVerificationDate.substring(0, 4);

  if (mercyCareCheck.checked) {
    verifcationText = `${actualVerificationDateFormatted} ${
      getInitials.value
    } EFF: ${effectiveDateInput.value.trim()} |  SICK: ${sickInput.value}  | OTHER INS: ${otherInsuranceInput.value} | RATE GROUP: ${rateGroupInput.value.trim()} | SPOKE: ${
      spokeInput.value
    }  | PCP: ${pcpInput.value.trim()} `.toLocaleUpperCase();
  } else {
    verifcationText = `${actualVerificationDateFormatted} ${
      getInitials.value
    } EFF: ${effectiveDateInput.value.trim()} |  SICK: ${sickInput.value}  | OTHER INS: ${otherInsuranceInput.value} | SPOKE: ${
      spokeInput.value
    }  | PCP: ${pcpInput.value.trim()} `.toLocaleUpperCase();
  }

  if (uhcCheckBox.checked) {
    verifcationText = `${verifcationText} (COVID TEST NOT COVERED)`;
    console.log("test");
  }

  textBoxes[1].value = verifcationText;
};

const medicareVerification = () => {
  actualVerificationDate = dateVerified.value;
  actualVerificationDateFormatted =
    actualVerificationDate.substring(5, 7) +
    "/" +
    actualVerificationDate.substring(8, 10) +
    "/" +
    actualVerificationDate.substring(0, 4);
  let metAmount =
    parseInt(dedInputTwo.value) - parseInt(dedMetInputTwo.value.trim());
  if (parseInt(dedMetInputTwo.value.trim()) < 1) {
    metAmount = "FULLY MET";
  } else if (parseInt(dedMetInputTwo.value.trim() > 225)) {
    metAmount = "0";
  }

  textBoxes[1].value = `${actualVerificationDateFormatted} ${
    getInitials.value
  } EFF: ${effectiveDateInputTwo.value.trim()} |  COINS: ${
    coinsInput2.value
  }  | DED:  ${dedInputTwo.value.trim()}/ MET: ${metAmount} | INELIGIBLE PERIOD: ${
    ineligibleInput.value
  } | OTHER INS: ${otherInsTwoInput.value} | SPOKE: ${
    spokeInputTwo.value
  } `.toLocaleUpperCase();
};

const replacementVerification = () => {
  actualVerificationDate = dateVerified.value;
  actualVerificationDateFormatted =
    actualVerificationDate.substring(5, 7) +
    "/" +
    actualVerificationDate.substring(8, 10) +
    "/" +
    actualVerificationDate.substring(0, 4);

  if (uhcDualCheckBox.checked) {
    textBoxes[1].value = `${actualVerificationDateFormatted} ${
      getInitials.value
    } CONTRACTED: ${
      contractedInputThree.value
    } |  EFF: ${effectiveDateInputThree.value.trim()} | PLAN: ${planInputThree.value.trim()}  |  GROUP# : ${groupInputThree.value.trim()} | SICK: ${
      sickInputThree.value
    } | DED: ${dedinputThree.value} | OTHER INS: ${
      otherInsThree.value
    } | VERIFIED: ${
      verifiedOnlineInputThree.value
    } | PCP: ${pcpInputThree.value.trim()} (COVID TEST NOT COVERED)`.toLocaleUpperCase();
  } else {
    textBoxes[1].value = `${actualVerificationDateFormatted} ${
      getInitials.value
    } CONTRACTED: ${
      contractedInputThree.value
    } |  EFF: ${effectiveDateInputThree.value.trim()} | PLAN: ${planInputThree.value.trim()}  |  GROUP# : ${groupInputThree.value.trim()} | SICK: ${
      sickInputThree.value
    } | DED: ${dedinputThree.value} | OTHER INS: ${
      otherInsThree.value
    } | VERIFIED: ${
      verifiedOnlineInputThree.value
    } | PCP: ${pcpInputThree.value.trim()} `.toLocaleUpperCase();
  }
};

const commercialVerificationText = () => {
  actualVerificationDate = dateVerified.value;
  actualVerificationDateFormatted =
    actualVerificationDate.substring(5, 7) +
    "/" +
    actualVerificationDate.substring(8, 10) +
    "/" +
    actualVerificationDate.substring(0, 4);

  let parts = [];
  parts.push(`${actualVerificationDateFormatted}`);
  parts.push(`${getInitials.value}`);
  parts.push("INS STILL ACTIVE");

  if (contractedInputFour.value.trim() !== "") {
    parts.push(` CONTRACTED: ${contractedInputFour.value.trim()}`);
  }
  if (sickInputFour.value.trim() !== "") {
    parts.push(`SICK: ${sickInputFour.value.trim()}`);
  }
  if (
    deductibleInputFour.value.trim() !== "" ||
    dedMetInputFour.value.trim() !== ""
  ) {
    parts.push(
      `DED: ${deductibleInputFour.value.trim()}/ MET: ${dedMetInputFour.value.trim()}`,
    );
  }

  if (monthlyBenefitsCheckBox.checked) {
    textBoxes[1].value = parts.join(" | ").toLocaleUpperCase();
  } else {
    textBoxes[1].value = `${actualVerificationDateFormatted} ${
      getInitials.value
    } CONTRACTED: ${contractedInputFour.value.trim()} | SICK: ${sickInputFour.value.trim()} | TELEHEALTH: ${telehealthInputFour.value.trim()}  | PROCEDURES: ${proceduresInputFour.value.trim()} | DX-LABS: ${labsInputFour.value.trim()} | PE: ${pExamsInputFour.value.trim()}  | FLU(90656/90662)/PREVENTIVE IMMUN: ${immunizationsInputFour.value.trim()} | COB: ${theCOB.value} | HSA/HRA: ${hsahraInputFour.value.trim()} | SPOKE: ${spokeInputFour.value.trim()} | REF: ${
      referenceInputFour.value
    } EFF: ${effectiveDateInputFour.value.trim()} | PLAN TYPE: ${planTypeInputFour.value.trim()} |  NETWORK: ${networkInputFour.value.trim()} | PCP: ${primarycareCommericalInputFour.value.trim()}  | POLICY HOLDER: ${
      policyHolderInputFour.value
    }  | GROUP#: ${groupInputFour.value.trim()} | OTHER INS: ${
      otherIns4Input.value
    }  | DED: ${deductibleInputFour.value.trim()} / MET: ${dedMetInputFour.value.trim()} | OOP: ${oopInputFour.value.trim()} / MET: ${oopMetInputFour.value.trim()}  | CLAIM ADDRESS: ${claimAddressInputFour.value.trim()} | PAYOR ID: ${payorIDInputFour.value.trim()}  |  VERIFIED: ${
      verifiedOnlineInputThree.value
    } `.toLocaleUpperCase();
  }
  if (acaExchangeStandardHealthCheckbox.checked) {
    textBoxes[1].value += " (COVID TEST NOT COVERED)";
  }
};

const form = document.getElementById("verifications");
const secondForm = document.getElementById("physicalExams");
document.addEventListener("DOMContentLoaded", function () {
  const inputFields = form.querySelectorAll("input");

  submitButton[1].addEventListener("click", function (event) {
    let isFormValid = true;

    // double check each input fields
    inputFields.forEach((input) => {
      if (input.value.trim() === "") {
        isFormValid = false;
        input.classList.add("invalid");

        // Remove the "invalid" class after 3 second
        setTimeout(() => {
          input.classList.remove("invalid");
        }, 3000);
      }
    });
  });

  verificationAndPE[0].addEventListener("click", function (event) {
    let isFormValid = true;

    // double check each input fields
    inputFields.forEach((input) => {
      if (input.value.trim() === "") {
        isFormValid = false;
        input.classList.add("invalid");

        // Remove the "invalid" class after 3 second
        setTimeout(() => {
          input.classList.remove("invalid");
        }, 3000);
      }
    });
  });

  verificationAndPE[1].addEventListener("click", function (event) {
    let isFormValid = true;

    // double check each input fields
    inputFields.forEach((input) => {
      if (input.value.trim() === "") {
        isFormValid = false;
        input.classList.add("invalid");

        // Remove the "invalid" class after 3 second
        setTimeout(() => {
          input.classList.remove("invalid");
        }, 3000);
      }
    });
  });

  //-------------This little section flips between the two forms-------------//

  const buttons = document.querySelectorAll(".arrow-button");
  const computedStyle = window.getComputedStyle(form);

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (computedStyle.display !== "none") {
        form.style.display = "none";
        secondForm.style.display = "block";
        secondForm.style.gridRow = 1;
      } else {
        form.style.display = "block";
        secondForm.style.gridRow = 2;
        secondForm.style.display = "none";
      }
    });
  });

  window.addEventListener("resize", function () {
    // Check if the height is greater than 900 pixels
    if (window.innerHeight > 900) {
      form.style.display = "block";
      secondForm.style.display = "block";
    } else {
      form.style.display = "block";
      secondForm.style.gridRow = 2;
      secondForm.style.display = "none";
    }
  });
});

const cleanSlatePE = () => {
  dateBirthInput.classList.remove("greyedOut");
  dateBirthInput.readOnly = false;
  dateBirthInput.value = "";
  dateOfBirthValue = "";
  lastPhysicalServiceDate.classList.remove("greyedOut");
  lastPhysicalServiceDate.readOnly = false;
  lastPhysicalServiceDate.value = "";
  lastPEValue = "";
};

newPatientCheckCheckBox.addEventListener("change", () => {
  if (newPatientCheckCheckBox.checked) {
    dateBirthInput.classList.add("greyedOut");
    dateBirthInput.readOnly = true;
    dateBirthInput.value = "01/01/1900";
    dateOfBirthValue = "01/01/1900";

    lastPhysicalServiceDate.classList.add("greyedOut");
    lastPhysicalServiceDate.value = "01/01/1900";
    lastPEValue = "01/01/1900";
    lastPhysicalServiceDate.readOnly = true;
  } else {
    cleanSlatePE();
  }
});

let selectedRadioButton = "CHOOSE A GCODE";
function updateOutputBox() {
  const checkedRadio = document.querySelector(
    '#assignGcode input[type="radio"]:checked',
  );
  if (checkedRadio) {
    selectedRadioButton =
      checkedRadio.parentElement.querySelector("label").textContent;
  }

  if (selectedRadioButton === "G0402") {
    lastPhysicalServiceDate.classList.add("greyedOut");
    lastPhysicalServiceDate.value = "01/01/1900";
    lastPEValue = "01/01/1900";
    lastPhysicalServiceDate.readOnly = true;
  } else {
    lastPhysicalServiceDate.classList.remove("greyedOut");
    lastPhysicalServiceDate.readOnly = false;
  }
}

medicareGcodeButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    updateOutputBox();
  });
});

/*-------Contract list dropdown-------*/

const currentProviders = [
  { name: "Alex Guzman Garcia", contracted: "YES" },
  { name: "Andrew C. White", contracted: "YES" },
  { name: "Angeles Olivarez", contracted: "YES" },
  { name: "Blair Ball", contracted: "YES" },
  { name: "Carlomagno C Briones", contracted: "YES" },
  { name: "Christine Briones", contracted: "YES" },
  { name: "Claudia Romo", contracted: "YES" },
  { name: "Drisde Cruz Martinez", contracted: "YES" },
  { name: "Elizabeth Lopez-Murray", contracted: "YES" },
  { name: "Eric Gonzalez", contracted: "YES" },
  { name: "Erick Torres", contracted: "YES" },
  { name: "Flor N Arellano Garcia", contracted: "YES" },
  { name: "Freddy Montenegro", contracted: "YES" },
  { name: "Gloria Estrada", contracted: "YES" },
  { name: "Haidee Waymire", contracted: "YES" },
  { name: "Idalgis Elias Rodriguez", contracted: "YES" },
  { name: "J Guadalupe Gallo Padilla", contracted: "YES" },
  { name: "Jacob Frietz", contracted: "YES" },
  { name: "Javier G. Padilla", contracted: "YES" },
  { name: "Jessica Cuevas", contracted: "YES" },
  { name: "Julia Nieto", contracted: "YES" },
  { name: "Maria Del Carmen Castillo", contracted: "YES" },
  { name: "Karin Montiel Lopez", contracted: "YES" },
  { name: "Kassandra Barron GUzman", contracted: "YES" },
  { name: "Kimberly Mendoza", contracted: "YES" },
  { name: "Nina Celaya", contracted: "YES" },
  { name: "Patricia Perez", contracted: "YES" },
  { name: "Ricardo G Celaya", contracted: "YES" },
  { name: "Ricardo L Celaya", contracted: "YES" },
  { name: "Ruby E Fernandez", contracted: "YES" },
  { name: "Russell Jackson", contracted: "YES" },
  { name: "Sam F Shumway", contracted: "YES" },
  { name: "Sandy Morales", contracted: "YES" },
  { name: "Seth Gillespie", contracted: "YES" },
  { name: "Stephanie Rodriguez", contracted: "YES" },
  { name: "Veronica Cristina Diaz Pulido", contracted: "YES" },
  { name: "Walter Rios-Corujo", contracted: "YES" },
  { name: "Xochitl Landeros", contracted: "YES" },
  { name: "Yesenia E. Ochoa", contracted: "YES" },
  { name: "Yajaira Acosta", contracted: "YES" },
  { name: "Jorge Alzuri Hernandez", contracted: "YES" },
  { name: "Elias", contracted: false, seeUnder: "Carlomagno Briones" },
  { name: "Montiel", contracted: false, seeUnder: "Christine Briones" },
  { name: "Diaz", contracted: false, seeUnder: "Nina Celaya" },
  { name: "Stephanie Rodriguez", contracted: false, seeUnder: "Nina Celaya" },
  { name: "Frietz", contracted: false, seeUnder: "Ricardo G Celaya" },
  { name: "Alzuri", contracted: false, seeUnder: "Ricardo G Celaya" },
  { name: "Olivares", contracted: false, seeUnder: "Ricardo L Celaya" },
  { name: "Perez", contracted: false, seeUnder: "Ricardo L Celaya" },
  { name: "Mendoza", contracted: false, seeUnder: "Ricardo G Celaya" },
  { name: "Barron Guzman", contracted: false, seeUnder: "Christine Briones" },
  { name: "NONE" },
];

const datalist = document.getElementById("contracted-list");

currentProviders.forEach((provider) => {
  const option = document.createElement("option");

  if (provider.contracted) {
    option.value = `YES ${provider.name}`;
  } else {
    option.value = `NO ${provider.name} SEE UNDER ${provider.seeUnder}`;
  }
  datalist.appendChild(option);
});

/*-------Change date format to MM/DD/YYYY-------*/

const formatDate = (dateString) => {
  if (!dateString) return "";

  // if already in MM/DD/YYYY format, return as is
  const numericPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (numericPattern.test(dateString)) {
    return dateString;
  }

  // try to parse formats like "May 05, 2024" or "May 5 2024"
  const parsedDate = new Date(dateString);

  if (!isNaN(parsedDate)) {
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return dateString;
};

// /*-------Paste Portal Data-------*/

const pastePortalButton = document.getElementById("pastePortalData");

function formatData(parsed) {
  const otherInsuranceValue =
    parsed.otherPayer === "NONE" ? "NONE" : "CHECK MANUALLY";

  function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  function similarity(a, b) {
    const distance = levenshtein(a, b);
    const maxLength = Math.max(a.length, b.length);
    return 1 - distance / maxLength;
  }

  function normalize(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .trim();
  }

  const threshold = 0.75;

  const isInClinic = currentProviders.some((provider) => {
    const score = similarity(normalize(provider.name), normalize(parsed.pcp));

    return score >= threshold;
  });

  let bestMatch = null;
  let bestScore = 0;

  currentProviders.forEach((provider) => {
    const score = similarity(normalize(provider.name), normalize(parsed.pcp));

    if (score > bestScore) {
      bestScore = score;
      bestMatch = provider;
    }
  });

  console.log(bestMatch, bestScore);

  const finalPCP = bestScore >= threshold ? parsed.pcp : "CHANGE";

  return {
    effectiveDate: parsed.effectiveDate,
    otherInsurance: otherInsuranceValue,
    plan: parsed.plan,
    type: parsed.type,
    pcp: finalPCP,
    deductible: parsed.deductible,
    group: parsed.group,
    groupNumber: parsed.groupNumber,
    sickAmount: parsed.sickAmount,
    policyHolder: parsed.policyHolder,
    poBox: parsed.poBox,
    payerId: parsed.payerId,
    hsaHra: parsed.hsaHra,
    indDedAmount: parsed.indDedAmount,
    famDedAmount: parsed.famDedAmount,
    indDedMet: parsed.indDedMet,
    famDedMet: parsed.famDedMet,
    indOopAmount: parsed.indOopAmount,
    famOopAmount: parsed.famOopAmount,
    indOopMet: parsed.indOopMet,
    famOopMet: parsed.famOopMet,
    deductiblePartBAmount: parsed.deductiblePartBAmount,
    dedPartBRemainingAmount: parsed.dedPartBRemainingAmount,
  };
}

function fillForm(data) {
  if (ahcccsInputBoxes.checked) {
    effectiveDateInput.value = data.effectiveDate;
    otherInsuranceInput.value = data.otherInsurance;
    rateGroupInput.value = data.plan;
    pcpInput.value = data.pcp;
  } else if (replacementInputBoxes.checked) {
    effectiveDateInputThree.value = data.effectiveDate;
    otherInsThree.value = data.otherInsurance;
    planInputThree.value = data.group;
    pcpInputThree.value = data.pcp;
    dedinputThree.value = data.deductible;
    groupInputThree.value = data.groupNumber;
    sickInputThree.value = data.sickAmount;
  } else if (medicareInputBoxes.checked) {
    effectiveDateInputTwo.value = data.effectiveDate;
    otherInsTwoInput.value = data.otherInsurance;
    dedInputTwo.value = data.deductiblePartBAmount;
    coinsInput2.value = data.sickAmount;
    dedMetInputTwo.value = data.dedPartBRemainingAmount;
    ineligibleInput.value = "NONE";
  } else if (commericalInputBoxes.checked) {
    effectiveDateInputFour.value = data.effectiveDate;
    planTypeInputFour.value = data.type;
    networkInputFour.value = data.plan;
    primarycareCommericalInputFour.value = data.pcp;
    groupInputFour.value = data.groupNumber;
    otherIns4Input.value = data.otherInsurance;
    deductibleInputFour.value = `IND ${data.indDedAmount} FAM ${data.famDedAmount}`;
    dedMetInputFour.value = `IND ${data.indDedMet} FAM ${data.famDedMet}`;
    oopInputFour.value = `IND ${data.indOopAmount} FAM ${data.famOopAmount}`;
    oopMetInputFour.value = `IND ${data.indOopMet} FAM ${data.famOopMet}`;
    policyHolderInputFour.value = data.policyHolder;
    claimAddressInputFour.value = `PO Box ${data.poBox}`;
    payorIDInputFour.value = data.payerId;
    hsahraInputFour.value = data.hsaHra;
  }
}

function handleStandardFormat(text) {
  const effMatch = text.match(/effective date:\s*(.*?)\s*pcp:/i);
  const otherMatch = text.match(/other:\s*(.*?)\s*(?:\n|$)/i);
  const pcpMatch = text.match(/pcp:\s*(.*?)\s*(?:\n|$)/i);
  const planMatch = text.match(/plan:\s*(.*?)\s*type:/i);
  const deductibleMatch = text.match(/deductible:\s*(.*?)\s*group name:/i);
  const groupMatch = text.match(/group name:\s*(.*?)\s*(?:plan:|$)/i);
  const groupNumberMatch = text.match(
    /group number:\s*(.*?)\s*(?:deductible:|$)/i,
  );
  const sickMatch = text.match(/sick amount:\s*(.*?)\s*(?:group number:|$)/i);
  const medicareMatch = text.match(/medicareDed:\s*(\d+)\s*\/\s*MET\s*(\d+)/i);

  // Step 1: Parse text into object
  const parsed = {
    effectiveDate: effMatch ? formatDate(effMatch[1].trim()) : "",
    otherPayer: otherMatch ? otherMatch[1].trim() : "",
    pcp: pcpMatch ? pcpMatch[1].trim() : "",
    plan: planMatch ? planMatch[1].trim() : "",
    deductible: deductibleMatch ? deductibleMatch[1].trim() : "",
    group: groupMatch ? groupMatch[1].trim() : "",
    groupNumber: groupNumberMatch ? groupNumberMatch[1].trim() : "",
    sickAmount: sickMatch ? sickMatch[1].trim() : "",
    deductiblePartBAmount: medicareMatch ? medicareMatch[1] : "",
    dedPartBRemainingAmount: medicareMatch ? medicareMatch[2] : "",
  };

  // Step 2: Format data
  const formatted = formatData(parsed);

  // Step 3: Fill form
  fillForm(formatted);
}

function handleUHCFormat(text) {
  const moneyValuePattern = "\\$?\\s*([\\d,]+(?:\\.\\d+)?)|FULLY\\s+MET";

  function extractLabeledValue(label) {
    const match = text.match(
      new RegExp(`${label}\\s*:\\s*(${moneyValuePattern})`, "i"),
    );
    if (!match) return "";
    return match[1].toUpperCase() === "FULLY MET"
      ? "FULLY MET"
      : match[1].replace(/[$,\s]/g, "");
  }

  const effMatch = text.match(/effective date:\s*(.*?)\s*pcp:/i);
  const pcpMatch = text.match(/pcp:\s*(.*?)\s*other:/i);
  const otherMatch = text.match(/other:\s*(.*?)\s*plan:/i);
  const planMatch = text.match(/plan:\s*(.*?)\s*type:/i);
  const typeMatch = text.match(/type:\s*(.*?)\s*policy holder:/i);
  const policyHolderMatch = text.match(
    /policy holder:\s*(.*?)\s*group number:/i,
  );
  const groupNumberMatch = text.match(/group number:\s*(.*?)\s*po box:/i);
  const poBoxMatch = text.match(/po box:\s*(.*?)\s*payer id:/i);
  const payerIdMatch = text.match(/payer id:\s*(.*?)\s*hsa or hra:/i);
  const hsaHraMatch = text.match(
    /hsa or hra:\s*(.*?)\s*individual deductible:/i,
  );

  const indDedAmount = extractLabeledValue("individual deductible");
  const indDedMet = extractLabeledValue("indvidual ded met");
  const indOopAmount = extractLabeledValue("individual oop max");
  const indOopMet = extractLabeledValue("individual oop met");
  const famDedAmount = extractLabeledValue("family deductible");
  const famDedMet = extractLabeledValue("family ded met");
  const famOopAmount = extractLabeledValue("family oop max");
  const famOopMet = extractLabeledValue("family oop met");

  const parsed = {
    effectiveDate: effMatch ? formatDate(effMatch[1].trim()) : "",
    pcp: pcpMatch ? pcpMatch[1].trim() : "",
    otherPayer: otherMatch ? otherMatch[1].trim() : "",
    plan: planMatch ? planMatch[1].trim() : "",
    type: typeMatch ? typeMatch[1].trim() : "",
    policyHolder: policyHolderMatch ? policyHolderMatch[1].trim() : "",
    groupNumber: groupNumberMatch ? groupNumberMatch[1].trim() : "",
    poBox: poBoxMatch ? poBoxMatch[1].trim() : "",
    payerId: payerIdMatch ? payerIdMatch[1].trim() : "",
    hsaHra: hsaHraMatch ? hsaHraMatch[1].trim() : "",
    indDedAmount,
    indDedMet,
    indOopAmount,
    indOopMet,
    famDedAmount,
    famDedMet,
    famOopAmount,
    famOopMet,
  };

  const formatted = formatData(parsed);
  fillForm(formatted);
}

pastePortalButton.addEventListener("click", async () => {
  const text = await navigator.clipboard.readText();

  if (text.toLowerCase().includes("payer id:")) {
    handleUHCFormat(text);
  } else {
    handleStandardFormat(text);
  }
});
/*--------- Extract dates to get physical exam eligibility ---------*/
extractDOBandDOS.addEventListener("click", async () => {
  const clipboardText = await navigator.clipboard.readText();

  extractDOBandDOSfunc(clipboardText);
});

function extractDOBandDOSfunc(text) {
  const dobMatch = text.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/);
  const dosMatch = text.match(/DOS:\s*(\d{2}\/\d{2}\/\d{4})/);

  const dob = dobMatch ? dobMatch[1] : "";
  const dos = dosMatch ? dosMatch[1] : "";

  if (radioAHCCCS.checked || radioCommerical.checked) {
    dateBirthInput.value = dob;
    dateOfBirthValue = dateBirthInput.value;
    lastPhysicalServiceDate.value = dos;
    lastPEValue = lastPhysicalServiceDate.value;
  } else {
    lastPhysicalServiceDate.value = dos;
    lastPEValue = lastPhysicalServiceDate.value;
  }
}

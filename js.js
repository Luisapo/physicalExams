const dateBirthInput = document.getElementById("dateOfBirth");
const DOS = document.getElementById('dateOfService');
const dateVerified = document.getElementById('verificationDate')
const lastPhysicalServiceDate = document.getElementById('lastPhysicalDone');
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(nextDay.getDate() + 1);
const formattedNextDay = nextDay.toISOString().substring(0,10);
const submitButton = document.getElementsByClassName('submit');
const copyButtons = document.getElementsByClassName('copyButton');
const undoButton = document.getElementById('undoButton');
const verificationAndPE = document.getElementsByClassName('copyBothTextBoxes');
let textBoxes = document.getElementsByClassName('output');
const resetButtons = document.getElementsByClassName('reset');
const radioAHCCCS = document.getElementById('AHCCCS');
const radioAHCCCSVerification = document.getElementById('AHCCCSVerification');
const radioMedicare = document.getElementById('medicarePartB');
const medicareGcodes = document.getElementById('assignGcode');
const medicareGcodeButtons =  document.querySelectorAll('.radioStyle input[type="radio"]');
const radioMedicareVerification = document.getElementById('medicarePartBVerification');
const radioMedicareReplacement = document.getElementById('medicareReplacement');
//const radioMedicareReplacementVerification = document.getElementById('medicareReplacementVerification');
const radioCommerical = document.getElementById('commercial')
const radioCommericalVerification = document.getElementById('commercialVerification');
let textBox = document.getElementById('output');
const verificationTemplateOptions = document.querySelectorAll('input[name="checkboxes"]');
const templateContents = document.querySelectorAll('[id^="template"]');
const getInitials = document.getElementById('initals');
const isVirtualOffice = document.getElementById('isVO');
const ahcccsInputBoxes = document.getElementById('verification1');
const medicareInputBoxes = document.getElementById('verification2');
const replacementInputBoxes = document.getElementById('verification3');
const commericalInputBoxes = document.getElementById('verification4');
const newPatientCheckLabel = document.getElementById('newPatient');
const newPatientCheckCheckBox = document.getElementById('autoEligible');


// ahcccs input boxes
const effectiveDateInput = document.getElementById('effectiveDate');
const sickInput = document.getElementById('sick');
const thirdPartyInput = document.getElementById('thirdParty');
const medicareBoxInput = document.getElementById('medicareBox');
const spokeInput = document.getElementById('spoke');
const pcpInput = document.getElementById('primaryCarePhysician');
const mercyCareOptions = document.getElementById('mercyCare');
const mercyCareCheck = document.getElementById('mercyCarePlan')
const mercyCarelabel = document.getElementById('mercyCarelabel');
const rateGroupInput = document.getElementById('mercyCareAdditional');

// medicare input boxes
const effectiveDateInputTwo = document.getElementById('effectiveDate2');
const coinsInput2 = document.getElementById('coins2');
const dedInputTwo = document.getElementById('ded2');
const dedMetInputTwo = document.getElementById('dedMet2');
const ineligibleInput = document.getElementById('ineligiblePeriod');
const hmoInput = document.getElementById('hmo');
const mspInput = document.getElementById('msp');
const spokeInputTwo = document.getElementById('spoke2');

// medicare input boxes
const contractedInputThree = document.getElementById('contracted3');
const effectiveDateInputThree = document.getElementById('effectiveDate3');
const planInputThree = document.getElementById('plan3');
const groupInputThree = document.getElementById('group3');
const sickInputThree = document.getElementById('sick3');
const dedinputThree = document.getElementById('ded3');
const otherInsThree = document.getElementById('otherIns3')
const verifiedOnlineInputThree = document.getElementById('verifiedOnline3');
const pcpInputThree = document.getElementById('primaryCarePhysician3');

//commercial input boxes

const contractedInputFour = document.getElementById('contracted4');
const sickInputFour = document.getElementById('sick4');
const hsahraInputFour = document.getElementById('hsahra4');
const telehealthInputFour = document.getElementById('telehealth4');
const pExamsInputFour = document.getElementById('pExams4');
const proceduresInputFour = document.getElementById('procedures4');
const labsInputFour = document.getElementById('labs4');
const immunizationsInputFour = document.getElementById('immunizations4');
const covidInputFour = document.getElementById('covid4');
const spokeInputFour = document.getElementById('spoke4');
const referenceInputFour = document.getElementById('reference4');
const effectiveDateInputFour = document.getElementById('effectiveDate4');
const planTypeInputFour = document.getElementById('planType4');
const networkInputFour = document.getElementById('plan4');
const primarycareCommericalInputFour = document.getElementById('primarycareCommerical4');
const otherIns4Input = document.getElementById('otherIns4');
const policyHolderInputFour = document.getElementById('policyHolder4');
const groupInputFour = document.getElementById('group4');
const oopInputFour = document.getElementById('oop4');
const oopMetInputFour = document.getElementById('oopMet4');
const deductibleInputFour = document.getElementById('deductible4');
const dedMetInputFour = document.getElementById('dedMet4');
const claimAddressInputFour = document.getElementById('claimAddress4');
const payorIDInputFour = document.getElementById('payorID4');
const verifiedOnlineInputFour = document.getElementById('verifiedOnline4');



//-------------------Date Of birth Formatting--------------------//

dateBirthInput.addEventListener("input", function() {
    let input = this.value;
    if(input.length > 30) {             // makes sure length does not exceed 10
        this.value = input.substring(0, 10); 
        return;
    }

    input = input.replace(/\s*\D\s*/g, '');   // Only allow numbers

    if(input.length > 1) {
        input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }    
    this.value = input
    dateOfBirthValue = this.value;    
})

//-------------------Last PE Done Formatting--------------------//

lastPhysicalServiceDate.addEventListener("input", function() {
    let input = this.value;
    if(input.length > 30) {
        this.value = input.substring(0, 10); 
        return;
    }

    input = input.replace(/\s*\D\s*/g, '');

    if(input.length > 1) {
        input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }    
    this.value = input
    lastPEValue = this.value
})

//-------------------Allows the box content to be completely selected--------------------//
dateBirthInput.addEventListener("focus", function() {
    this.select();
})

lastPhysicalServiceDate.addEventListener("focus", function(){
    this.select();
})


//-------------------For patient less than 2 years old--------------------//

const calculateAgeInMonths = (birthdate) => {    
    const birthDate = new Date(birthdate);     
    const lastPE = new Date(lastPEValue);
    const dateOfServiceValue = new Date(DOS.value);
    const oneDay = 24 * 60 * 60 * 1000; 
    
    const ageInMilliseconds = dateOfServiceValue - birthDate;
    
    const ageInDays = Math.floor(ageInMilliseconds / oneDay);
    
    
    let totalMonthsLastPE = (lastPE - birthDate) / (oneDay * 30.4)
    
    if(totalMonthsLastPE>0.7 && totalMonthsLastPE<0.99){
        totalMonthsLastPE = Math.ceil((lastPE - birthDate) / (oneDay * 30.4));
    } else {
        totalMonthsLastPE = Math.floor((lastPE - birthDate) / (oneDay * 30.4));
    }    
    getNextPhysicalExamination(ageInDays, totalMonthsLastPE, birthDate);
}

const getNextPhysicalExamination = (totalDays, lastPhysicalAge, birthDate) => {
    textBox.value = ""

    const schedule = [1, 2, 4, 6, 9, 12, 15, 18, 24]; // The schedule for physical examinations
    
    let nextIndex = schedule.findIndex(months => months > lastPhysicalAge); // Find the index of the next scheduled examination
    
    if (nextIndex === -1) {        
        return moreThanTwoLessThanTwotwo(birthDate);
    }  
    const nextPhysicalAge = schedule[nextIndex]; // Check at which the next examination is due

    if (totalDays > (nextPhysicalAge * 30.33)) { // If the patient is already eligible for the next examination, return the date
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    } else {
        const nextExaminationDate = new Date(birthDate);
        nextExaminationDate.setMonth(nextExaminationDate.getMonth() + nextPhysicalAge);
        textBox.value += ` PE: ELIGIBLE ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextExaminationDate.toLocaleDateString()}.`;
    }
}



const calculateAgeInMonthsCommerical = (birthdate) => {    
    const birthDate = new Date(birthdate);     
    const lastPE = new Date(lastPEValue);
    const dateOfServiceValue = new Date(DOS.value);
    const oneDay = 24 * 60 * 60 * 1000; 
    
    const ageInMilliseconds = dateOfServiceValue - birthDate;
    
    const ageInDays = Math.floor(ageInMilliseconds / oneDay);

    const totalMonthsLastPE = Math.floor((lastPE - birthDate) / (oneDay * 30.4));
    getNextPhysicalExaminationCommercial(ageInDays, totalMonthsLastPE, birthDate);
}

const getNextPhysicalExaminationCommercial = (totalDays, lastPhysicalAge, birthDate) => {
    textBox.value = ""

    const schedule = [1, 2, 4, 6, 9, 12, 15, 18, 24]; // The schedule for physical examinations
    
    let nextIndex = schedule.findIndex(months => months > lastPhysicalAge); // Find the index of the next scheduled examination
    
    if (nextIndex === -1) {        
        return textBox.value += "Recheck Dates!";
    }  
    const nextPhysicalAge = schedule[nextIndex]; // Check at which the next examination is due

    if (totalDays > (nextPhysicalAge * 30.33)) { // If the patient is already eligible for the next examination, return the date
        textBox.value += ` PE: ELIGIBLE W/O OV`;
    } else {
        const nextExaminationDate = new Date(birthDate);
        nextExaminationDate.setMonth(nextExaminationDate.getMonth() + nextPhysicalAge);
        textBox.value += ` PE: ELIGIBLE ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextExaminationDate.toLocaleDateString()}.`;
    }
}

//-------------------For patient less than 22 years old / Also used for Medicare Part B / Also used for Commercial over 2 y/o--------------------//


const moreThanTwoLessThanTwotwo = (birthDate) => {    
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const lastPEYear = lastPE.getFullYear();
    const nextPEYear = lastPE.getFullYear() + 1;
    const lastPEMonth = lastPE.getMonth() + 1;
    const lastPEDay = lastPE.getDate();
    const birthMonth = birthDate.getMonth() + 1;
    const birthMonthFormatted = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();    
    const currentYear = currentDate.getFullYear();     
    const dateOfService = DOS.value;
    const dateOfServiceFormattted = new Date(dateOfService)
    const dateOfServiceFormatttedActualDate =  dateOfServiceFormattted.setDate(dateOfServiceFormattted.getDate() + 1);
    const dateOfServiceDayArray = dateOfService.split("-");
    const dateOfServiceMonth = parseInt(dateOfServiceDayArray[1]);
    const dateOfServiceDay = parseInt(dateOfServiceDayArray[2]);
    const timeDifference = currentDate - lastPE;
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;    

    let nextEligibleDate = ''
    if (
        lastPEYear <= currentYear &&
        (
            (
                lastPEMonth < birthMonth &&
                (lastPEDay < birthDay || lastPEMonth === birthMonth) ||
                dateOfServiceMonth < birthMonthFormatted
            ) ||
            (
                dateOfServiceMonth === birthMonthFormatted &&
                dateOfServiceDay <= birthDay
            )
        )
    ) {
        nextEligibleDate = new Date(currentYear, birthMonth - 1, birthDay);
    } else {
        nextEligibleDate = new Date(nextPEYear, birthMonth -1 , birthDay);
    }   
 
    if (timeDifference > oneYearInMilliseconds) {        //Last PE more than a year ago
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    }else if(lastPEMonth < birthMonth && lastPEDay < birthDay && lastPEYear < currentYear) { // last PE month, day less then DOB and done last year        
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    }else if(lastPEYear === currentYear && birthMonth < dateOfServiceMonth && lastPEMonth < birthMonth) { //last PE done current year and PE month before DOB        
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    }else if(lastPEYear === currentYear && birthMonth === dateOfServiceMonth && birthDay < dateOfServiceDay && lastPEMonth < birthMonth) { //last PE done current year and PE month before DOB                
        textBox.value += ` PE: ELIGIBLE W/ OV`;        
    }else if(lastPEYear === currentYear && lastPEMonth === birthMonth && lastPEDay < birthDay && dateOfServiceDay > birthDay) { //last PE done current year and PE donde in curreny month and pt had DOB 
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    }else if (lastPEYear < currentYear && lastPEMonth < birthMonth || (lastPEMonth === birthMonth && lastPEDay < birthDay)) {
        textBox.value += ` PE: ELIGIBLE W/ OV`;        
    }else if (nextEligibleDate > dateOfServiceFormatttedActualDate) {
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()}`;
    }else if (nextEligibleDate <= dateOfServiceFormatttedActualDate) {
        textBox.value += ` PE: ELIGIBLE W/ OV`;    
    }else if((currentYear > lastPEYear || currentYear === lastPEYear) && (lastPEMonth < birthMonth || 
        lastPEMonth === birthMonth) && lastPEDay <= birthDay ){            
            nextEligibleDate.setFullYear(currentYear) +1;
            textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()}`;

    } else {
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()}`;
    }
}

//-------------------For patient more than 21 years old--------------------//

const Overtwentyone = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);    
    const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
    const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;     
    const dateOfService = new Date(DOS.value) - lastPE; 
    


    if (timeDifference > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/ OV`;
    } else if (dateOfService > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/ OV`;    
    } else {        
        const nextEligibleDate = new Date(lastPE);
        nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

        
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

        const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, '0');
        const day = nextEligibleDate.getDate().toString().padStart(2, '0');
        const year = nextEligibleDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate}`;
    }
}


const OvertwentyoneCommerical = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
    const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;     
    const dateOfService = new Date(DOS.value) - lastPE;
//    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 

    if (timeDifference > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/O OV`;
    } else if (dateOfService > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/O OV`; 
    } else {
        
        const nextEligibleDate = new Date(lastPE);
        nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

        
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

        const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, '0');
        const day = nextEligibleDate.getDate().toString().padStart(2, '0');
        const year = nextEligibleDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate}`;
    }
}


const medicarePartBPhysical = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const timeDifference = currentDate.getFullYear() - lastPE.getFullYear();
    const oneYearInMilliseconds = 1 * 365 * 24 * 60 * 60 * 1000;     
    const dateOfService = new Date(DOS.value) - lastPE;
//    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 

    if (timeDifference > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/ OV ${selectedRadioButton}`;
    } else if (dateOfService > oneYearInMilliseconds) {
        textBox.value += ` PE: ELIGIBLE W/ OV ${selectedRadioButton}`; 
    } else {
        
        const nextEligibleDate = new Date(lastPE);
        nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE
        
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

        const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, '0');
        const day = nextEligibleDate.getDate().toString().padStart(2, '0');
        const year = nextEligibleDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate} ${selectedRadioButton}`;
    }
}
//---------------------------Beginning of AHCCCS Section----------------------------------//

const ahcccsPE = () => {
    const birthDate = new Date(dateOfBirthValue);        
    const oneDay = 24 * 60 * 60 * 1000;     
    const ageInMilliseconds = currentDate - birthDate;    
    const ageInDays = Math.floor(ageInMilliseconds / oneDay);
    const age = ageInDays/30.4 /12    

    if(age < 3){        
        calculateAgeInMonths(birthDate);
    } else if(age < 21) {
        moreThanTwoLessThanTwotwo(birthDate);
    }else {
        Overtwentyone()
    }
}

//------------------------------End of AHCCCS Section----------------------------------//



//------------------------------Beginning of Medicare Replacement Section----------------------------------//


const replacementPE = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const lastPEYear = lastPE.getFullYear();
    const currentYear = currentDate.getFullYear();
    if(lastPEYear === currentYear) {
        textBox.value += ` PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON 01/01/${currentYear + 1} ${selectedRadioButton}`;
    }else if(lastPEYear < currentYear) {
        textBox.value += ` PE: ELIGIBLE W/ OV ${selectedRadioButton}`;
    } else {
        textBox.value += ` Recheck Dates!`;
    }
}
//------------------------------End of Medicare ReplacementSection----------------------------------//




//------------------------------Beginning of Commerical Insurance----------------------------------//


const commercialPE = () => {
    const birthDate = new Date(dateOfBirthValue);        
    const oneDay = 24 * 60 * 60 * 1000;     
    const ageInMilliseconds = currentDate - birthDate;    
    const ageInDays = Math.floor(ageInMilliseconds / oneDay);
    const age = ageInDays/30.4 /12
     
    if(age < 2){        
        calculateAgeInMonthsCommerical(birthDate);
    } else {
        OvertwentyoneCommerical()
    }
}

//------------------------------End of Commerical Insurance----------------------------------//


//-------------------Default Value for Date of service--------------------//

DOS.value = formattedNextDay;
dateVerified.value = currentDate.toISOString().substring(0,10);



//-------------------Special radio features--------------------//




radioAHCCCS.addEventListener("change", () => {
    if(radioAHCCCS.checked) {
        cleanSlatePE()
        textBox.placeholder = "";
        newPatientCheckCheckBox.checked = false;
        newPatientCheckLabel.style.display = 'block';    
        medicareGcodes.style.display = 'none';
    }
} )

radioMedicare.addEventListener("change", () => {    
    if(radioMedicare.checked){
        cleanSlatePE()    
        newPatientCheckLabel.style.display = 'none';
        dateBirthInput.classList.add('greyedOut');
        dateBirthInput.value = "01/01/1900";
        dateBirthInput.readOnly = true;
        medicareGcodes.style.display = 'block';
        textBox.value = "";
        textBox.placeholder = "Remember to check correct GCODE for PE in Noridian or medical summary.";
        if(selectedRadioButton === 'G0402'){
            lastPhysicalServiceDate.classList.add('greyedOut');
            lastPhysicalServiceDate.value = '01/01/1900';
            lastPEValue = '01/01/1900';
            lastPhysicalServiceDate.readOnly = true;
        }    
    }
})

radioMedicareReplacement.addEventListener("change", () => {    
    if(radioMedicareReplacement.checked) {        
        cleanSlatePE()    
        newPatientCheckLabel.style.display = 'none';
        dateBirthInput.classList.add('greyedOut');
        dateBirthInput.value = "01/01/1900";
        dateBirthInput.readOnly = true;
        medicareGcodes.style.display = 'block';
        textBox.value = "";
        textBox.placeholder = "Remember to check correct GCODE for PE in Noridian or medical summary.";
        if(selectedRadioButton === 'G0402'){
            lastPhysicalServiceDate.classList.add('greyedOut');
            lastPhysicalServiceDate.value = '01/01/1900';
            lastPEValue = '01/01/1900';
            lastPhysicalServiceDate.readOnly = true;
        }    
    }
})


radioCommerical.addEventListener("change", ()=>{    
    if(radioCommerical.checked) {
        cleanSlatePE()
        textBox.placeholder = "";
        newPatientCheckCheckBox.checked = false;
        newPatientCheckLabel.style.display = 'block';    
        medicareGcodes.style.display = 'none';
    }
})


//-------------------Sumbit data values for results--------------------//


for(let i = 0; i < verificationAndPE.length; i++){
    verificationAndPE[i].addEventListener('click', () =>{
        if(verificationAndPE[i] === verificationAndPE[0] || verificationAndPE[i] === verificationAndPE[1]) {
        textBox.style.color = 'black';
        textBoxes[1].style.color = 'black';
        

        if (dateOfBirthChecker(dateBirthInput.value) ===true && 
            dateOfBirthChecker(lastPhysicalServiceDate.value) === true &&
            dateValidation(dateBirthInput.value) === true &&
            dateValidation(lastPhysicalServiceDate.value) === true){
            if(radioAHCCCS.checked && ahcccsInputBoxes.checked){
                ahcccsPE();
                AHCCCSVerification();
                textBox.value = textBoxes[1].value + textBox.value;
                textBoxes[1].value = textBox.value                
            }else if(radioMedicare.checked && medicareInputBoxes.checked){
                medicarePartBPhysical();
                medicareVerification();
                textBox.value = textBoxes[1].value + textBox.value;
                textBoxes[1].value = textBox.value
            }else if(radioMedicareReplacement.checked && replacementInputBoxes.checked) {
                replacementPE();
                replacementVerification();
                textBox.value = textBoxes[1].value + textBox.value;
                textBoxes[1].value = textBox.value
            } else if(radioCommerical.checked && commericalInputBoxes.checked){
                commercialPE();
                commercialVerificationText();
                textBox.value = textBoxes[1].value + textBox.value;
                textBoxes[1].value = textBox.value
            } else{
                textBox.style.color = 'red';
                textBox.value = 'Insurances Do not Match';
                textBoxes[1].value = "";
                textBoxes[1].style.color = 'red';
                textBoxes[1].value = 'Insurances Do not Match'
                return  
            }
        }else {
            textBox.value = "";
            textBox.style.color = "red";
            return textBox.value = "Check dates!";
            }        
  
            textBoxes[i].select();
            document.execCommand('copy');
            textBoxes[1].setSelectionRange(0, 0);

            verificationAndPE[0].innerText = 'Copied';
            verificationAndPE[0].style.color = "#ffffff";
            verificationAndPE[0].style.background = '#32936f';
            verificationAndPE[1].innerText = 'Copied';
            verificationAndPE[1].style.color = "#ffffff";
            verificationAndPE[1].style.background = '#32936f';
            setTimeout(() => {
                verificationAndPE[0].innerText = 'Verifcation+PE';
                verificationAndPE[0].style.background = 'linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)';
                verificationAndPE[0].style.color = "#000000";
                verificationAndPE[1].innerText = 'Verifcation+PE';
                verificationAndPE[1].style.background = 'linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)';
                verificationAndPE[1].style.color = "#000000";
            }, 1000);

        }
        
    })
}




for(let i = 0; i < submitButton.length; i++){
    submitButton[i].addEventListener('click', () =>{
        if(submitButton[i] === submitButton[0] ) {
        textBox.style.color = 'black';

        if (dateOfBirthChecker(dateBirthInput.value) ===true && 
            dateOfBirthChecker(lastPhysicalServiceDate.value) === true &&
            dateValidation(dateBirthInput.value) === true &&
            dateValidation(lastPhysicalServiceDate.value) === true){
            if(radioAHCCCS.checked){
                ahcccsPE();
            }else if(radioMedicare.checked){
                medicarePartBPhysical();
            }else if(radioMedicareReplacement.checked) {
                replacementPE();        
            } else if(radioCommerical.checked){
                commercialPE();
            } else{
                textBox.value = "";
                textBox.style.color = 'red';
                textBox.value = 'Please choose an insurance type.';        
            }
        }else {
            textBox.value = "";
            textBox.style.color = "red";
            return textBox.value = "Check dates!";
            }
        }else if(submitButton[i] === submitButton[1]){
                textBoxes[1].style.color = 'black';
            if(ahcccsInputBoxes.checked){
                AHCCCSVerification();
            }else if(medicareInputBoxes.checked){
                medicareVerification();
            }else if(replacementInputBoxes.checked) {
                replacementVerification();
            }else if(commericalInputBoxes.checked) {
                commercialVerificationText();            
            }else{
                textBoxes[1].value = "";
                textBoxes[1].style.color = 'red';
                textBoxes[1].value = 'Please choose an insurance type.';    
            }            
  
            textBoxes[i].select();
            document.execCommand('copy');
            textBoxes[1].setSelectionRange(0, 0);
        
            submitButton[1].innerText = 'Copied';
            submitButton[1].style.color = "#ffffff";
            submitButton[1].style.background = '#32936f';
            setTimeout(() => {
                submitButton[1].innerText = 'Submit';
                submitButton[1].style.background = 'linear-gradient(to bottom, #7892c2 5%, #476e9e 100%)';
                submitButton[1].style.color = "#ffffff";
            }, 1000);

        }
        
    })
}
    

//-------------------Copy data values--------------------//

for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', () => {
      const textBox = textBoxes[i]; // Get the corresponding textBox for the clicked copyButton
  
      textBox.select();
      document.execCommand('copy');
      textBox.setSelectionRange(0, 0);
  
      copyButtons[i].innerText = 'Copied';
      copyButtons[i].style.color = "#ffffff";
      copyButtons[i].style.background = '#32936f';
      setTimeout(() => {
        copyButtons[i].innerText = 'Copy';
        copyButtons[i].style.background = 'linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%)';
        copyButtons[i].style.color = "#505739";
      }, 1000);
    });
  }


for (let i = 0; i < resetButtons.length; i++) {
    if(resetButtons[i] === resetButtons[0]){
        resetButtons[i].addEventListener('click', () => {
            location.reload();
    })    

    }else if(resetButtons[i] === resetButtons[1]){
        resetButtons[i].addEventListener('click', () => {
        textBoxes[0].value = "";
        textBoxes[1].value = "";
        let inputs = [effectiveDateInput.value, effectiveDateInputTwo.value, effectiveDateInputThree.value, effectiveDateInputFour.value]
        if(inputs.every(input => input === "")){
        }else{
            getLastValuesEntered();            
        }        
        resetInputValues();
        if(radioAHCCCS.checked || radioCommerical.checked ){
            // cleanSlatePE()
        }
        })  
    }
}
  

// Set up a function to reset the input boxes
const originalValues = {
  // ahcccs input boxes
  effectiveDate: effectiveDateInput.value,
  sick: sickInput.value,
  thirdParty: thirdPartyInput.value,
  medicareBox: medicareBoxInput.value,
  spoke: spokeInput.value,
  primaryCarePhysician: pcpInput.value,
  rateGroup: rateGroupInput.value,

  // medicare input boxes
  effectiveDateTwo: effectiveDateInputTwo.value,
  coins2: coinsInput2.value,
  ded2: dedInputTwo.value,
  dedMet2: dedMetInputTwo.value,
  ineligiblePeriod: ineligibleInput.value,
  hmo: hmoInput.value,
  msp: mspInput.value,
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
  covidFour: covidInputFour.value,
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
  verifiedOnlineFour: verifiedOnlineInputFour.value
};


function resetInputValues() {
  // Reset ahcccs input boxes
  effectiveDateInput.value = originalValues.effectiveDate;
  sickInput.value = originalValues.sick;
  thirdPartyInput.value = originalValues.thirdParty;
  medicareBoxInput.value = originalValues.medicareBox;
  spokeInput.value = originalValues.spoke;
  pcpInput.value = originalValues.primaryCarePhysician;
  rateGroupInput.value = originalValues.rateGroup;

  // Reset medicare input boxes
  effectiveDateInputTwo.value = originalValues.effectiveDateTwo;
  coinsInput2.value = originalValues.coins2;
  dedInputTwo.value = originalValues.ded2;
  dedMetInputTwo.value = originalValues.dedMet2;
  ineligibleInput.value = originalValues.ineligiblePeriod;
  hmoInput.value = originalValues.hmo;
  mspInput.value = originalValues.msp;
  spokeInputTwo.value = originalValues.spokeTwo;

  // Reset medicare input boxes
  contractedInputThree.value = originalValues.contractedThree;
  effectiveDateInputThree.value = originalValues.effectiveDateThree;
  planInputThree.value = originalValues.planThree;
  groupInputThree.value = originalValues.groupThree;
  sickInputThree.value = originalValues.sickThree;
  dedinputThree.value =  originalValues.sickThree;
  otherInsThree.value =  originalValues.sickThree; 
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
  covidInputFour.value = originalValues.covidFour;
  spokeInputFour.value = originalValues.spokeFour;
  referenceInputFour.value = originalValues.referenceFour;
  effectiveDateInputFour.value = originalValues.effectiveDateFour;
  planTypeInputFour.value = originalValues.planTypeFour;
  networkInputFour.value = originalValues.networkFour;
  primarycareCommericalInputFour.value = originalValues.primarycareCommericalFour;
  otherIns4Input.value = originalValues.primarycareCommericalFour
  policyHolderInputFour.value = originalValues.primarycareCommericalFour
  groupInputFour.value = originalValues.primarycareCommericalFour
  oopInputFour.value = originalValues.primarycareCommericalFour
  oopMetInputFour.value = originalValues.primarycareCommericalFour
  deductibleInputFour.value = originalValues.primarycareCommericalFour
  dedMetInputFour.value = originalValues.primarycareCommericalFour
  claimAddressInputFour.value = originalValues.primarycareCommericalFour
  payorIDInputFour.value = originalValues.primarycareCommericalFour
  
}


const previousValuesEntered = {
    currentEffectiveDateInput : effectiveDateInput.value,
    currentSickInput : sickInput.value,
    currentThirdPartyInput : thirdPartyInput.value,
    currentMedicareBoxInput : medicareBoxInput.value,
    currentSpokeInput : spokeInput.value,
    currentPcpInput : pcpInput.value,
    currentRateGroupInput : rateGroupInput.value,

    // Medicare  input boxes
    currentEffectiveDateInputTwo : effectiveDateInputTwo.value,
    currentCoinsInput2 : coinsInput2.value,
    currentDedInputTwo : dedInputTwo.value,
    currentDedMetInputTwo : dedMetInputTwo.value,
    currentIneligibleInput : ineligibleInput.value,
    currentHmoInput : hmoInput.value,
    currentMspInput : mspInput.value,
    currentSpokeInputTwo : spokeInputTwo.value,

    // Medicare Replacement input boxes
    currentContractedInputThree : contractedInputThree.value,
    currentEffectiveDateInputThree : effectiveDateInputThree.value,
    currentPlanInputThree : planInputThree.value,
    currentGroupInputThree : groupInputThree.value,
    currentSickInputThree : sickInputThree.value,
    currentDedinputThree : dedinputThree.value,
    currentOtherInsThree : otherInsThree.value,
    currentVerifiedOnlineInputThree : verifiedOnlineInputThree.value,
    currentPcpInputThree : pcpInputThree.value,

    // Commercial input boxes
    currentEffectiveDateInput : effectiveDateInput.value,
    currentSickInput : sickInput.value,
    currentThirdPartyInput : thirdPartyInput.value,
    currentMedicareBoxInput : medicareBoxInput.value,
    currentSpokeInput : spokeInput.value,
    currentPcpInput : pcpInput.value,
    currentRateGroupInput : rateGroupInput.value,

    // Medicare  input boxes
    currentEffectiveDateInputTwo : effectiveDateInputTwo.value,
    currentCoinsInput2 : coinsInput2.value,
    currentDedInputTwo : dedInputTwo.value,
    currentDedMetInputTwo : dedMetInputTwo.value,
    currentIneligibleInput : ineligibleInput.value,
    currentHmoInput : hmoInput.value,
    currentMspInput : mspInput.value,
    currentSpokeInputTwo : spokeInputTwo.value,

    // Medicare Replacement input boxes
    currentContractedInputThree : contractedInputThree.value,
    currentEffectiveDateInputThree : effectiveDateInputThree.value,
    currentPlanInputThree : planInputThree.value,
    currentGroupInputThree : groupInputThree.value,
    currentSickInputThree : sickInputThree.value,
    currentDedinputThree : dedinputThree.value,
    currentOtherInsThree : otherInsThree.value,
    currentVerifiedOnlineInputThree : verifiedOnlineInputThree.value,
    currentPcpInputThree : pcpInputThree.value,

    // Commercial input boxes
    currentContractedInputFour : contractedInputFour.value,
    currentSickInputFour : sickInputFour.value,
    currentHsahraInputFour : hsahraInputFour.value,
    currentTelehealthInputFour : telehealthInputFour.value,
    currentPExamsInputFour : pExamsInputFour.value,
    currentProceduresInputFour : proceduresInputFour.value,
    currentLabsInputFour : labsInputFour.value,
    currentImmunizationsInputFour : immunizationsInputFour.value,
    currentCovidInputFour : covidInputFour.value,
    currentSpokeInputFour : spokeInputFour.value,
    currentReferenceInputFour : referenceInputFour.value,
    currentEffectiveDateInputFour : effectiveDateInputFour.value,
    currentPlanTypeInputFour : planTypeInputFour.value,
    currentNetworkInputFour : networkInputFour.value,
    currentPrimarycareCommericalInputFour : primarycareCommericalInputFour.value,
    currentOtherIns4Input : otherIns4Input.value,
    currentPolicyHolderInputFour : policyHolderInputFour.value,
    currentGroupInputFour : groupInputFour.value,
    currentOopInputFour : oopInputFour.value,
    currentOopMetInputFour : oopMetInputFour.value,
    currentDeductibleInputFour : deductibleInputFour.value,
    currentDedMetInputFour : dedMetInputFour.value,
    currentClaimAddressInputFour : claimAddressInputFour.value,
    currentPayorIDInputFour : payorIDInputFour.value,
}


const getLastValuesEntered = () => {
    // medicaid Replacement input boxes
    previousValuesEntered.currentEffectiveDateInput = effectiveDateInput.value;
    previousValuesEntered.currentSickInput = sickInput.value;
    previousValuesEntered.currentThirdPartyInput = thirdPartyInput.value;
    previousValuesEntered.currentMedicareBoxInput = medicareBoxInput.value;
    previousValuesEntered.currentSpokeInput = spokeInput.value;
    previousValuesEntered.currentPcpInput = pcpInput.value;
    previousValuesEntered.currentRateGroupInput = rateGroupInput.value

    // Medicare  input boxes
    previousValuesEntered.currentEffectiveDateInputTwo = effectiveDateInputTwo.value;
    previousValuesEntered.currentCoinsInput2 = coinsInput2.value;
    previousValuesEntered.currentDedInputTwo = dedInputTwo.value;
    previousValuesEntered.currentDedMetInputTwo = dedMetInputTwo.value;
    previousValuesEntered.currentIneligibleInput = ineligibleInput.value;
    previousValuesEntered.currentHmoInput = hmoInput.value;
    previousValuesEntered.currentMspInput = mspInput.value;
    previousValuesEntered.currentSpokeInputTwo = spokeInputTwo.value;

    // Medicare Replacement input boxes
    previousValuesEntered.currentContractedInputThree = contractedInputThree.value;
    previousValuesEntered.currentEffectiveDateInputThree = effectiveDateInputThree.value;
    previousValuesEntered.currentPlanInputThree = planInputThree.value;
    previousValuesEntered.currentGroupInputThree = groupInputThree.value;
    previousValuesEntered.currentSickInputThree = sickInputThree.value;
    previousValuesEntered.currentDedinputThree = dedinputThree.value;
    previousValuesEntered.currentOtherInsThree = otherInsThree.value;
    previousValuesEntered.currentVerifiedOnlineInputThree = verifiedOnlineInputThree.value;
    previousValuesEntered.currentPcpInputThree = pcpInputThree.value;

    // Commercial input boxes
    previousValuesEntered.currentContractedInputFour = contractedInputFour.value;
    previousValuesEntered.currentSickInputFour = sickInputFour.value;
    previousValuesEntered.currentHsahraInputFour = hsahraInputFour.value;
    previousValuesEntered.currentTelehealthInputFour = telehealthInputFour.value;
    previousValuesEntered.currentPExamsInputFour = pExamsInputFour.value;
    previousValuesEntered.currentProceduresInputFour = proceduresInputFour.value;
    previousValuesEntered.currentLabsInputFour = labsInputFour.value;
    previousValuesEntered.currentImmunizationsInputFour = immunizationsInputFour.value;
    previousValuesEntered.currentCovidInputFour = covidInputFour.value;
    previousValuesEntered.currentSpokeInputFour = spokeInputFour.value;
    previousValuesEntered.currentReferenceInputFour = referenceInputFour.value;
    previousValuesEntered.currentEffectiveDateInputFour = effectiveDateInputFour.value;
    previousValuesEntered.currentPlanTypeInputFour = planTypeInputFour.value;
    previousValuesEntered.currentNetworkInputFour = networkInputFour.value;
    previousValuesEntered.currentPrimarycareCommericalInputFour = primarycareCommericalInputFour.value;
    previousValuesEntered.currentOtherIns4Input = otherIns4Input.value;
    previousValuesEntered.currentPolicyHolderInputFour = policyHolderInputFour.value;
    previousValuesEntered.currentGroupInputFour = groupInputFour.value;
    previousValuesEntered.currentOopInputFour = oopInputFour.value;
    previousValuesEntered.currentOopMetInputFour = oopMetInputFour.value;
    previousValuesEntered.currentDeductibleInputFour = deductibleInputFour.value;
    previousValuesEntered.currentDedMetInputFour = dedMetInputFour.value;
    previousValuesEntered.currentClaimAddressInputFour = claimAddressInputFour.value;
    previousValuesEntered.currentPayorIDInputFour = payorIDInputFour.value;
}


undoButton.addEventListener('click', function() {    
    effectiveDateInput.value = previousValuesEntered.currentEffectiveDateInput;
    sickInput.value = previousValuesEntered.currentSickInput;
    thirdPartyInput.value = previousValuesEntered.currentThirdPartyInput;
    medicareBoxInput.value = previousValuesEntered.currentMedicareBoxInput;
    spokeInput.value = previousValuesEntered.currentSpokeInput;
    pcpInput.value = previousValuesEntered.currentPcpInput;
    rateGroupInput.value = previousValuesEntered.currentRateGroupInput;

    // Medicare input boxes
    effectiveDateInputTwo.value = previousValuesEntered.currentEffectiveDateInputTwo;
    coinsInput2.value = previousValuesEntered.currentCoinsInput2;
    dedInputTwo.value = previousValuesEntered.currentDedInputTwo;
    dedMetInputTwo.value = previousValuesEntered.currentDedMetInputTwo;
    ineligibleInput.value = previousValuesEntered.currentIneligibleInput;
    hmoInput.value = previousValuesEntered.currentHmoInput;
    mspInput.value = previousValuesEntered.currentMspInput;
    spokeInputTwo.value = previousValuesEntered.currentSpokeInputTwo;

    // Medicare Replacement input boxes
    contractedInputThree.value = previousValuesEntered.currentContractedInputThree;
    effectiveDateInputThree.value = previousValuesEntered.currentEffectiveDateInputThree;
    planInputThree.value = previousValuesEntered.currentPlanInputThree;
    groupInputThree.value = previousValuesEntered.currentGroupInputThree;
    sickInputThree.value = previousValuesEntered.currentSickInputThree;
    dedinputThree.value = previousValuesEntered.currentDedinputThree;
    otherInsThree.value = previousValuesEntered.currentOtherInsThree;
    verifiedOnlineInputThree.value = previousValuesEntered.currentVerifiedOnlineInputThree;
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
    effectiveDateInputTwo.value = previousValuesEntered.currentEffectiveDateInputTwo;
    coinsInput2.value = previousValuesEntered.currentCoinsInput2;
    dedInputTwo.value = previousValuesEntered.currentDedInputTwo;
    dedMetInputTwo.value = previousValuesEntered.currentDedMetInputTwo;
    ineligibleInput.value = previousValuesEntered.currentIneligibleInput;
    hmoInput.value = previousValuesEntered.currentHmoInput; 
    mspInput.value = previousValuesEntered.currentMspInput;
    spokeInputTwo.value = previousValuesEntered.currentSpokeInputTwo;

    // Medicare Replacement input boxes
    contractedInputThree.value = previousValuesEntered.currentContractedInputThree;
    effectiveDateInputThree.value = previousValuesEntered.currentEffectiveDateInputThree;
    planInputThree.value = previousValuesEntered.currentPlanInputThree;
    groupInputThree.value = previousValuesEntered.currentGroupInputThree;
    sickInputThree.value = previousValuesEntered.currentSickInputThree;
    dedinputThree.value = previousValuesEntered.currentDedinputThree;
    otherInsThree.value = previousValuesEntered.currentOtherInsThree;
    verifiedOnlineInputThree.value = previousValuesEntered.currentVerifiedOnlineInputThree;
    pcpInputThree.value = previousValuesEntered.currentPcpInputThree;

    // Commercial input boxes
    contractedInputFour.value = previousValuesEntered.currentContractedInputFour;
    sickInputFour.value = previousValuesEntered.currentSickInputFour;
    hsahraInputFour.value = previousValuesEntered.currentHsahraInputFour;
    telehealthInputFour.value = previousValuesEntered.currentTelehealthInputFour;
    pExamsInputFour.value = previousValuesEntered.currentPExamsInputFour;
    proceduresInputFour.value = previousValuesEntered.currentProceduresInputFour;
    labsInputFour.value = previousValuesEntered.currentLabsInputFour;
    immunizationsInputFour.value = previousValuesEntered.currentImmunizationsInputFour;
    covidInputFour.value = previousValuesEntered.currentCovidInputFour;
    spokeInputFour.value = previousValuesEntered.currentSpokeInputFour;
    referenceInputFour.value = previousValuesEntered.currentReferenceInputFour;
    effectiveDateInputFour.value = previousValuesEntered.currentEffectiveDateInputFour;
    planTypeInputFour.value = previousValuesEntered.currentPlanTypeInputFour;
    networkInputFour.value = previousValuesEntered.currentNetworkInputFour;
    primarycareCommericalInputFour.value = previousValuesEntered.currentPrimarycareCommericalInputFour;
    otherIns4Input.value = previousValuesEntered.currentOtherIns4Input;
    policyHolderInputFour.value = previousValuesEntered.currentPolicyHolderInputFour;
    groupInputFour.value = previousValuesEntered.currentGroupInputFour;
    oopInputFour.value = previousValuesEntered.currentOopInputFour;
    oopMetInputFour.value = previousValuesEntered.currentOopMetInputFour;
    deductibleInputFour.value = previousValuesEntered.currentDeductibleInputFour;
    dedMetInputFour.value = previousValuesEntered.currentDedMetInputFour;
    claimAddressInputFour.value = previousValuesEntered.currentClaimAddressInputFour;
    payorIDInputFour.value = previousValuesEntered.currentPayorIDInputFour;
})


const dateOfBirthChecker = (dateString) => {
    
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(dateString)) {
        return false;
    }

    // Parse the date components
    const dateParts = dateString.split('/');
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Check if the month, day, and year are within valid ranges
    if (
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31 &&
        year >= 1900 && year <= new Date().getFullYear()
    ) {
        // Additional custom validation can be added here if needed
        return true;
    }

    return false;
}


const dateValidation = (dateString) => {
    const dateInquiry = new Date(dateString)
    if(dateInquiry <= currentDate){
        return true
    }
};

//------------make the appropriate template section show------------//

verificationTemplateOptions.forEach((verificationOption, index) => {
    verificationOption.addEventListener('change', () => {
      templateContents.forEach((contentElement, contentIndex) => {
        if (contentIndex === index) {
          contentElement.style.display = 'grid';
          textBoxes[1].value = "";
          if(contentIndex === 0){
            mercyCareOptions.style.display = "block";            
          }else{
            mercyCareOptions.style.display = "none";
          }          
        } else {
          contentElement.style.display = 'none';
        }
      });
    });
  });


  mercyCareCheck.addEventListener('change', () => {    
    if (mercyCareCheck.checked) { // If checked display the label        
        mercyCarelabel.style.display = 'block';
    } else {        
        mercyCarelabel.style.display = 'none';
    }
});



const AHCCCSVerification = () => {
    actualVerificationDate = dateVerified.value
    actualVerificationDateFormatted = actualVerificationDate.substring(5,7) +"/"+actualVerificationDate.substring(8,10)+"/" +actualVerificationDate.substring(0,4)
    let theVO = '';
    if(isVirtualOffice.checked) {
        theVO = ".VO";
    }

    if(mercyCareCheck.checked){
        textBoxes[1].value = (`${actualVerificationDateFormatted} ${getInitials.value}${theVO} EFF: ${(effectiveDateInput.value).trim()} |  SICK: ${sickInput.value}  | TPL: ${thirdPartyInput.value}  | MEDICARE: ${medicareBoxInput.value}  | RATE GROUP: ${(rateGroupInput.value).trim()} |  SPOKE: ${spokeInput.value}  | PCP: ${(pcpInput.value).trim()} `).toLocaleUpperCase() 

    } else {
        textBoxes[1].value = (`${actualVerificationDateFormatted} ${getInitials.value}${theVO} EFF: ${(effectiveDateInput.value).trim()} |  SICK: ${sickInput.value}  | TPL: ${thirdPartyInput.value}  | MEDICARE: ${medicareBoxInput.value} |  SPOKE: ${spokeInput.value}  | PCP: ${(pcpInput.value).trim()} `).toLocaleUpperCase() 
    }
  
    
}

const medicareVerification = () => {
    actualVerificationDate = dateVerified.value
    actualVerificationDateFormatted = actualVerificationDate.substring(5,7) +"/"+actualVerificationDate.substring(8,10)+"/" +actualVerificationDate.substring(0,4)
    let theVO = '';
    if(isVirtualOffice.checked) {
        theVO = ".VO";
    }
    let metAmount = parseInt(dedInputTwo.value) - parseInt((dedMetInputTwo.value.trim()));
    if(parseInt((dedMetInputTwo.value.trim())) < 1){
        metAmount = "FULLY MET";
    }else if(parseInt((dedMetInputTwo.value.trim()) > 225)){
        metAmount = "0";
    }

    textBoxes[1].value = (`${actualVerificationDateFormatted} ${getInitials.value}${theVO} EFF: ${(effectiveDateInputTwo.value).trim()} |  COINS: ${coinsInput2.value}  | DED:  ${(dedInputTwo.value).trim()}/ MET: ${metAmount} | INELIGIBLE PERIOD: ${ineligibleInput.value} |  HMO: ${hmoInput.value} |  MSP: ${mspInput.value} |  SPOKE: ${spokeInputTwo.value} `).toLocaleUpperCase()
}

const replacementVerification = () => {
    actualVerificationDate = dateVerified.value
    actualVerificationDateFormatted = actualVerificationDate.substring(5,7) +"/"+actualVerificationDate.substring(8,10)+"/" +actualVerificationDate.substring(0,4)
    let theVO = '';
    if(isVirtualOffice.checked) {
        theVO = ".VO";
    }
    textBoxes[1].value = (`${actualVerificationDateFormatted} ${getInitials.value}${theVO} CONTRACTED: ${contractedInputThree.value} |  EFF: ${(effectiveDateInputThree.value).trim()} | PLAN: ${(planInputThree.value).trim()}  |  GROUP# : ${(groupInputThree.value).trim()} | SICK: ${sickInputThree.value} | DED: ${dedinputThree.value} | OTHER INS: ${otherInsThree.value} | VERIFIED: ${verifiedOnlineInputThree.value} | PCP: ${(pcpInputThree.value).trim()} `).toLocaleUpperCase() 
}

const commercialVerificationText = () => {    
    actualVerificationDate = dateVerified.value
    actualVerificationDateFormatted = actualVerificationDate.substring(5,7) +"/"+actualVerificationDate.substring(8,10)+"/" +actualVerificationDate.substring(0,4)
    let theVO = '';    
    if(isVirtualOffice.checked) {
        theVO = ".VO";
    }
    textBoxes[1].value = (`${actualVerificationDateFormatted} ${getInitials.value}${theVO} CONTRACTED: ${contractedInputFour.value} | SICK: ${sickInputFour.value} | HSA/HRA: ${hsahraInputFour.value} | TELEHEALTH: ${telehealthInputFour.value}  | PE: ${pExamsInputFour.value} | PROCEDURES: ${proceduresInputFour.value} | DX-LABS: ${labsInputFour.value} | FLU(90656/90662): ${immunizationsInputFour.value} | C19 ANTIGEN(87426): ${covidInputFour.value}  | SPOKE: ${spokeInputFour.value} | REF: ${referenceInputFour.value}\nEFF: ${(effectiveDateInputFour.value).trim()} | PLAN TYPE: ${(planTypeInputFour.value).trim()} |  NETWORK: ${(networkInputFour.value).trim()} | PCP: ${(primarycareCommericalInputFour.value).trim()} | OTHER INS: ${otherIns4Input.value} | POLICY HOLDER: ${policyHolderInputFour.value}  | GROUP#: ${(groupInputFour.value).trim()} | OOP: ${(oopInputFour.value).trim()} / MET: ${(oopMetInputFour.value).trim()} | DED: ${(deductibleInputFour.value).trim()} / MET: ${(dedMetInputFour.value).trim()} | CLAIM ADDRESS: ${(claimAddressInputFour.value).trim()} | PAYOR ID: ${(payorIDInputFour.value).trim()}  |  VERIFIED: ${verifiedOnlineInputThree.value} `).toLocaleUpperCase()
}

const form = document.getElementById('verifications');
const secondForm = document.getElementById('physicalExams')
document.addEventListener('DOMContentLoaded', function () {
    
    const inputFields = form.querySelectorAll('input');
    
  
    submitButton[1].addEventListener('click', function (event) {
      let isFormValid = true;
  
      // double check each input fields
      inputFields.forEach((input) => {
        if (input.value.trim() === '') {
          isFormValid = false;
          input.classList.add('invalid');
  
          // Remove the "invalid" class after 3 second
          setTimeout(() => {
            input.classList.remove('invalid');
          }, 3000);
        }
      });
      
    })
    
    verificationAndPE[0].addEventListener('click', function (event) {
        let isFormValid = true;
    
        // double check each input fields
        inputFields.forEach((input) => {
          if (input.value.trim() === '') {
            isFormValid = false;
            input.classList.add('invalid');
    
            // Remove the "invalid" class after 3 second
            setTimeout(() => {
              input.classList.remove('invalid');
            }, 3000);
          }
        });
        
      });

      verificationAndPE[1].addEventListener('click', function (event) {
        let isFormValid = true;
    
        // double check each input fields
        inputFields.forEach((input) => {
          if (input.value.trim() === '') {
            isFormValid = false;
            input.classList.add('invalid');
    
            // Remove the "invalid" class after 3 second
            setTimeout(() => {
              input.classList.remove('invalid');
            }, 3000);
          }
        });
        
      });


//-------------This little section flips between the two forms-------------//

const buttons = document.querySelectorAll('.arrow-button');
const computedStyle = window.getComputedStyle(form);
      

buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (computedStyle.display !== 'none') {            
            form.style.display = 'none';
            secondForm.style.display = 'block';
            secondForm.style.gridRow = 1;
        } else {
            form.style.display = 'block';
            secondForm.style.gridRow = 2;
            secondForm.style.display = 'none';
        }
    });
});

window.addEventListener('resize', function () {
    // Check if the height is greater than 900 pixels
    if (window.innerHeight > 900) {
        form.style.display = 'block';
        secondForm.style.display = 'block';
    } else{
        form.style.display = 'block';
        secondForm.style.gridRow = 2;
        secondForm.style.display = 'none';
    }
});

});

const cleanSlatePE = () =>{
    dateBirthInput.classList.remove('greyedOut')
    dateBirthInput.readOnly = false;
    dateBirthInput.value = '';
    dateOfBirthValue = '';
    lastPhysicalServiceDate.classList.remove('greyedOut');
    lastPhysicalServiceDate.readOnly = false;
    lastPhysicalServiceDate.value = '';
    lastPEValue = '';

}

newPatientCheckCheckBox.addEventListener('change', () => {
    if(newPatientCheckCheckBox.checked){
        dateBirthInput.classList.add('greyedOut')
        dateBirthInput.readOnly = true;
        dateBirthInput.value = '01/01/1900';
        dateOfBirthValue = '01/01/1900';
        
        lastPhysicalServiceDate.classList.add('greyedOut');
        lastPhysicalServiceDate.value = '01/01/1900';
        lastPEValue = '01/01/1900';
        lastPhysicalServiceDate.readOnly = true;
    }else{
        cleanSlatePE()
     }   
})



let selectedRadioButton = 'CHOOSE A GCODE';
function updateOutputBox() {
    const checkedRadio = document.querySelector('#assignGcode input[type="radio"]:checked');
    if (checkedRadio) {        
        selectedRadioButton = checkedRadio.parentElement.querySelector('label').textContent;        
    }

    if(selectedRadioButton === 'G0402'){
        lastPhysicalServiceDate.classList.add('greyedOut');
        lastPhysicalServiceDate.value = '01/01/1900';
        lastPEValue = '01/01/1900';
        lastPhysicalServiceDate.readOnly = true;
    } else {
        lastPhysicalServiceDate.classList.remove('greyedOut');
        lastPhysicalServiceDate.readOnly = false;
    }
}

medicareGcodeButtons.forEach((radio) => {
    radio.addEventListener('change', () => {       
        updateOutputBox();
    });
});

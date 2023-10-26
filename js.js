const dateBirthInput = document.getElementById("dateOfBirth");
const DOS = document.getElementById('dateOfService');
const lastPhysicalServiceDate = document.getElementById('lastPhysicalDone');
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(nextDay.getDate() + 1);
const formattedNextDay = nextDay.toISOString().substring(0,10);
const submitButton = document.getElementById('submit');
const copyButton = document.getElementById('copyText');
const resetButton = document.getElementById('reset');
const radioAHCCCS = document.getElementById('AHCCCS');
const radioMedicare = document.getElementById('medicarePartB');
const radioMedicareReplacement = document.getElementById('medicareReplacement');
const radioCommerical = document.getElementById('commercial')
const textBox = document.getElementById('output');

//-------------------Date Of birth Formatting--------------------//

dateBirthInput.addEventListener("input", function() {
    let input = this.value;
    if(input.length > 10) {             // makes sure length does not exceed 10
        this.value = input.substring(0, 10); 
        return;
    }

    input = input.replace(/\D/g, '');   // Only allow numbers

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
    if(input.length > 10) {
        this.value = input.substring(0, 10); 
        return;
    }

    input = input.replace(/\D/g, '');

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

    const totalMonthsLastPE = Math.floor((lastPE - birthDate) / (oneDay * 30.4));
    getNextPhysicalExamination(ageInDays, totalMonthsLastPE, birthDate);
}

const getNextPhysicalExamination = (totalDays, lastPhysicalAge, birthDate) => {
    textBox.value = ""

    const schedule = [1, 2, 4, 6, 9, 12, 15, 18, 24]; // The schedule for physical examinations
    
    let nextIndex = schedule.findIndex(months => months > lastPhysicalAge); // Find the index of the next scheduled examination
    
    if (nextIndex === -1) {        
        return textBox.value += "Recheck Dates!";
    }  
    const nextPhysicalAge = schedule[nextIndex]; // Check at which the next examination is due

    if (totalDays > (nextPhysicalAge * 30.4)) { // If the patient is already eligible for the next examination, return the date
        textBox.value += `PE: ELIGIBLE W/ OV`;
    } else {
        const nextExaminationDate = new Date(birthDate);
        nextExaminationDate.setMonth(nextExaminationDate.getMonth() + nextPhysicalAge);
        textBox.value += `PE: ELIGIBLE ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextExaminationDate.toLocaleDateString()}.`;
    }
}

//-------------------For patient less than 22 years old / Also used for Medicare Part B / Also used for Commercial over 2 y/o--------------------//


const moreThanTwoLessThanTwotwo = (birthDate) => {    
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const lastPEYear = lastPE.getFullYear();
    const nextPEYear = lastPE.getFullYear() + 1;
    const lastPEMonth = lastPE.getMonth();
    const lastPEDay = lastPE.getDay();
    const birthMonth = birthDate.getMonth();
    const birthMonthFormatted = birthDate.getMonth()+1;
    const birthDay = birthDate.getDate();    
    const currentYear = currentDate.getFullYear();     
    const dateOfService = DOS.value;
    const dateOfServiceFormattted = new Date(dateOfService)
    const dateOfServiceFormatttedActualDate =  dateOfServiceFormattted.setDate(dateOfServiceFormattted.getDate() + 1);
    const dateOfServiceDayArray = dateOfService.split("-");
    const dateOfServiceMonth = parseInt(dateOfServiceDayArray[1]);
    const dateOfServiceDay = parseInt(dateOfServiceDayArray[2])+1;
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
                dateOfServiceDay < birthDay
            )
        )
    ) {
        nextEligibleDate = new Date(currentYear, birthMonth, birthDay);
    } else {
        nextEligibleDate = new Date(nextPEYear, birthMonth, birthDay);
    }
    
    console.log(nextEligibleDate)
 
    if (timeDifference > oneYearInMilliseconds) {        
        textBox.value += `PE: ELIGIBLE W/ OV`;

    }else if (nextEligibleDate > dateOfServiceFormatttedActualDate) {        
        textBox.value += `PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()}`;

    }else if (nextEligibleDate <= dateOfServiceFormatttedActualDate) {
        textBox.value += `PE: ELIGIBLE W/ OV`;



    }else if((currentYear > lastPEYear || currentYear === lastPEYear) && (lastPEMonth < birthMonth || 
        lastPEMonth === birthMonth) && lastPEDay <= birthDay ){            
            nextEligibleDate.setFullYear(currentYear) +1;
            textBox.value += `PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${nextEligibleDate.toLocaleDateString()}`;

    } else {
        
    }
}

//-------------------For patient more than 21 years old--------------------//

const Overtwentyone = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);    
    const timeDifference = currentDate - lastPE;
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const dateOfService = new Date(DOS.value) - lastPE; 
    


    if (timeDifference > oneYearInMilliseconds) {
        textBox.value += `PE: ELIGIBLE W/ OV`;
    } else if (dateOfService > oneYearInMilliseconds) {
        textBox.value += `PE: ELIGIBLE W/ OV`;    
    } else {        
        const nextEligibleDate = new Date(lastPE);
        nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

        
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

        const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, '0');
        const day = nextEligibleDate.getDate().toString().padStart(2, '0');
        const year = nextEligibleDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        textBox.value += `PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate}`;
    }
}


const OvertwentyoneCommerical = () => {
    textBox.value = ""
    const lastPE = new Date(lastPEValue);
    const timeDifference = currentDate - lastPE;
    const dateOfService = new Date(DOS.value) - lastPE;
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
//    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 

    if (timeDifference > oneYearInMilliseconds) {
        textBox.value += `PE: ELIGIBLE W/O OV`;
    } else if (dateOfService > oneYearInMilliseconds) {
        textBox.value += `PE: ELIGIBLE W/O OV`; 
    } else {
        
        const nextEligibleDate = new Date(lastPE);
        nextEligibleDate.setFullYear(nextEligibleDate.getFullYear() + 1); // Date one year after lastPE

        
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 1); // Date one day after the date one year after lastPE

        const month = (nextEligibleDate.getMonth() + 1).toString().padStart(2, '0');
        const day = nextEligibleDate.getDate().toString().padStart(2, '0');
        const year = nextEligibleDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        textBox.value += `PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON ${formattedDate}`;
    }
}

//---------------------------Beginning of AHCCCS Section----------------------------------//

const ahcccsPE = () => {    
    const birthDate = new Date(dateOfBirthValue);        
    const oneDay = 24 * 60 * 60 * 1000;     
    const ageInMilliseconds = currentDate - birthDate;    
    const ageInDays = Math.floor(ageInMilliseconds / oneDay);
    const age = ageInDays/30.4 /12    

    if(age < 2){        
        calculateAgeInMonths(birthDate);
    } else if(age < 22) {
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
        textBox.value += `PE: ALREADY DONE ON ${lastPEValue} NEXT ELIGIBLE ON 01/01/${currentYear + 1}`;
    }else if(lastPEYear < currentYear) {
        textBox.value += `PE: ELIGIBLE W/ OV`;
    } else {
        textBox.value += `Recheck Dates!`;
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
        calculateAgeInMonths(birthDate);
    } else {
        OvertwentyoneCommerical()
    }
}

//------------------------------End of Commerical Insurance----------------------------------//


//-------------------Default Value for Date of service--------------------//

DOS.value = formattedNextDay;



//-------------------Sumbit data values for results--------------------//


submitButton.addEventListener('click', () => {
    textBox.style.color = 'black';
    if(radioAHCCCS.checked){
        ahcccsPE();
    }else if(radioMedicare.checked){
        Overtwentyone();
    }else if(radioMedicareReplacement.checked) {
        replacementPE();        
    } else if(radioCommerical.checked){
        commercialPE();
    } else{
        textBox.style.color = 'red';
        textBox.value += 'Please choose an insurance type.';        
    }
})

copyButton.addEventListener('click', () => {
    textBox.select();
    document.execCommand('copy');
    textBox.setSelectionRange(0,0);

    copyButton.innerText = 'Copied';
    copyButton.style.color = "#ffffff"
    copyButton.style.background = '#32936f';
    setTimeout(() =>{        
        copyButton.innerText = 'Copy';
        copyButton.style.background = 'linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%)';
        copyButton.style.color = "#505739"
    }, 1000);
})

resetButton.addEventListener('click', () => {
    location.reload();
})
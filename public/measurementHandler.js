import { askNextQuestion, addMessage, freeMeasurementQuestions, measurementDatasArray, menuQuestions, currentQuestionIndex, currentQuestions, hungarianCounties } from "./script.js";

const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return pattern.test(email);
}

const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^(\+\d{1,4}\s?)?(\d{1,4}\s?|-)?(\d{1,4}\s?|-)?\d{4}$/;
    return pattern.test(phoneNumber);
}

const validateDate = (inputDate) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!pattern.test(inputDate)) {
        return false; 
    }
    
    const date = new Date(inputDate);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date > today;
}

// const getOptionValue = () => {
//     const options = Array.from(document.querySelectorAll(".chat-conetnt input option"));
//     var optionValue = []

// }

const tarps = ["terasz ponyva", "filagória ponyva", "kocsi beálló", "egyéb"]


export const MeasurementHandler = (userMessage) => {
        console.log(userMessage)
        console.log(currentQuestionIndex)
        switch(currentQuestionIndex){
            case 1: 
                //Name
                currentQuestionIndex == 1 && userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 2:
                //County
                currentQuestionIndex == 2 && !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 3:
                //Zip Code
                currentQuestionIndex == 3 && userMessage.length != 4 ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 4:
                //Town Name
                currentQuestionIndex == 4 && userMessage.length == 0 ?  addMessage("Kérem létező települést adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 5:
                //Street Name
                currentQuestionIndex == 5 && userMessage.length == 0 ? addMessage("Kérem létező utcanevet adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 6:
                //House Number
                currentQuestionIndex == 6 && userMessage.length == 0 && isNaN(Number(userMessage)) ? addMessage("Kérem valós házszámot adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 7: 
                //Email
                currentQuestionIndex == 7 && validateEmail(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem létező email címet adjon meg!", true)
                break;
            case 8:
                //Phone Number
                currentQuestionIndex == 8 && validatePhoneNumber(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem valós telefonszámot adjon meg!", true)
                break;
            case 9:
                //TODO: Add a date picker so it works with lesser misunderstanding
                //Measurement Date
                currentQuestionIndex == 9 && validateDate(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem valós dátumot adjon meg!", true)
                break;
            case 10:
                //Tarp Type
                //TODO: Add a type picker so it works with leeser misunderstanding
                currentQuestionIndex == 10 ? (measurementDatasArray.push(Array.from(document.querySelectorAll(".chat-conetnt input option")).forEach(optionValue => measurementDatasArray.push(optionValue.value))), askNextQuestion()) : addMessage("Kérem a megadott ponyvákból válasszon!", true)
                break;

        }
}
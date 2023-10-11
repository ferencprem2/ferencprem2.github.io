import { askNextQuestion, addMessage, measurementDatasArray, userInput, currentQuestionIndex, currentQuestions, hungarianCounties, chatContent, handleUserInput } from "./script.js";

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
export const MeasurementHandler = (userMessage) => {
    console.log(userMessage)
    console.log(currentQuestionIndex)
    switch (currentQuestionIndex) {
        case 1:
            //Name
            userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 2:
            //County
            !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 3:
            //Zip Code
            userMessage.length != 4 ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 4:
            //Town Name
            userMessage.length == 0 ? addMessage("Kérem létező települést adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 5:
            //Street Name
            userMessage.length == 0 ? addMessage("Kérem létező utcanevet adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 6:
            //House Number
            userMessage.length == 0 && isNaN(Number(userMessage)) ? addMessage("Kérem valós házszámot adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
            break;
        case 7:
            //Email
            validateEmail(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem létező email címet adjon meg!", true)
            break;
        case 8:
            //Phone Number
            validatePhoneNumber(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem valós telefonszámot adjon meg!", true)
            break;
        case 9:
            //TODO: Add a date picker so it works with lesser misunderstanding
            //Measurement Date
            // let typeQuestion = `Kérem válasszon az alábbi ponyvatípusok közül <select id="tarpType"> <option value="terasz ponyva">terasz ponyva</option> <option value="filagória ponyva">filagória ponyva</option> <option value="kocsi beálló">kocsi beálló</option> <option value="egyéb">egyéb</option></select>`
            validateDate(userMessage) ? (measurementDatasArray.push(userMessage), askNextQuestion()) : addMessage("Kérem valós dátumot adjon meg!", true)
            break;
        case 10:
            // let tarpTypes = document.getElementById("tarpTypes")
            // tarpTypes.addEventListener("change", (e) => {
            //     userInput.value = e.target.value
            //     console.log(`Selected value is: ${userInput.value}`)
            //     measurementDatasArray.push(userInput.value)
            // })
            askNextQuestion();
            break;
    }
}
import { askNextQuestion, addMessage, measurementDatasArray, currentQuestionIndex, hungarianCounties} from "./script.js";
import { validateEmail, validatePhoneNumber, validateDate } from "./validators.js";

export const MeasurementHandler = (userMessage) => {
    console.log(userMessage)
    console.log(currentQuestionIndex)
    switch (currentQuestionIndex) {
        case 1:
            //Name
            userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (measurementDatasArray.name = userMessage, askNextQuestion())
            break;
        case 2:
            //County
            !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (measurementDatasArray.county = userMessage, askNextQuestion())
            break;
        case 3:
            //Zip Code
            userMessage.length != 4 ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (measurementDatasArray.zipCode = userMessage, askNextQuestion())
            break;
        case 4:
            //Town Name
            userMessage.length == 0 ? addMessage("Kérem létező települést adjon meg!", true) : (measurementDatasArray.townName = userMessage, askNextQuestion())
            break;
        case 5:
            //Street Name
            userMessage.length == 0 ? addMessage("Kérem létező utcanevet adjon meg!", true) : (measurementDatasArray.streetName = userMessage, askNextQuestion())
            break;
        case 6:
            //House Number
            userMessage.length == 0 && isNaN(Number(userMessage)) ? addMessage("Kérem valós házszámot adjon meg!", true) : (measurementDatasArray.houseNumber = userMessage, askNextQuestion())
            break;
        case 7:
            //Email
            validateEmail(userMessage) ? (measurementDatasArray.email = userMessage, askNextQuestion()) : addMessage("Kérem létező email címet adjon meg!", true)
            break;
        case 8:
            //Phone Number
            validatePhoneNumber(userMessage) ? (measurementDatasArray.phoneNumber = userMessage, askNextQuestion()) : addMessage("Kérem valós telefonszámot adjon meg!", true)
            break;
        case 9:
            //TODO: Add a date picker so it works with lesser misunderstanding
            //Measurement Date
            validateDate(userMessage) ? (measurementDatasArray.measurementDate = userMessage, askNextQuestion()) : addMessage("Kérem valós dátumot adjon meg!", true)
            break;
        case 10:
            //TarpTypes
            userMessage.length > 0 ? (measurementDatasArray.tarpTypes = userMessage, askNextQuestion()) : addMessage("Tarp type error", true)
            break;
    }
}
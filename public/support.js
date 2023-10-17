import {userMessage, addMessage, askNextQuestion ,supportQuestions, supportDataArray } from "./script";

export const Support = (userMessage) => {
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
            userMessage.length > 0 ? (supportDataArray.push(userMessage), askNextQuestion()) : (addMessage("Kérem adjon meg valamit!", false))
            break;
    }
}
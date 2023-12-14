import { OfferHandler } from "./offerHandler.js";
import { showSummary } from "./resultSummary.js";
import { MeasurementHandler } from "./measurementHandler.js";
import { Support } from "./support.js";
import { Interest } from './interest.js';
import { menuQuestions, freeMeasurementQuestions, offerQuestions, saleQuestions, supportQuestions, interestQuestions } from "./chatbotDatas/datas.js";
import { interestDataArray, measurementDatasArray, supportDataArray } from "./models/chatBotModels.js";

export const chatContent = document.getElementById('chat-content');
export const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');

export let currentQuestions;
export let currentQuestionIndex = 0;
export let isOptionSelected = false;
let clikced = false;


//Send button and send with enter key
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});

//Clickable chatbot icon
chatbotIcon.addEventListener('click', function () {
  if (chatbox.style.display === 'block') {
    chatbox.style.display = 'none';
    document.getElementById('help-text').style.display = 'block';
  } else {
    chatbox.style.display = 'block';
    document.getElementById('help-text').style.display = 'none';
    // You can initiate the chat sequence here if needed:
    setTimeout(() => askNextQuestion(), 1000);
  }
});

//Decides whether the question is bot response or user response and puts the output into the corresponting container
export function addMessage(message, isBot) {
  if (currentQuestions != menuQuestions && message.length == 0) {
    message = "Kérem töltse ki a mezőt!";
    isBot = true;
  }
  const chatContent = document.getElementById('chat-content');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isBot ? 'bot-message' : 'user-message')

  messageDiv.innerHTML = message;
  chatContent.appendChild(messageDiv);

  const freeMesBtn = document.getElementById('freeMeasurementButton')
  const offerBtn = document.getElementById('offersButton');
  const interestBtn = document.getElementById('interestButton');
  const saleBtn = document.getElementById('saleButton');
  const supportBtn = document.getElementById('supportButton');

  freeMesBtn.addEventListener("click", () => {
    handleMainMenuSelection(0)
  })
  offerBtn.addEventListener("click", () => {
    handleMainMenuSelection(1)
  })
  interestBtn.addEventListener("click", () => {
    handleMainMenuSelection(2)
  })
  saleBtn.addEventListener("click", () => {
    handleMainMenuSelection(3)
  })
  supportBtn.addEventListener("click", () => {
    handleMainMenuSelection(4)
  })
  // Scroll to the bottom
  chatContent.scrollTop = chatContent.scrollHeight;
}

//Function that handles the user inputs, and displays the questions referring to the user input
export function handleUserInput() {
  let parent = document.getElementsByClassName("user-input-parent")[0];
  let element = parent.children[0]
  let userMessage;
  
  if (element.tagName === "INPUT") {
    userMessage = element.value;
  } else if (element.tagName === "SELECT") {
    let selectedOption = element.options[element.selectedIndex]
    userMessage = selectedOption.text
  }
  addMessage(userMessage, false);

  if (userMessage.length === 0) return;
  userInput.value = '';
  element.value = '';
  console.log(currentQuestionIndex)
  switch (currentQuestions) {
    case freeMeasurementQuestions:
      MeasurementHandler(userMessage)
      break;
    case offerQuestions:
      OfferHandler(userMessage)
      break;
    case interestQuestions:
      Interest(userMessage)
      break;
    case supportQuestions:
      Support(userMessage)
      break;
    case menuQuestions:
      handleMainMenuSelection();
      return;
  }
}

window.userInput = () => {
  userInput.value = inputField.value
  handleUserInput()
};

function handleMainMenuSelection(buttonId) {
  if (!isOptionSelected) {
    switch (buttonId) {
      case 0:
        isOptionSelected = true;
        currentQuestions = freeMeasurementQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 1:
        isOptionSelected = true;
        currentQuestions = offerQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 2:
        isOptionSelected = true;
        currentQuestions = interestQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 3:
        isOptionSelected = true;
        currentQuestions = saleQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
      case 4:
        isOptionSelected = true;
        currentQuestions = supportQuestions;
        currentQuestionIndex = 0;
        askNextQuestion();
        break;
    }
  }
}

//function that goes to the next question
export function askNextQuestion() {
  if (isOptionSelected){
    userInput.disabled = false;
    sendBtn.disabled = false
    userInput.focus()
  }
  
  if (currentQuestionIndex < currentQuestions.length) {
    addMessage(currentQuestions[currentQuestionIndex], true)
    currentQuestionIndex++;
    return;
  }


  switch (currentQuestions) {
    case freeMeasurementQuestions:
      showSummary(measurementDatasArray, freeMeasurementQuestions)
      break;
    case supportQuestions:
      showSummary(supportDataArray, supportQuestions)
      break;
    case interestQuestions:
      showSummary(interestDataArray, interestQuestions)
      break;
  }
}

//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function () {
  chatbox.style.display = 'none';
  userInput.disabled = true;
  sendBtn.disabled = true;
};

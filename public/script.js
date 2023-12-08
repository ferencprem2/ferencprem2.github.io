import { OfferHandler } from "./offerHandler.js";
import { showSummary } from "./resultSummary.js";
import { MeasurementHandler } from "./measurementHandler.js";
import { Support } from "./support.js";
import { menuQuestions, freeMeasurementQuestions, offerQuestions, saleQuestions, supportQuestions } from "./chatbotDatas/datas.js";

export const chatContent = document.getElementById('chat-content');
export const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');
const helpText = document.getElementById('help-text');
export let measurementDatasArray = {
  name: null,
  county: null,
  zipCode: null,
  townName: null,
  streetName: null,
  houseNumber: null,
  email: null,
  phoneNumber: null,
  measurementDate: null,
  tarpTypes: null
};
export let offerDatasArray = {
  name: null,
  tarpCount: null
};
export let interestDataArray = {};
export let supportDataArray = {
  name: null,
  county: null,
  zipCode: null,
  townName: null,
  streetName: null,
  houseNumber: null,
  email: null,
  phoneNumber: null,
  customData: null
};
export let currentQuestions;
export let currentQuestionIndex = 0;

function enforcePhoneNumberFormat(event) {
  if (!event.target.value.startsWith('+36')) {
    event.target.value = '+36' + event.target.value.replace('+36', '').substring(0, 10);
  }
}

//Transforms input field to phone
export function transformToPhoneInput(inputField) {
  inputField.type = 'tel';
  inputField.maxLength = 12;
  inputField.placeholder = 'Enter phone number';
  inputField.className
  // Additional logic to ensure that +36 is always present
  inputField.addEventListener('input', enforcePhoneNumberFormat);
}

//Transforms the input field into a datepicker
export function transformToDatepicker(inputField) {
  inputField.removeEventListener('input', enforcePhoneNumberFormat)
  inputField.type = 'date';
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd; // Format date as YYYY-MM-DD

  inputField.min = today; // Set the min attribute to today's date
}


//Replaces input field with a dropDown
export function replaceInputWithSelect(inputField, dataArray,) {
  // Create a new select element
  var select = document.createElement('select');
  select.id = inputField.id; // Carry over the original input's ID

  // Populate the select element with options
  dataArray.forEach(function (item) {
    var option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });

  select.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });

  // Replace the input field with the select element in the DOM
  inputField.parentNode.replaceChild(select, inputField);
}

//Replaces the dropDown with an input filed
export function replaceSelectWithInput(selectElement) {
  // Create a new input element
  var input = document.createElement('input');
  input.type = 'text';
  input.placeholder = "Írja válaszát ide";
  input.id = selectElement.id; // Carry over the original select's ID


  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });
  // Replace the select element with the input field in the DOM
  selectElement.parentNode.replaceChild(input, selectElement);
}

export function resetToTextInput(inputField) {
  inputField.type = 'text'; // Reset the input type to text
  inputField.value = ''; // Clear any existing value
  inputField.placeholder = "Írja válaszát ide";
  inputField.removeAttribute('min'); // Remove min attribute if set
  inputField.removeAttribute('maxLength'); // Remove maxLength attribute if set
  // Remove any other attributes or event listeners specific to other input types
}



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
  if (currentQuestions != menuQuestions && message.length == 0 && currentQuestions == freeMeasurementQuestions && currentQuestionIndex != 10) {
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

function handleUserInput() {
  var parent = document.getElementsByClassName("user-input-parent")[0];
  var element = parent.children[0]
  var userMessage;
  if (element.tagName === "INPUT") {
    userMessage = element.value;
  } else if (element.tagName === "SELECT") {
    var selectedOption = element.options[element.selectedIndex]
    userMessage = selectedOption.text
  }
  addMessage(userMessage, false);
  // We should specify that this is a user message

  if (userMessage.length === 0) return;
  userInput.value = '';
  element.value = '';
  console.log(currentQuestionIndex)
  switch (currentQuestions) {
    case freeMeasurementQuestions:
      // if (currentQuestionIndex == 10) {
      //   const tarpTypes = document.getElementById("tarpTypes")
      //   // tarpTypes.addEventListener("change", handleUserInput)
      //   var selectedTarp = tarpTypes.value
      //   MeasurementHandler(selectedTarp)
      // }
      MeasurementHandler(userMessage)
      break;
    case offerQuestions:
      OfferHandler(userMessage)
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

  switch (buttonId) {
    case 0:
      currentQuestions = freeMeasurementQuestions;
      currentQuestionIndex = 0;
      askNextQuestion();
      break;
    case 1:
      currentQuestions = offerQuestions;
      currentQuestionIndex = 0;
      askNextQuestion();
      break;
    case 2:
      currentQuestions = interestQuestions;
      currentQuestionIndex = 0;
      askNextQuestion();
      break;
    case 3:
      currentQuestions = saleQuestions;
      currentQuestionIndex = 0;
      askNextQuestion();
      break;
    case 4:
      currentQuestions = supportQuestions;
      currentQuestionIndex = 0;
      askNextQuestion();
      break;
  }
}

//function that goes to the next question
export function askNextQuestion() {
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
  }
}

//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function () {
  chatbox.style.display = 'none';
};

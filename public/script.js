const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');
const helpText = document.getElementById('help-text');
let offerDatasArray = [];




//Send button and send with enter key
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

//Clickable chatbot icon
chatbotIcon.addEventListener('click', function() {
  chatbox.style.display = 'block';   // Display chatbox
  helpText.style.display = 'none';   // Hide help text
  chatbotIcon.style.display = 'none';   // Hide chatbot icon
  // You can initiate the chat sequence here if needed:
  setTimeout(() => askNextQuestion(), 1000);
});

chatbox.addEventListener('click', function() {
  chatbox.style.display = 'none';    // Hide chatbox
  chatbotIcon.style.display = 'block';  // Show chatbot icon
  helpText.style.display = 'block';  // Show help text
});

const menuQuestions = [
  "Üdvözöljük a ponyvaexpressz oldalán, kérem válasszon \n a következő lehetőségek közül: \n \t -ingyenes felmérés igénylése \n \t -árajánlat kérése meglévő méretek alapján \n \t -érdeklődés \n \t -aktuális akcióinkról történő tájékozódás \n \t -ügyfélszolgálat"
]

const freeMeasurementQuestions = [
  'Adja meg a teljes nevét:',
  'Adja meg a megye nevét:',
  'Adja meg az irányítószámát:',
  'Adja meg települése nevét:',
  'Adja meg utcája nevét:',
  'Ajda meg a házszámát:',
  'Adja meg email címét:',
  'Adja meg telefonszámát:',
  'Adja meg a felmérés idejét(ÉÉÉÉ-HH-NN):',
  'Adja meg a ponyva típusát(terasz ponyva, filagória ponyva, kocsi beálló, egyéb):',
  'Amennyiben vissza szeretne lépni a főmenübe, írja: (vissza):'
];

const offerQuestions = [
  'Adja meg a nevét: ',
  'Adja meg hány darab ponyvát szeretne: '
]

const offerSideMenuQuestions = [
  "Kérem válasszon az alábbi lehetőségek közül: \n \t Képlet alapján általános árajánlat látványtervvel \n \t 3D tervezés"
]

//Decides whether the question is bot response or user response and puts the output into the corresponting container
function addMessage(message, isBot) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(isBot ? 'bot-message' : 'user-message');
  messageContainer.innerText = message;
  chatContent.appendChild(messageContainer);
}

//Displays the bot response with animation
function addMessageWithAnimation(message, isBot) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(isBot ? 'bot-message' : 'user-message');

  const typingAnimation = document.createElement('span');
  typingAnimation.classList.add('typing-animation');
  messageContainer.appendChild(typingAnimation);

  chatContent.appendChild(messageContainer);

  let charIndex = 0;
  const typingInterval = setInterval(() => {
    if (charIndex < message.length) {
      const currentChar = message.charAt(charIndex);
      typingAnimation.innerHTML += (currentChar === ' ') ? '&nbsp;' : currentChar;
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 10);
}


//Function that handles the user inputs, and displays the questions referring to the user input
function handleUserInput() {
  const userMessage = userInput.value.trim();
  addMessage(userMessage, false);  // We should specify that this is a user message
  
  if (userMessage === '') return;
  userInput.value = '';

  if (currentQuestions === freeMeasurementQuestions && userMessage.toLowerCase() === "vissza") {
    currentQuestions = menuQuestions;
    currentQuestionIndex = 0;
    askNextQuestion();
    return;  // Return early to prevent further processing
  }

  if (currentQuestions === offerQuestions && userMessage.toLowerCase() === "vissza") {
    currentQuestions = menuQuestions;
    currentQuestionIndex = 0;
    askNextQuestion();
    return;  // Return early to prevent further processing
  }

  if (currentQuestions === offerQuestions) {
    console.log(userMessage)
    offerDatasArray.push(userMessage) 
    
    if (currentQuestionIndex == 1) {
    }

    if (currentQuestionIndex == 2) {  // This means we are on the "number of tarps" question
      const numberOfTarps = parseInt(userMessage);
    
      if (numberOfTarps > 0) {
        // Dynamically generate questions based on the number of tarps
        for (let i = 1; i <= numberOfTarps; i++) {
          offerQuestions.push(`Adja meg a ${i}. ponyva szélességét:`);
          offerQuestions.push(`Adja meg a ${i}. ponyva magasságát:`);
          offerQuestions.push(`Szeretne-e ajtó a(z) ${i}. ponyvába? (igen/nem):`)
          offerQuestions.push(`Adja meg a ${i}. színét:`)
        }
        offerQuestions.push('Szeretne visszatérni a főmenübe? (igen/nem):');
      } else {
      addMessage('Kérem valós ponyvaszámot adjon meg!', true);
      return;
      }
    }
    askNextQuestion();
    return;
  } 
  
  
  switch (currentQuestions) { }

  if (currentQuestions === menuQuestions) {
    handleMainMenuSelection(userMessage);
    return;
  }

  // The function name was "daveData", I believe you meant "saveData"
  if (currentQuestionIndex === currentQuestions.length) {
    // saveData(answers);  // You need to define this function and the answers array logic
  } else {
    askNextQuestion();
  }
}

// for (let i = 1; i < offerDatasArray.length; i += 4) {
//   let tarpNum = (i + 3) / 4; // Calculate the tarp number
//     jsonData[username][`${tarpNum}._tarpWidth`] = userResponses[i];
//     jsonData[username][`${tarpNum}._tarpHeight`] = userResponses[i + 1];
//     jsonData[username][`${tarpNum}._tarpDoor`] = userResponses[i + 2];
//     jsonData[username][`${tarpNum}._tarpColor`] = userResponses[i + 3];
// }


let currentQuestions;
let currentQuestionIndex = 0;

function handleMainMenuSelection(selection) {

  if (selection.includes("ingy")) {
    addMessageWithAnimation('Ingyenes felmérés igénylésének a menete...', true); // the message has been shortened for brevity
    currentQuestions = freeMeasurementQuestions;
    currentQuestionIndex = 0;
    setTimeout(measurementHandlerFunction, 5000);
  }
  else if (selection.includes("ár")) {
    currentQuestions = offerQuestions;
    currentQuestionIndex = 0;
    currentTarpNumber = 1;
    askNextQuestion();
  }
  else {
    addMessage('Kérem a meglévő opciók közül válasszon', true);
  }
}

function measurementHandlerFunction() {
  currentQuestionIndex = 0;
  currentQuestions = freeMeasurementQuestions;
  askNextQuestion();
}


//function that goes to the next question
function askNextQuestion() {
  if (currentQuestionIndex < currentQuestions.length) {
    addMessageWithAnimation(currentQuestions[currentQuestionIndex], true);
    currentQuestionIndex++;
  } else if (currentQuestions === freeMeasurementQuestions) {
    addMessageWithAnimation('Ha vissza szeretne menni írja (vissza):', true);
  }
}



//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function() {
  chatbox.style.display = 'none';
};
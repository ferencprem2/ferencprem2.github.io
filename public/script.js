import { showSummary } from "./resultSummary.js";

const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');
const helpText = document.getElementById('help-text');
let numberOfTarps;
export let offerDatasArray = [];



//Send button and send with enter key
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

//Clickable chatbot icon
chatbotIcon.addEventListener('click', function() {
  if(chatbox.style.display === 'block') {
      chatbox.style.display = 'none';
      document.getElementById('help-text').style.display = 'block';
  } else {
      chatbox.style.display = 'block';
      document.getElementById('help-text').style.display = 'none';
      // You can initiate the chat sequence here if needed:
      setTimeout(() => askNextQuestion(), 1000);
  }
});

const menuQuestions = [
  "Üdvözöljük a ponyvaexpressz oldalán, kérem válasszon \n a következő lehetőségek közül: \n ingyenes felmérés igénylése(írja: ingy) \n árajánlat kérése meglévő méretek alapján(írja: ár) \n érdeklődés(írja: érd) \n aktuális akcióinkról történő tájékozódás(írja: akc) \n ügyfélszolgálat(írja: ügy)"
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

export const offerQuestions = [
  'Adja meg a nevét: ',
  'Adja meg hány darab ponyvát szeretne: '
]

const offerSideMenuQuestions = [
  "Kérem válasszon az alábbi lehetőségek közül: \n \t Képlet alapján általános árajánlat látványtervvel(írja: ár) \n \t 3D tervezés"
]

//Decides whether the question is bot response or user response and puts the output into the corresponting container
export function addMessage(message, isBot) {
  const chatContent = document.getElementById('chat-content');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  if (isBot) {
      messageDiv.classList.add('bot-message');
  } else {
      messageDiv.classList.add('user-message');
  }

  messageDiv.innerText = message;
  chatContent.appendChild(messageDiv);

  // Scroll to the bottom
  chatContent.scrollTop = chatContent.scrollHeight;
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
      // Move the scroll to the bottom AFTER the animation completes.
      chatContent.scrollTop = chatContent.scrollHeight;
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

  if (currentQuestions === offerQuestions) {
    console.log(userMessage);
    console.log(currentQuestionIndex);


    // First question (Name):
    if (currentQuestionIndex == 1) {
      const numberMessage = Number(userMessage);
      offerDatasArray.push(userMessage)
      if (!isNaN(numberMessage) || userMessage === "") {
          addMessage('Kérem nevet adjon meg', true);
          return;
      }
      // TODO felesleges kihozni változóba, mert egyelőre nem használod sehol.
    }

    // Second question (Number of tarps):
    if (currentQuestionIndex == 2) {
      numberOfTarps = parseInt(userMessage);
      offerDatasArray.push(numberOfTarps)
      if (isNaN(numberOfTarps) || numberOfTarps <= 0) {
          addMessage('Kérem valós ponyvaszámot adjon meg!', true);
          return;
      }

        for (let i = 1; i <= numberOfTarps; i++) {
            offerQuestions.push(`Adja meg a ${i}. ponyva szélességét centiméterben:`);
            offerQuestions.push(`Adja meg a ${i}. ponyva magasságát centiméterben:`);
            offerQuestions.push(`Szeretne-e ajtó a(z) ${i}. ponyvába? (igen/nem):`);
            offerQuestions.push(`Adja meg a ${i}. színét:`);
        }
        askNextQuestion();
        return;
    }

    if(currentQuestionIndex > numberOfTarps * 4 + 2) {
      const lowerCaseMessage = userMessage.toLowerCase();
      if (lowerCaseMessage === 'igen') {
          currentQuestions = menuQuestions;
          currentQuestionIndex = 0;
          askNextQuestion();
          return;
        } 
        
      addMessage(lowerCaseMessage === 'nem' ? 'Köszönjük válaszait' : 'Kérem igennel vagy nemmel válaszoljon', true);
      return;
    }

    // Width:
    if (currentQuestionIndex >= 3 && (currentQuestionIndex - 3) % 4 === 0) {
      if (isNaN(Number(userMessage))) {
          addMessage('Kérem valós számot adjon meg a szélességhez!', true);
          return;
      } else {
        offerDatasArray.push(userMessage)
      }
    }

    // Height:
    if (currentQuestionIndex >= 4 && (currentQuestionIndex - 4) % 4 === 0) {
      if (isNaN(Number(userMessage))) {
        addMessage('Kérem valós számot adjon meg a magassághoz!', true);
        return;
      } else {
        offerDatasArray.push(userMessage)
      }
    }

    // Door:
    if (currentQuestionIndex >= 5 && (currentQuestionIndex - 5) % 4 === 0) {
      const lowerCaseMessage = userMessage.toLowerCase();
      if ((lowerCaseMessage != 'igen') && (lowerCaseMessage != 'nem')) {
        addMessage('Kérem igennel vagy nemmel válaszoljon', true);
        return;
      } else {
        offerDatasArray.push(lowerCaseMessage)
      }
    }

    // Color:
    if (currentQuestionIndex >= 6 && (currentQuestionIndex - 6) % 4 === 0) {
      const numberMessage = Number(userMessage);
      if (!isNaN(numberMessage) || userMessage === "") {
        addMessage('Kérem színt adjon meg', true);
        return;
      } else {
        offerDatasArray.push(userMessage)
      }
    }

    // Check for return to main menu:
    askNextQuestion();
    return;
  }

  if (currentQuestions === menuQuestions) {
    handleMainMenuSelection(userMessage);
    return;
  }

  if (currentQuestionIndex === currentQuestions.length) {
  } else {
    askNextQuestion();
  }
}


let currentQuestions;
let currentQuestionIndex = 0;

function handleMainMenuSelection(selection) {
  if (selection.includes("ingy")) {
    addMessageWithAnimation('Ingyenes felmérés igénylésének a menete...', true); // the message has been shortened for brevity
    currentQuestions = freeMeasurementQuestions;
    currentQuestionIndex = 0;
    setTimeout(measurementHandlerFunction, 5000);
  }
  else if (selection.toLowerCase().includes("ár")) {
    currentQuestions = offerQuestions;
    currentQuestionIndex = 0;
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
  } else {
      // Optionally, you can add a message indicating the end of the questions.
      //TODO: BUG
      addMessageWithAnimation('Kérdések vége. Köszönjük!', true);
      switch(currentQuestions){
        case offerQuestions:
          showSummary(offerDatasArray, offerQuestions)
      }
  }
}



//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function() {
  chatbox.style.display = 'none';
};
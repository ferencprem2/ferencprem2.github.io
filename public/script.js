import { showSummary } from "./resultSummary.js";

const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');
const helpText = document.getElementById('help-text');
let numberOfTarps;
export let offerDatasArray = [];
export let measurementDatasArray = [];


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
  `Üdvözöljük a ponyvaexpressz oldalán, kérem válasszon a következő lehetőségek közül: <br> Ingyenes felmérés igénylése <button id="freeMeasurementButton">Választ</button> <br> Árajánlat kérése meglévő méretek alapján <button id="offersButton">Választ</button> <br> Érdeklődés <button id="interestButton">Választ</button> <br> Aktuális akcióinkról történő tájékozódás <button id="saleButton">Választ</button> <br> Ügyfélszolgálat <button id="supportButton">Választ</button>`
]

export const freeMeasurementQuestions = [
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

export const interestQuestions = [
  'Kérem írja le pontosan mit szeretne',
  'Adja meg a teljes nevét:',
  'Adja meg a megye nevét:',
  'Adja meg az irányítószámát:',
  'Adja meg települése nevét:',
  'Adja meg utcája nevét:',
  'Ajda meg a házszámát:',
  'Adja meg email címét:',
  'Adja meg telefonszámát:',
  'Adja meg a felmérés idejét(ÉÉÉÉ-HH-NN):',
  'Köszünjük, hogy időt szánt ránk, munkatársunk mihamarabb keresni fogja'
]

const offerSideMenuQuestions = [
  "Kérem válasszon az alábbi lehetőségek közül: \n \t Képlet alapján általános árajánlat látványtervvel(írja: ár) \n \t 3D tervezés"
]

//Decides whether the question is bot response or user response and puts the output into the corresponting container
export function addMessage(message, isBot) {
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

  if (currentQuestions == freeMeasurementQuestions) {
    //First question (Name):
    if (currentQuestionIndex == 0) {
      // validateName(measurementDatasArray)
    }
  }

  if (currentQuestions === offerQuestions) {
    console.log(userMessage);
    console.log(currentQuestionIndex);


    // First question (Name):
    if (currentQuestionIndex == 1) {
        // validateName(offerDatasArray)
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
    handleMainMenuSelection();
    return;
  }

  if (currentQuestionIndex === currentQuestions.length) {
  } else {
    askNextQuestion();
  }
}

let currentQuestions;
let currentQuestionIndex = 0;


function handleMainMenuSelection(buttonId) {
  switch (buttonId) {
    case 0:
      addMessage("Ingyenes felmérés igénylésének a menet...", true)
      currentQuestions = freeMeasurementQuestions;
      currentQuestionIndex = 0;
      setTimeout(measurementHandlerFunction, 5000);   
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
      break;
    case 4:
      break;
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
      addMessage(currentQuestions[currentQuestionIndex], true)
      // addMessageWithAnimation(currentQuestions[currentQuestionIndex], true);
      currentQuestionIndex++;
  } else {
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

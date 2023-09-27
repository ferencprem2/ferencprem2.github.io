import { OfferHandler } from "./offerHandler.js";
import { showSummary } from "./resultSummary.js";
import { MeasurementHandler } from "./measurementHandler.js";

const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbox = document.querySelector('.chatbox');
const helpText = document.getElementById('help-text');
// export let numberOfTarps;
export let measurementDatasArray = [];
export let offerDatasArray = [];
export let interestDataArray = [];
export let currentQuestions;
export let currentQuestionIndex = 0;


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

export const menuQuestions = [
  `Üdvözöljük a ponyvaexpressz oldalán, kérem válasszon a következő lehetőségek közül: <br> Ingyenes felmérés igénylése <button id="freeMeasurementButton">Választ</button> <br> Árajánlat kérése meglévő méretek alapján <button id="offersButton">Választ</button> <br> Érdeklődés <button id="interestButton">Választ</button> <br> Aktuális akcióinkról történő tájékozódás <button id="saleButton">Választ</button> <br> Ügyfélszolgálat <button id="supportButton">Választ</button>`
]

export const hungarianCounties = [
  "Pest vármegye",
  "Baranya vármegye",                 
  "Bács-Kiskun vármegye",             
  "Békés vármegye",                   
  "Borsod-Abaúj-Zemplén vármegye",    
  "Csongrád vármegye",                
  "Fejér vármegye",                   
  "Győr-Moson-Sopron vármegye",       
  "Hajdú-Bihar vármegye",             
  "Heves vármegye",                   
  "Jász-Nagykun-Szolnok vármegye",    
  "Komárom-Esztergom vármegye",      
  "Nógrád vármegye",                  
  "Pest vármegye",                    
  "Somogy vármegye",                  
  "Szabolcs-Szatmár-Bereg vármegye",  
  "Tolna vármegye",                   
  "Vas vármegye",
  "Veszprém vármegye",
  "Zala vármegye"
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
function handleUserInput() {
  const userMessage = userInput.value.trim();
  addMessage(userMessage, false);  // We should specify that this is a user message
  
  if (userMessage.length === 0) return;
  // {
  //   //TODO: BUG
  //   addMessage("Kérem töltsön ki minden mezőt!", true)
  // };
  userInput.value = '';

  switch(currentQuestions) {
    case freeMeasurementQuestions:
      MeasurementHandler(userMessage)
      break;
    case offerQuestions:
      OfferHandler(userMessage)
      break;
  }

  if (currentQuestions === menuQuestions) {
    handleMainMenuSelection();
    return;
  }
}




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
      break;
    case 4:
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
  switch(currentQuestions){
    case freeMeasurementQuestions:
      console.log(`${currentQuestions}. asd`)
      showSummary(measurementDatasArray, freeMeasurementQuestions)
      break;
    case offerQuestions:
      console.log(`${currentQuestions}. asd`)
      showSummary(offerDatasArray, offerQuestions)
      break;
    case interestQuestions:
      console.log(`${currentQuestions}. asd`)
      showSummary(interestDataArray, interestQuestions)
      break;
    }
}

//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function() {
  chatbox.style.display = 'none';
};

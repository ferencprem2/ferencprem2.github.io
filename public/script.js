import { OfferHandler } from "./offerHandler.js";
import { showSummary } from "./resultSummary.js";
import { MeasurementHandler} from "./measurementHandler.js";

export const chatContent = document.getElementById('chat-content');
export const userInput = document.getElementById('user-input');
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
  'Válassza ki a ponyva típusát: <select id="tarpTypes"><option value="terasz ponyva">Terasz ponyva</option><option value="filagória ponyva">Filagória ponyva</option><option value="kocsi beálló">Kocsi beálló</option><option value="egyéb">Egyéb</option></select> <button id="sendTarpType">Tovább</button>',
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
//Send button and send with enter key
sendBtn.addEventListener('click', () => { 
  handleUserInput()
});
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
  const userMessage = userInput.value.trim();
  addMessage(userMessage, false);  // We should specify that this is a user message
  
  if (userMessage.length === 0) return;
  userInput.value = '';

  if (currentQuestionIndex == 10){
    let tarpSelectButton = document.getElementById("sendTarpType")
    let tarpTypes = document.getElementById("tarpTypes")
    tarpSelectButton.addEventListener("click", () => {
      console.log("TarpType")
    })
  }

  switch(currentQuestions) {
    case freeMeasurementQuestions:
      MeasurementHandler(userMessage)
      break;
    case offerQuestions:
      OfferHandler(userMessage)
      break;
    case menuQuestions:
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
      showSummary(measurementDatasArray, freeMeasurementQuestions)
      break;
    case offerQuestions:
      showSummary(offerDatasArray, offerQuestions)
      break;
    case interestQuestions:
      showSummary(interestDataArray, interestQuestions)
      break;
    }
}

//Assign the menu questions at the start
currentQuestions = menuQuestions;
window.onload = function() {
  chatbox.style.display = 'none';
};

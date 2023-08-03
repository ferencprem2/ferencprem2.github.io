const chatContent = document.getElementById('chat-content');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add a message to the chatbox
function addMessage(message, isBot) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(isBot ? 'bot-message' : 'user-message');
  messageContainer.innerText = message;
  chatContent.appendChild(messageContainer);
}

// Function to add a message to the chatbox with typewriter animation
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
      if (currentChar === ' ') {
        typingAnimation.innerHTML += '&nbsp;'; // Preserve spaces in the animation
      } else {
        typingAnimation.innerText += currentChar;
      }
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 10); // Speed of typing (adjust as needed)
}

// Function to validate user input for each question separately
function validateInput(questionIndex, input) {
  switch (questionIndex) {
    // case 0: // Third question: Full name validation
    //   const namePattern = /^[a-zA-Z\s]+$/;
    //   if (namePattern.test(input)) {
    //     return { valid: true, type: 'name', value: input };
    //   } else {
    //     return { valid: false, type: null, value: null };
    //   }

    // case 3: // Fourth question: Age validation
    //   const age = parseInt(input);
    //   if (!isNaN(age) && age >= 18 && age <= 120) {
    //     return { valid: true, type: 'age', value: age };
    //   } else {
    //     return { valid: false, type: null, value: null };
    //   }

    case 7: // Email validation
      const emailPattern = /^\S+@\S+\.\S+$/;
      return { valid: emailPattern.test(input), type: 'email', value: input };

    case 8: // Phone number validation
      const phonePattern = /^\+\d{10,}$/;
      return { valid: phonePattern.test(input), type: 'phone', value: input };

    case 9: // Measurement time validation (time cannot be before tomorrow's date)
      const measurementTime = new Date(input);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isValidTime = !isNaN(measurementTime) && measurementTime > tomorrow;
      return { valid: isValidTime, type: 'measurementTime', value: measurementTime };

    default:
      return { valid: false, type: null, value: null };
  }
}

// Array to store the validated answers
const answers = [];

// Function to handle user input
function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    addMessage(userMessage, false);
    userInput.value = '';

    // If we're at the main menu, handle the menu selection
    if (currentQuestions === menuQuestions) {
      handleMainMenuSelection(userMessage);
      return; // Exit the function since we've handled the menu selection
    }

    if (currentQuestions === freeMeasurementQuestions) {
      // Same validation and answer handling as before
      // ...

      if (currentQuestionIndex >= currentQuestions.length) { // Check if all questions have been asked
        saveMeasurementData(answers); // Save answers
        addMessageWithAnimation("Vissza szeretne lépni a főmenübe? (igen/nem): ", true);
        askingReturnToMenu = true; // Set flag to track that we're asking to return to the main menu
      } else {
        askNextQuestion(); // Move to the next question
      }



    if (currentQuestions === freeMeasurementQuestions) {
      const validation = validateInput(currentQuestionIndex - 1, userMessage)
      if (validation.valid) {
        answers.push({type: validation.type, value: validation.value});
      }

      if (currentQuestionIndex === currentQuestionIndex.length) {
        saveMeasurementData(answers);
        // addMessageWithAnimation("Vissza szeretne lépni a főmenübe? (igen/nem): ", true)
      } else {
        askNextQuestion();
      }
    } else {
      alert('Kérem létező opciót válasszon');
    }

    if (userMessage === 'igen') { // If the user says "yes" (igen)
      currentQuestions = menuQuestions;
      currentQuestionIndex = 0;
      askNextQuestion(); // Return to main menu
    } else if (userMessage === 'nem') { // If the user says "no" (nem)
      addMessage('Köszönöm, hogy igénybe vette szolgáltatásunkat!', true); // Thank you message
    } else {
      addMessage('Kérem, válaszoljon "igen" vagy "nem".', true); // Invalid response
    }
    askingReturnToMenu = false; // Reset flag
    return;

  }
}
}

function saveMeasurementData(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFile('measurementDatas.json', jsonData, (err) => {
    if (err) {
      console.error('An error occurred while saving the data:', err);
    } else {
      console.log('Data saved successfully');
    }
  });
}

let backToMenu = false;
let currentQuestions;
let currentQuestionIndex = 0;

function handleMainMenuSelection(selection) {
  switch(selection.toLowerCase()) {
    case 'ingyenes':
      addMessageWithAnimation(
        'Ingyenes felmérés igénylésének a menete a következő: \n Ön megadja a kért elérhetőségeit és kolléganőnk telefonon \n egyeztet Önnel egy időpontot amikor területi képviselő \n kollégánk fel fogja Önt keresni. \n A helyszíni felmérés során kollégánkkal mindent meg tud \n beszélni és egyeztetni tudja az elképzeléseit.\n Ezt követően a lemért méretek alapján a helyszínen \n elkészítünk egy árajánlatot amely a kiadástól számítva 2 hétig érvényes. \n Kérjük adja meg a következő adatokat:',true);
      currentQuestionIndex = 0;
      currentQuestions = freeMeasurementQuestions;
      setTimeout(measurementHandlerFunction, 5000); // Adds a 5-second delay before asking the next question
      break;
    case '':
      addMessage('You have selected Offers!', true);
      // Handle offers here or ask the next question
      break;
    case 'vissza':

    default:
      addMessage('Invalid selection! Please choose either "free measurements" or "offers".', true);
      break;
  }
}



// Function to send the answers to the server using a POST request
function sendAnswersToServer(answers) {
  const url = '/answers';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answers),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        // If the response status is 200-299 (successful), display success message
        console.log('Server response:', response.status, response.statusText);
        displaySuccessMessage();
      } else {
        throw new Error('Failed to send data to server.');
      }
    })
    .catch((error) => {
      console.error('Error sending data to server:', error);
    });
}


function measurementHandlerFunction() {
  currentQuestionIndex = 0;
  currentQuestions = freeMeasurementQuestions;
  askNextQuestion();
}

// Function to display success message to the user
function displaySuccessMessage() {

  addMessage(successMessage, true);
}

// Function to add a bot question and ask it with animation
function askQuestionWithAnimation(question) {
  addMessageWithAnimation(question, true);
}

// Array of bot questions
const menuQuestions = [
  "Üdvözöljük a ponyvaexpressz oldalán, kérem vállasszon \n a következő lehetőségek közül: \n \t ingyenes felmérés igénylése \n \t árajánlat kérése meglévő méretek alapján \n \t érdeklődés \n \t aktuális akcióinkról történő tájékozódás \n \t ügyfélszolgálat"
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
  'Adja meg a ponyva típusát(terasz ponyva, filagória ponyva, kocsi beálló, egyéb):'
];

const offerSideMenuQuestions = [
  "Kérem válasszon az alábbi lehetőségek közül: \n \t Képlet alapján általános árajánlat látványtervvel \n \t 3D tervezés"
]

const offerQuestions = [

]

// Function to ask the next bot question
function askNextQuestion() {
  if (currentQuestionIndex < currentQuestions.length) {
    askQuestionWithAnimation(currentQuestions[currentQuestionIndex]);
    currentQuestionIndex++;
  } else {
    // No more questions, conversation completed
    addMessageWithAnimation('Ha vissza szeretne menni a főmenübe írja (vissza):', true);

  }
}

// Event listener for the send button
sendBtn.addEventListener('click', handleUserInput);

// Start the conversation by asking the first question
currentQuestions = menuQuestions;
setTimeout(() => askNextQuestion(), 1000);
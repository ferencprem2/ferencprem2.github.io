import { askNextQuestion } from "./script";

let numberOfTarps;

export function OfferHandler(userMessage, currentQuestions, currentQuestionIndex, offerQuestions, offerDatasArray, menuQuestions ){
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
}
import { askNextQuestion, addMessage, freeMeasurementQuestions, measurementDatasArray, menuQuestions, currentQuestionIndex, currentQuestions, hungarianCounties } from "./script.js";


/*
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
*/


export const MeasurementHandler = (userMessage) => {
        console.log(userMessage)
        console.log(currentQuestionIndex)
        switch(currentQuestionIndex){
            case 1: 
                currentQuestionIndex == 1 && userMessage.length == 0 ? addMessage("Kérem töltse ki a mezőt!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 2:
                currentQuestionIndex == 2 && !hungarianCounties.includes(userMessage) ? addMessage("Kérem létező megyét adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 3:
                currentQuestionIndex == 3 && userMessage.length != 4 ? addMessage("Kérem létező irányítószámot adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
                break;
            case 4:
                currentQuestionIndex == 4 && userMessage.length == 0 ?  addMessage("Kérem létező települést adjon meg!", true) : (measurementDatasArray.push(userMessage), askNextQuestion())
        }
}
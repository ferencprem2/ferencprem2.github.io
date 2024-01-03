import { supportDataArray, measurementDatasArray, interestDataArray } from "./models/chatBotModels.js";
import { setIsOptionSelected } from "./script.js";

//TODO: megcsinálni megint 
const resultSummary = document.getElementById('resultContent');
const resultDiv = document.getElementById('results')
const doneButton = document.getElementById('sendButton')
const editButton = document.getElementById("editButton")

export function showSummary(DataObject, questionArray) {
    if (!resultSummary) {
        console.error('The "offer-summary" element was not found in the DOM. Make sure it exists.');
        return;
    }

    let summaryText = '';
    Object.keys(DataObject).forEach((key, index) => {
        console.log(questionArray[index]);
        summaryText += `<div class="summary-container"> <p>${index + 1}. adat: ${questionArray[index]}:</p> <input type="text" value="${DataObject[key]}" readonly></input></div>`;
    });
    
    resultDiv.style.visibility = 'visible';
    resultSummary.innerHTML = summaryText;

    const inputs = Array.from(document.querySelectorAll("#resultContent input"));
    
    let isEditable = false;
    var newInputValues = []
    editButton.addEventListener("click", () => {
        console.log(DataObject)
        // editButton.style.backgroundColor = 'darkgreen';
        isEditable ? editButton.style.backgroundColor = '#a60303' : editButton.style.backgroundColor = 'darkgreen';
        if (isEditable) {
            inputs.forEach(input => newInputValues.push(input.value));
            console.log(newInputValues);
        }
        
        inputs.forEach(input => input.readOnly = isEditable);
        isEditable = !isEditable
    })
    
    doneButton.addEventListener('click', () => {
        console.log("done1");
        setIsOptionSelected(false);
        console.log("done2");
        const URL = "http://localhost:8080/"
        switch(DataObject) {
            case measurementDatasArray: 
                console.log("freeAsd")
                sendJsonData(measurementDatasArray, URL, "setMeasurementData")
                break;
            case supportDataArray:
                console.log("supAssd")
                sendJsonData(supportDataArray, URL, "setSupportData")
                break;
            case interestDataArray:
                console.log("interestASD");
                sendJsonData(interestDataArray, URL, "setInterestData")
                break;
        }

        resultDiv.style.visibility = 'hidden'
    })

}


function sendJsonData(DataArray, URL, address) {
    fetch(URL + address, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(DataArray)
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
}
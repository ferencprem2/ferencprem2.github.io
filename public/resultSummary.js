const resultSummary = document.getElementById('resultContent');
const resultDiv = document.getElementById('results')
const doneButton = document.getElementById('sendButton')

export function showSummary(DataArray, questionArray) {
    if (!resultSummary) {
        console.error('The "offer-summary" element was not found in the DOM. Make sure it exists.');
        return;
    }

    let summaryText = '';
    for (let i = 0; i < DataArray.length; i++) {
        console.log(questionArray[i])
        const currentData = DataArray[i];
        summaryText += `<div class="summary-container"> <p>${i + 1}. adat: ${questionArray[i]}: ${currentData}</p> <button id="sendButton">Változtatás</button> </div>`

    }

    resultDiv.style.visibility = 'visible'
    resultSummary.innerHTML = summaryText;

    doneButton.addEventListener('click', () => {
        //TODO: Confirmation for the datas, yes or no
        resultDiv.style.visibility = 'hidden'
    })


}

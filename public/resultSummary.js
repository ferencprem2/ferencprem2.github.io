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
        console.log(DataArray[i])
        for (let j = 0; j > questionArray; j++) {
            const currentData = DataArray[i];
            summaryText += `<p>${questionArray[j]}: ${currentData}</p>`
        }
    }

    resultDiv.style.visibility = 'visible'
    resultSummary.innerHTML = summaryText;

    doneButton.addEventListener('click', () => {
        resultDiv.style.visibility = 'hidden'
        alert('Adatok elküldve')
    })
    

}

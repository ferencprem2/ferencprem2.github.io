const resultSummary = document.getElementById('resultContent');
const resultDiv = document.getElementById('results')
const doneButton = document.getElementById('sendButton')
const editButton = document.getElementById("editButton")

export function showSummary(DataArray, questionArray) {
    if (!resultSummary) {
        console.error('The "offer-summary" element was not found in the DOM. Make sure it exists.');
        return;
    }

    let summaryText = '';
    for (let i = 0; i < DataArray.length; i++) {
        console.log(questionArray[i])
        summaryText += `<div class="summary-container"> <p>${i + 1}. adat: ${questionArray[i]}:</p> <input type="text" value="${DataArray[i]}" readonly></input></div>`
    }
    resultDiv.style.visibility = 'visible';
    resultSummary.innerHTML = summaryText;

    const inputs = Array.from(document.querySelectorAll("#resultContent input"));
    
    let isEditable = false;
    var newInputValues = []
    editButton.addEventListener("click", () => {
        console.log(DataArray)
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
        //TODO: Confirmation for the datas, yes or no
        resultDiv.style.visibility = 'hidden'
    })

}

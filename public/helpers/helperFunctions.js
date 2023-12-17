import { handleUserInput } from "../script.js";

function enforcePhoneNumberFormat(event) {
    let value = event.target.value;

    // Ensure the value starts with +36
    if (!value.startsWith('+36')) {
        value = '+36' + value.replace(/[^0-9]/g, '').slice(2);
    } else {
        value = '+36' + value.slice(3).replace(/[^0-9]/g, '');
    }

    event.target.value = value;
}
//Transforms input field to phone
export function transformToPhoneInput(inputField) {
    inputField.type = 'tel';
    inputField.maxLength = 12;
    inputField.placeholder = 'Enter phone number';
    inputField.className
    // Additional logic to ensure that +36 is always present
    inputField.addEventListener('input', enforcePhoneNumberFormat);
    inputField.focus();
}

//Transforms the input field into a datepicker
export function transformToDatepicker(inputField) {
    inputField.removeEventListener('input', enforcePhoneNumberFormat);
    inputField.type = 'date';

    let today = new Date();
    today.setDate(today.getDate() + 1); // Add one day to set the date to tomorrow

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    let tomorrow = yyyy + '-' + mm + '-' + dd; // Format date as YYYY-MM-DD

    inputField.min = tomorrow; // Set the min attribute to tomorrow's date
    inputField.focus();
}

//Replaces input field with a dropDown
export function replaceInputWithSelect(inputField, dataArray,) {
    // Create a new select element
    let select = document.createElement('select');
    select.id = inputField.id; // Carry over the original input's ID

    // Populate the select element with options
    dataArray.forEach(function (item) {
        let option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });

    select.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    // Replace the input field with the select element in the DOM
    inputField.parentNode.replaceChild(select, inputField);
    select.focus();
}

//Replaces the dropDown with an input filed
export function replaceSelectWithInput(selectElement) {
    // Create a new input element
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Írja válaszát ide";
    input.id = selectElement.id; // Carry over the original select's ID


    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    // Replace the select element with the input field in the DOM
    selectElement.parentNode.replaceChild(input, selectElement);
    input.focus();
}

export function resetToTextInput(inputField) {
    inputField.type = 'text'; // Reset the input type to text
    inputField.value = ''; // Clear any existing value
    inputField.placeholder = "Írja válaszát ide";
    inputField.removeAttribute('min'); // Remove min attribute if set
    inputField.removeAttribute('maxLength'); // Remove maxLength attribute if set
    inputField.focus();
    // Remove any other attributes or event listeners specific to other input types
}
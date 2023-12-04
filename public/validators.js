export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}

export const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^(\+\d{1,4}\s?)?(\d{1,4}\s?|-)?(\d{1,4}\s?|-)?\d{4}$/;
    return pattern.test(phoneNumber);
}

export const validateDate = (inputDate) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!pattern.test(inputDate)) {
        return false;
    }

    const date = new Date(inputDate);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date > today;
}

export function validateZipCode(zipCode) {
    var regex = /^\d{4}$/;
    var errorMessage = document.getElementById('errorMessage');
    
    if (regex.test(zipCode)) {
        return true
    } else {
        return false
    }
}
/**
 * this function checks if the form object has any empty values or not
 * @param {Object.prototype} formObj - an object where keys denote the input fields in the form and the values are their respective values enetered by the user
 * @returns {boolean} - true if the form is empty otherwise false 
 */
export const isFormEmpty = formObj => Object.values(formObj).some(val => val === '')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

/**
 * this function is used to get the month in words
 * @param {Number} monthInDigits - month number
 * @returns {String} - month in words 
 */
export const getMonthInWords = monthInDigits => months[monthInDigits]

/**
 * this function is used to cnovert the date to string format
 * @param {Date} date - date object
 * @returns {String} - date in string 
 */
export const getDate = date => `${new Date(date).getDate()}-${getMonthInWords(new Date(date).getMonth())}-${new Date(date).getFullYear()}`

/**
 * this function is used to extract time from the date
 * @param {Date} date - date object
 * @returns {String} - time in HH:MM:SS format 
 */
export const getTime = date => `${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`

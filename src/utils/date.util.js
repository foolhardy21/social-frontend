const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const getMonthInWords = monthInDigits => months[monthInDigits]


export const getDate = date => `${new Date(date).getDate()}-${getMonthInWords(new Date(date).getMonth())}-${new Date(date).getFullYear()}`

export const getTime = date => `${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`
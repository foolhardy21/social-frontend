export const getUserToken = () => window.localStorage.getItem('userToken')

export const getUsername = () => window.localStorage.getItem('username')

export const resetLocalStorage = () => {
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('username')
}
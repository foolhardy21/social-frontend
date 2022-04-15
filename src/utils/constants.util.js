export const ACTION_TOGGLE_PASSWORD_TYPE = 'TOGGLE_PASSWORD_TYPE'
export const ACTION_UPDATE_USERNAME = 'UPDATE_USERNAME'
export const ACTION_UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const ACTION_UPDATE_ALERT = 'UPDATE_ALERT'
export const ACTION_UPDATE_FIRST_NAME = 'UPDATE_FIRSTNAME'
export const ACTION_UPDATE_LAST_NAME = 'UPDATE_LASTNAME'
export const ACTION_INIT_POSTS = 'INIT_POSTS'
export const ACTION_LIKE_POST = 'LIKE_POST'
export const ACTION_INIT_USER_FEED = 'INIT_USER_FEED'
export const ACTION_INIT_BOOKMARKS = 'INIT_BOOKMARKS'
export const ACTION_REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'
export const ACTION_CREATE_POST = 'CREATE_POST'
export const ACTION_SET_LOADING = 'SET_LOADING'
export const ACTION_REMOVE_LOADING = 'REMOVE_LOADING'
export const ACTION_INIT_PROFILE_POSTS = 'INIT_PROFILE_POSTS'
export const ACTION_REMOVE_POST = 'REMOVE_POST'
export const ACTION_EDIT_POST = 'EDIT_POST'
export const ACTION_SET_BIO = 'SET_BIO'
export const ACTION_UPDATE_BIO = 'UPDATE_BIO'

export const API_LOGIN = '/api/auth/login'
export const API_SIGNUP = '/api/auth/signup'
export const API_POSTS = '/api/posts'
export const API_POST_LIKE = '/api/posts/like'
export const API_POST_DISLIKE = '/api/posts/dislike'
export const API_POST_BOOKMARK = '/api/users/bookmark'
export const API_REMOVE_BOOKMARK = '/api/users/remove-bookmark'

export const ALERT_DISPLAY_TIME = 1500

export const ALERT_TYPE_ERROR = 'error'
export const ALERT_TYPE_SUCCESS = 'success'
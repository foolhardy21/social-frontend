export function commentsReducer(state, { type, payload }) {
    switch (type) {
        case 'INIT_COMMENTS': return { ...state, comments: payload }
    }
}
import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { postsReducer } from "reducers";

const PostsContext = createContext({})

export const PostsProvider = ({ children }) => {
    const [postsState, postsDispatch] = useReducer(postsReducer, {
        posts: [],
        loading: false,
    })

    const getPosts = async () => {
        postsDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/posts')
            return response
        } catch (e) {
            return e.response
        } finally {
            postsDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    return (
        <PostsContext.Provider
            value={{
                postsState,
                postsDispatch,
                getPosts,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => useContext(PostsContext)
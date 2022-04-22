import { useState, useEffect } from 'react'
import { useAuth, useBookmarks, usePosts } from 'contexts'
import { ACTION_INIT_BOOKMARKS, ACTION_LIKE_POST, getDate, getTime } from 'utils'
import styles from './post.module.css'

const Post = ({ post: { _id, username, content, likes: { likeCount, likedBy }, createdAt } }) => {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [isPostBookmarked, setIsPostBookmarked] = useState(false)
    const { isUserLoggedIn, getUsername } = useAuth()
    const { postsState: { posts }, likePost, dislikePost, postsDispatch } = usePosts()
    const { bookmarksState: { bookmarks }, bookmarkPost, removeBookmarkFromPost, bookmarksDispatch } = useBookmarks()

    useEffect(() => {
        const loggedInUsername = getUsername()
        if (likedBy.some(user => user.username === loggedInUsername)) {
            setIsPostLiked(true)
        } else {
            setIsPostLiked(false)
        }
    }, [posts])

    useEffect(() => {
        if (bookmarks.some(bookmark => bookmark._id === _id)) {
            setIsPostBookmarked(true)
        } else {
            setIsPostBookmarked(false)
        }
    }, [bookmarks])

    const handleRemoveBookmark = async () => {
        const response = await removeBookmarkFromPost(_id)
        if (response.status === 200) {
            bookmarksDispatch({ type: ACTION_INIT_BOOKMARKS, payload: response.data.bookmarks })
        } else if (response.status === 400) {
            // already removed from bookmarks
        } else if (response.status === 404) {
            // not logged in
        }
    }

    const handlePostBookmark = async () => {
        if (isUserLoggedIn) {
            const response = await bookmarkPost(_id)
            if (response.status === 200) {
                bookmarksDispatch({ type: ACTION_INIT_BOOKMARKS, payload: response.data.bookmarks })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already bookmarked
            }
        }
    }

    const handlePostLike = async () => {
        if (isUserLoggedIn) {
            const response = await likePost(_id)
            if (response.status === 201) {
                const likedPost = response.data.posts.find(post => post._id === _id)
                postsDispatch({ type: ACTION_LIKE_POST, payload: likedPost })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already liked
            }
        }
    }

    const handlePostDislike = async () => {
        if (isUserLoggedIn) {
            const response = await dislikePost(_id)
            if (response.status === 201) {
                const dislikedPost = response.data.posts.find(post => post._id === _id)
                postsDispatch({ type: ACTION_LIKE_POST, payload: dislikedPost })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already disliked
            }
        }
    }

    return (

        <article className={`${styles.postDiv} pd-s`}>
            <p className='txt-secondary txt-md txt-500'>{'@ '}{username}</p>
            <p className='txt-secondary txt-md txt-300 mg-left-xs mg-top-s mg-btm-s'>{content}</p>
            <p className='txt-off-secondary txt-md txt-300'>{getDate(createdAt)}</p>
            <p className='txt-off-secondary txt-md txt-300'>{getTime(createdAt)}</p>
            <div className='flx flx-maj-stretch mg-top-s'>
                <p className='txt-secondary txt-md txt-300'>{`likes ${likeCount}`}</p>
                <div className='flx'>
                    <button onClick={isPostBookmarked ? handleRemoveBookmark : handlePostBookmark} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        <span className='material-icons icon-secondary'>{isPostBookmarked ? 'bookmark' : 'bookmark_border'}</span>
                    </button>
                    <button onClick={isPostLiked ? handlePostDislike : handlePostLike} className='btn-txt txt-md txt-secondary txt-300'>
                        <span className='material-icons icon-secondary'>{isPostLiked ? 'favorite' : 'favorite_border'}</span>
                    </button>
                </div>
            </div>
        </article>
    )

}

export default Post

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth, useBookmarks, useModal, usePosts } from 'contexts'
import { ACTION_INIT_BOOKMARKS, ACTION_LIKE_POST, ACTION_REMOVE_POST, getDate, getTime } from 'utils'
import styles from './post.module.css'

const Post = ({ post: { _id, username, content, likes: { likeCount, likedBy }, createdAt } }) => {
    const params = useParams()
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [isPostBookmarked, setIsPostBookmarked] = useState(false)
    const navigate = useNavigate()
    const { isUserLoggedIn, getUsername } = useAuth()
    const { postsState: { posts }, likePost, dislikePost, editPost, removePost, postsDispatch } = usePosts()
    const { bookmarksState: { bookmarks }, bookmarkPost, removeBookmarkFromPost, bookmarksDispatch } = useBookmarks()
    const { setModal } = useModal()

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

    const handleEditPost = async () => {
        setModal(m => ({ ...m, type: 'POST', id: _id }))
    }

    const handleRemovePost = async () => {
        const response = await removePost(_id)
        if (response.status === 201) {
            postsDispatch({ type: ACTION_REMOVE_POST, payload: _id })
        } else if (response.status === 404) {
            // not logged in
        } else if (response.status === 400) {
            // not your post
        }
    }

    const handlePostClick = () => {
        navigate(`/${username}/post/${_id}`)
    }

    const handleUsernameClick = (e) => {
        navigate(`/${username}`)
        e.stopPropagation()
    }

    return (
        <article onClick={handlePostClick} className={`${styles.postDiv} pd-s`}>
            <div className='flx flx-maj-stretch'>
                <p onClick={handleUsernameClick} className='btn-txt txt-secondary txt-md txt-500'>
                    {'@ '}{username}
                </p>
                {
                    getUsername() === username && params.username === username &&
                    <div className='flx'>
                        <button onClick={handleEditPost} className='btn-txt mg-right-xs'>
                            <span className='material-icons icon-secondary'>
                                edit
                            </span>
                        </button>
                        <button onClick={handleRemovePost} className='btn-txt'>
                            <span className='material-icons icon-secondary'>
                                delete
                            </span>
                        </button>
                    </div>
                }
            </div>
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

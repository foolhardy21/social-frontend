import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth, useBookmarks, useModal, usePosts } from 'contexts'
import { getDate, getTime } from 'utils'
import { initialiseBookmarks, initialisePosts } from 'slices'
import styles from './post.module.css'

const Post = ({ post: { _id, username, content, likes: { likeCount, likedBy }, createdAt } }) => {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [isPostBookmarked, setIsPostBookmarked] = useState(false)
    const navigate = useNavigate()
    const { isUserLoggedIn, getUsername } = useAuth()
    const { likePost, dislikePost, removePost } = usePosts()
    const { bookmarkPost, removeBookmarkFromPost } = useBookmarks()
    const { setModal } = useModal()
    const { posts } = useSelector(state => state.posts)
    const { bookmarks } = useSelector(state => state.bookmarks)
    const dispatch = useDispatch()
    const params = useParams()

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

    const handleRemoveBookmark = async (e) => {
        e.stopPropagation()
        const response = await removeBookmarkFromPost(_id)
        if (response.status === 200) {
            dispatch(initialiseBookmarks(response.data.bookmarks))
        } else if (response.status === 400) {
            // already removed from bookmarks
        } else if (response.status === 404) {
            // not logged in
        }
    }

    const handlePostBookmark = async (e) => {
        e.stopPropagation()
        if (isUserLoggedIn) {
            const response = await bookmarkPost(_id)
            if (response.status === 200) {
                dispatch(initialiseBookmarks(response.data.bookmarks))
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already bookmarked
            }
        }
    }

    const handlePostLike = async (e) => {
        e.stopPropagation()
        if (isUserLoggedIn) {
            const response = await likePost(_id)
            if (response.status === 201) {
                dispatch(initialisePosts(response.data.posts))
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already liked
            }
        }
    }

    const handlePostDislike = async (e) => {
        e.stopPropagation()
        if (isUserLoggedIn) {
            const response = await dislikePost(_id)
            if (response.status === 201) {
                dispatch(initialisePosts(response.data.posts))
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already disliked
            }
        }
    }

    const handleEditPost = async (e) => {
        e.stopPropagation()
        setModal(m => ({ ...m, type: 'POST', id: _id }))
    }

    const handleRemovePost = async (e) => {
        e.stopPropagation()
        const response = await removePost(_id)
        if (response.status === 201) {
            dispatch(initialisePosts(response.data.posts))
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

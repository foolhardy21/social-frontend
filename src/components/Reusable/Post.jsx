import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth, useBookmarks, useModal } from 'contexts'
import { getDate, getTime } from 'utils'
import { likePost, dislikePost, removeBookmarkFromPost, removePost, bookmarkPost } from 'slices'
import styles from './post.module.css'

const Post = ({ post: { _id, username, content, likes: { likeCount, likedBy }, createdAt } }) => {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [isPostBookmarked, setIsPostBookmarked] = useState(false)
    const navigate = useNavigate()
    const { getUsername, getUserToken } = useAuth()
    const { } = useBookmarks()
    const { setModal } = useModal()
    const { posts } = useSelector(state => state.posts)
    const { bookmarks } = useSelector(state => state.bookmarks)
    const { isUserLoggedIn } = useSelector(state => state.auth)
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

    const handleRemoveBookmark = e => {
        e.stopPropagation()

        const token = getUserToken()
        dispatch(removeBookmarkFromPost({ _id, token }))
    }

    const handlePostBookmark = async (e) => {
        e.stopPropagation()

        if (isUserLoggedIn) {
            const token = getUserToken()
            dispatch(bookmarkPost({ _id, token }))
        }
    }

    const handlePostLike = e => {
        e.stopPropagation()

        if (isUserLoggedIn) {
            const token = getUserToken()
            dispatch(likePost({ _id, token }))
        }
    }

    const handlePostDislike = e => {
        e.stopPropagation()

        if (isUserLoggedIn) {
            const token = getUserToken()
            dispatch(dislikePost({ _id, token }))
        }
    }

    const handleEditPost = (e) => {
        e.stopPropagation()

        setModal(m => ({ ...m, type: 'POST', id: _id }))
    }

    const handleRemovePost = (e) => {
        e.stopPropagation()

        const token = getUserToken()
        dispatch(removePost({ _id, token }))
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

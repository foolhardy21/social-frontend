import { useState, useEffect } from 'react'
import { useAuth, usePosts } from 'contexts'
import { ACTION_LIKE_POST, getDate, getTime } from 'utils'
import styles from './reusable.module.css'

const Post = ({ post: { _id, username, content, likes: { likeCount, likedBy }, createdAt } }) => {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const { isUserLoggedIn, getUsername } = useAuth()
    const { postsState: { posts }, likePost, dislikePost, bookmarkPost, postsDispatch } = usePosts()

    useEffect(() => {
        const loggedInUsername = getUsername()
        if (likedBy.some(user => user.username === loggedInUsername)) {
            setIsPostLiked(true)
        } else {
            setIsPostLiked(false)
        }
    }, [posts])

    const handlePostBookmark = async () => {
        if (isUserLoggedIn) {
            const response = await bookmarkPost(_id)
            if (response.status === 200) {
                // bookmarked
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

                    <button onClick={handlePostBookmark} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        bookmark
                    </button>

                    {
                        isPostLiked ? <button onClick={handlePostDislike} className='btn-txt txt-md txt-secondary txt-300'>
                            dislike
                        </button> : <button onClick={handlePostLike} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                            like
                        </button>

                    }

                </div>

            </div>

        </article>
    )

}

export default Post

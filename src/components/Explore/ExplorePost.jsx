import { Link } from 'react-router-dom'
import { useAuth, useBookmarks, useModal, usePosts, useProfile } from 'contexts'
import { getDate, getTime } from 'utils'
import styles from './explore.module.css'

const ExplorePost = ({ post: { _id, username, content, likes: { likeCount }, createdAt } }) => {
    const { isUserLoggedIn } = useAuth()
    const { likePost, dislikePost, bookmarkPost, postsDispatch, removeBookmarkFromPost } = usePosts()
    const { bookmarksDispatch } = useBookmarks()
    const { deletePost, profileDispatch } = useProfile()
    const { setModal } = useModal()


    const handlePostEdit = async () => {
        // show the modal, pass the type and post id to it.
        // based on the type it will show the edit post modal or edit profile modal
        setModal(m => ({ ...m, type: 'POST', id: _id }))
    }

    const handlePostDelete = async () => {
        const response = await deletePost(_id)
        if (response.status === 201) {
            profileDispatch({ type: 'REMOVE_FROM_PROFILE_POSTS', payload: _id })
        } else if (response.status === 404) {
            //    not logged in
        } else if (response.status === 400) {
            //    not your post
        }
    }

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

    const handleRemoveBookmark = async () => {
        if (isUserLoggedIn) {
            const response = await removeBookmarkFromPost(_id)
            if (response.status === 200) {
                bookmarksDispatch({ type: 'REMOVE_BOOKMARK', payload: _id })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already removed from bookmarks
            }
        }
    }

    const handlePostLike = async () => {
        if (isUserLoggedIn) {
            const response = await likePost(_id)
            if (response.status === 201) {
                const likedPost = response.data.posts.find(post => post._id === _id)
                postsDispatch({ type: 'LIKE_POST', payload: likedPost })
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
                postsDispatch({ type: 'LIKE_POST', payload: dislikedPost })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already liked
            }
        }
    }

    return (

        <article className={`${styles.postDiv} pd-s`}>

            <div className='flx flx-maj-stretch'>

                <Link to={`/${username}`} className='btn-txt txt-secondary txt-md txt-500'>{'@ '}{username}</Link>

                <div className='flx'>

                    <button onClick={handlePostEdit} className='btn-txt mg-right-xs'>
                        <span className='material-icons icon-secondary'>
                            edit
                        </span>
                    </button>

                    <button onClick={handlePostDelete} className='btn-txt'>
                        <span className='material-icons txt-err'>
                            delete
                        </span>
                    </button>

                </div>

            </div>

            <p className='txt-secondary txt-md txt-300 mg-left-xs mg-top-s mg-btm-s'>{content}</p>

            <p className='txt-off-secondary txt-md txt-300'>{getDate(createdAt)}</p>

            <p className='txt-off-secondary txt-md txt-300'>{getTime(createdAt)}</p>

            <div className='flx flx-maj-stretch mg-top-s'>

                <p className='txt-secondary txt-md txt-300'>{`likes ${likeCount}`}</p>

                <div className='flx'>

                    <button onClick={handlePostBookmark} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        bookmark
                    </button>

                    <button onClick={handleRemoveBookmark} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        remove bookmark
                    </button>

                    <button onClick={handlePostLike} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        like
                    </button>

                    <button onClick={handlePostDislike} className='btn-txt txt-md txt-secondary txt-300'>
                        dislike
                    </button>

                </div>

            </div>

        </article>
    )

}

export default ExplorePost
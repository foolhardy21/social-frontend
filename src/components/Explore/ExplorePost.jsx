import { useAuth, usePosts } from 'contexts'
import { getDate, getTime } from 'utils'
import styles from './explore.module.css'

const ExplorePost = ({ post: { _id, username, content, likes: { likeCount }, createdAt } }) => {
    const { isUserLoggedIn } = useAuth()
    const { likePost, bookmarkPost, postsDispatch } = usePosts()

    const handlePostBookmark = async () => {
        if (isUserLoggedIn) {
            const response = await bookmarkPost(_id)
            console.log(response)
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
                postsDispatch({ type: 'INIT_POSTS', payload: response.data.posts })
            } else if (response.status === 404) {
                // not logged in
            } else if (response.status === 400) {
                // already liked
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
                        {/* {isPostBookmarked ? 'bookmarked' : 'bookmark'} */}
                        bookmark
                    </button>

                    <button onClick={handlePostLike} className='btn-txt txt-md txt-secondary txt-300'>
                        {/* {isPostLiked ? 'liked' : 'like'} */}
                        like
                    </button>

                </div>

            </div>

        </article>
    )

}

export default ExplorePost
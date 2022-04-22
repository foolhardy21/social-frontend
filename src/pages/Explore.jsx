import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { FeedPageWrapper, Post, PostsWrapper } from 'components/Reusable'
import { usePosts, useAuth } from 'contexts'
import { ACTION_INIT_POSTS } from 'utils'
import styles from 'components/Reusable/feedpage.module.css'

const ExplorePostsSection = () => {
    const { postsState: { loading, posts }, getPosts, postsDispatch } = usePosts()
    const { getUserToken, setIsUserLoggedIn } = useAuth()

    const ExplorePosts = PostsWrapper(Post, posts, 'explore')

    useEffect(() => {
        (async () => {
            const response = await getPosts()
            if (response.status === 200) {
                postsDispatch({ type: ACTION_INIT_POSTS, payload: response.data.posts })
            }
        })()
        if (getUserToken()) {
            setIsUserLoggedIn(true)
        }
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            {
                loading
                    ? <div className='flx flx-center mg-top-xlg'>
                        <ClipLoader size={50} color='#ffffff' />
                    </div>
                    : <ExplorePosts />
            }
        </div>
    )
}

const ExploreFeedPage = FeedPageWrapper(ExplorePostsSection)

export default ExploreFeedPage

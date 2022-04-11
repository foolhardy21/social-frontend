import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { FeedPageWrapper, PostsWrapper } from 'components/Reusable'
import { ExplorePost } from 'components/Explore'
import { usePosts } from 'contexts'
import { ACTION_INIT_POSTS } from 'utils'
import styles from 'components/Explore/explore.module.css'

const ExplorePosts = PostsWrapper(ExplorePost)

const ExplorePostsSection = () => {
    const { postsState: { loading }, getPosts, postsDispatch } = usePosts()

    useEffect(() => {
        (async () => {
            const response = await getPosts()
            if (response.status === 200) {
                postsDispatch({ type: ACTION_INIT_POSTS, payload: response.data.posts })
            }
        })()
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

const Explore = FeedPageWrapper(ExplorePostsSection)

export default Explore

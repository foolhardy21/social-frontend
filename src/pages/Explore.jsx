import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { CreatePost, FeedPageWrapper, PageHeading, Post, PostsWrapper } from 'components/Reusable'
import { usePosts, useAuth } from 'contexts'
import styles from 'components/Reusable/feedpage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { initialisePosts, removePostsLoading, setPostsLoading } from 'slices'

const ExplorePostsSection = () => {
    const { getPosts } = usePosts()
    const { getUserToken, setIsUserLoggedIn } = useAuth()
    const { posts, loading } = useSelector(state => state.postsState)
    const dispatch = useDispatch()

    const ExplorePosts = PostsWrapper(Post, posts, 'explore')

    useEffect(() => {
        (async () => {
            dispatch(setPostsLoading())
            const response = await getPosts()
            if (response.status === 200) {
                dispatch(initialisePosts(response.data.posts))
            }
            dispatch(removePostsLoading())
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
                    : <>
                        <PageHeading heading='explore' />
                        <CreatePost />
                        <ExplorePosts />
                    </>
            }
        </div>
    )
}

const ExploreFeedPage = FeedPageWrapper(ExplorePostsSection)

export default ExploreFeedPage

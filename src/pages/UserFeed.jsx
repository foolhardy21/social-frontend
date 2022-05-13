import axios from 'axios'
import { useEffect } from 'react'
import { FeedPageWrapper, Post, PostsWrapper, PageHeading } from "components/Reusable"
import { useAuth, usePosts } from 'contexts'
import { ACTION_INIT_USER_FEED } from 'utils'
import styles from 'components/Reusable/feedpage.module.css'

const UserFeedSection = () => {
    const { postsDispatch, postsState: { posts } } = usePosts()
    const { getUsername } = useAuth()

    const FeedPosts = PostsWrapper(Post, posts, 'my feed')

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/users')
            const loggedInUser = response.data.users.find(user => user.username === getUsername())
            postsDispatch({ type: ACTION_INIT_USER_FEED, payload: loggedInUser.following.map(followinguser => followinguser.username) })
        })()
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            <PageHeading heading='my feed' />
            <FeedPosts />
        </div>
    )
}

const UserFeedPage = FeedPageWrapper(UserFeedSection)

export default UserFeedPage

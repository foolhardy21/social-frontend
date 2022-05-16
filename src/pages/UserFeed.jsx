import axios from 'axios'
import { useEffect } from 'react'
import { FeedPageWrapper, Post, PostsWrapper, PageHeading } from "components/Reusable"
import { useAuth } from 'contexts'
import styles from 'components/Reusable/feedpage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseFeed } from 'slices'

const UserFeedSection = () => {
    const { getUsername } = useAuth()
    const { posts } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const FeedPosts = PostsWrapper(Post, posts, 'my feed')

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/users')
            const loggedInUser = response.data.users.find(user => user.username === getUsername())
            const loggedInUserFollowing = loggedInUser.following.map(followinguser => followinguser.username)
            const feedPosts = posts.filter(post => loggedInUserFollowing.some(username => username === post.username))
            dispatch(initialiseFeed(feedPosts))
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

import axios from 'axios'
import { useEffect } from 'react'
import { FeedPageWrapper, Post, PostsWrapper } from "components/Reusable"
import { useAuth, usePosts } from 'contexts'
import styles from 'components/Reusable/feedpage.module.css'
import { ACTION_INIT_USER_FEED } from 'utils'

const UserFeedSection = () => {
    const { postsDispatch, postsState: { posts } } = usePosts()
    const { getUserToken } = useAuth()

    const FeedPosts = PostsWrapper(Post, posts, 'my feed')

    // you may ignore this for now, this is a setup for the user feed
    useEffect(() => {
        (async () => {
            const response1 = await axios.get('/api/users')
            const mohit = response1.data.users.filter(user => user.username === 'coolmohit')
            const peter = response1.data.users.filter(user => user.username === 'ranjanchauhan')

            // mohit(loggedin) follows peter
            try {
                const response2 = await axios.post(`/api/users/follow/${peter[0]._id}`, {}, {
                    headers: {
                        authorization: getUserToken()
                    }
                })
            } catch (e) {
                console.log(e.response)
            }
            // get mohit(loggedin) with updated following array
            const response3 = await axios.get(`/api/users/${mohit[0]._id}`)
            // extract the following of mohit(loggedin)
            const mohitfollowing = response3.data.user.following.map(user => user.username)
            // set the user feed with posts of mohit(loggedin)'s following
            postsDispatch({ type: ACTION_INIT_USER_FEED, payload: mohitfollowing })
        })()
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            <FeedPosts />
        </div>
    )
}

const UserFeedPage = FeedPageWrapper(UserFeedSection)

export default UserFeedPage

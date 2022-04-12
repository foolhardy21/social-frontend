import { useEffect } from 'react'
import { ExplorePost } from 'components/Explore'
import { FeedPageHOC, PostsHOC } from "components/Reusable"
import { useAuth, usePosts } from 'contexts'
import styles from 'components/Explore/explore.module.css'
import axios from 'axios'

const HomePosts = PostsHOC(ExplorePost)

const UserFeedSection = () => {
    const { postsDispatch } = usePosts()
    const { getUserToken } = useAuth()

    useEffect(() => {
        (async () => {
            const response1 = await axios.get('/api/users')
            const mohit = response1.data.users.filter(user => user.username === 'coolmohit')
            const peter = response1.data.users.filter(user => user.username === 'peterparker')

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
            postsDispatch({ type: 'GET_USER_FEED', payload: mohitfollowing })
        })()
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            <HomePosts />
        </div>
    )
}

const UserFeed = FeedPageHOC(UserFeedSection)

export default UserFeed
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FeedPageWrapper, PageHeading } from "components/Reusable"
import styles from 'components/Reusable/post.module.css'
import styles2 from 'components/Reusable/feedpage.module.css'
import { useNavigate, useParams } from 'react-router-dom'

const FollowersSection = () => {
    const [followers, setFollowers] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/users')
            const currentUser = response.data.users.find(user => user.username === params.username)
            setFollowers(currentUser.followers)
        })()
    }, [params.username])

    return (
        <div className={`${styles2.feedDiv} flx flx-column pd-md`}>
            <PageHeading heading='followers' />
            {
                followers?.map(follower =>
                    <article key={follower._id} onClick={() => navigate(`/${follower.username}`)} className={`${styles.followerDiv} flx flx-min-center pd-btm-xs mg-s`}>
                        <img srcSet={follower.profileImg} alt={follower.username} className={`${styles.postProfileImg} brd-full img-fit-cover`} />
                        <div className='flx flx-column mg-left-s'>
                            <p className='txt-md txt-500 txt-secondary txt-cap'>{follower.firstName}{' '}{follower.lastName}</p>
                            <p className='txt-md txt-off-secondary'>{'@'}{follower.username}</p>
                        </div>
                    </article>
                )
            }
        </div>
    )
}

const FollowersPage = FeedPageWrapper(FollowersSection)

export default FollowersPage

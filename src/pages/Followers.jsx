import { useEffect, useState } from 'react'
import { FeedPageWrapper, PageHeading } from "components/Reusable"
import styles from 'components/Reusable/post.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const FollowersSection = () => {
    const [followers, setFollowers] = useState([])
    const { bio } = useSelector(state => state.profile)
    const navigate = useNavigate()

    useEffect(() => {
        setFollowers(bio.followers)
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            <PageHeading heading='my followers' />
            {
                followers?.map(follower =>
                    <article onClick={() => navigate(`/${follower.username}`)} className={`${styles.followerDiv} flx flx-min-center pd-btm-xs mg-s`}>
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

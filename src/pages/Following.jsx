import axios from 'axios'
import { useEffect, useState } from 'react'
import { FeedPageWrapper, PageHeading } from "components/Reusable"
import styles from 'components/Reusable/post.module.css'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const FollowingSection = () => {
    const [following, setFollowing] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/users')
            const currentUser = response.data.users.find(user => user.username === params.username)
            setFollowing(currentUser.following)
        })()
    }, [params.username])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            <PageHeading heading='following' />
            {
                following?.map(followingUser =>
                    <article key={followingUser._id} onClick={() => navigate(`/${followingUser.username}`)} className={`${styles.followerDiv} flx flx-min-center pd-btm-xs mg-s`}>
                        <img srcSet={followingUser.profileImg} alt={followingUser.username} className={`${styles.postProfileImg} brd-full img-fit-cover`} />
                        <div className='flx flx-column mg-left-s'>
                            <p className='txt-md txt-500 txt-secondary txt-cap'>{followingUser.firstName}{' '}{followingUser.lastName}</p>
                            <p className='txt-md txt-off-secondary'>{'@'}{followingUser.username}</p>
                        </div>
                    </article>
                )
            }
        </div>
    )
}

const FollowingPage = FeedPageWrapper(FollowingSection)

export default FollowingPage

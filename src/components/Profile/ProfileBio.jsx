import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDate, getUsername, getUserToken } from 'utils'
import { followUser, setModal, unFollowUser } from "slices"
import styles from './profile.module.css'
import { useNavigate } from "react-router-dom"

const ProfileBio = () => {
    const [isUserFollowed, setIsUserFollowed] = useState(false)
    const navigate = useNavigate()
    const { bio } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const handleProfileEdit = () => {
        dispatch(setModal({ type: 'BIO', id: bio.username }))
    }

    useEffect(() => {
        let isMounted = true;
        (async () => {
            if (getUsername() !== bio.username) {
                const users = await axios.get('/api/users')
                const loggedInUser = users.data.users.find(user => user.username === getUsername())
                if (loggedInUser.following.some(user => user.username === bio.username) && isMounted) {
                    setIsUserFollowed(true)
                } else if (isMounted) {
                    setIsUserFollowed(false)
                }
            }
        })()
        return () => { isMounted = false }
    }, [])

    const handleFollowUser = () => {
        const token = getUserToken()
        dispatch(followUser({ _id: bio._id, token }))
        setIsUserFollowed(true)
    }

    const handleUnfollowUser = async () => {
        const token = getUserToken()
        dispatch(unFollowUser({ _id: bio._id, token }))
        setIsUserFollowed(false)
    }

    return (
        <article className={`flx flx-column pd-md ${styles.profileDiv}`}>
            <div className="flx flx-maj-stretch flx-min-center">
                <div className="flx flx-min-center mg-btm-xs">
                    <img srcSet={bio?.profileImg} alt={bio?.username} className={`${styles.profileImg} brd-full img-fit-cover mg-right-xs`} />
                    <div className="flx flx-column">
                        <div className="flx">
                            <p className='txt-lg txt-600 txt-secondary mg-right-xs txt-cap' >{bio?.firstName}</p>
                            <p className='txt-lg txt-600 txt-secondary txt-cap'>{bio?.lastName}</p>
                        </div>
                        <p className='txt-md txt-off-secondary'>{`@${bio?.username}`}</p>
                    </div>
                </div>
                {
                    getUsername() !== bio?.username &&
                    <button onClick={isUserFollowed ? handleUnfollowUser : handleFollowUser} className={`btn-solid ${styles.btnFollow} txt-md txt-primary bg-primary pd-xs brd-md`}>
                        {
                            isUserFollowed ? 'unfollow' : 'follow'
                        }
                    </button>
                }
            </div>
            <p className='txt-md txt-off-secondary txt-cap'>{`joined ${getDate(bio?.createdAt)}`}</p>
            <div className="flx flx-min-center mg-top-s">
                <span className="material-icons txt-off-secondary mg-right-xs">
                    pin_drop
                </span>
                <a href={bio.city && `https://www.google.com/search?q=${bio?.city}`} target='_blank' className={`${bio.city ? styles.profileLink : ''} txt-md txt-secondary flx flx-min-center mg-right-md`}>
                    {bio.city ?? 'your city'}
                </a>
                <span className="material-icons txt-off-secondary mg-right-xs">
                    link
                </span>
                <a href={bio?.portfolio} target='_blank' className={`${bio.portfolio ? styles.profileLink : ''} txt-md txt-secondary flx flx-min-center`}>
                    {bio.portfolio ?? 'your portfolio'}
                </a>
            </div>
            <div className='flx flx-maj-stretch flx-min-center mg-top-md'>
                <div className='flx flx-min-center'>
                    <p onClick={() => navigate(`/${bio.username}/followers`)} className='txt-md txt-secondary txt-cap mg-right-xs'>{`followers ${bio?.followers?.length}`}</p>
                    <p onClick={() => navigate(`/${bio.username}/following`)} className='txt-md txt-secondary txt-cap'>{`following ${bio?.following?.length}`}</p>
                </div>
                {
                    getUsername() === bio?.username &&
                    <button onClick={handleProfileEdit} className={`btn-outlined b-solid b-secondary txt-secondary txt-md txt-300 brd-md pd-xs`}>edit profile</button>
                }
            </div>
        </article>
    )
}

export default ProfileBio
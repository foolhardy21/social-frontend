import axios from "axios"
import { useState, useEffect } from "react"
import { useAuth, useModal, useProfile } from "contexts"
import { getDate } from 'utils'
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux"
import { setProfileBio } from "slices"

const ProfileBio = () => {
    const [isUserFollowed, setIsUserFollowed] = useState(false)
    const { followUser, unFollowUser } = useProfile()
    const { setModal } = useModal()
    const { getUsername } = useAuth()
    const { bio } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const handleProfileEdit = async () => {
        setModal(m => ({ ...m, type: 'BIO', id: bio.username }))
    }

    useEffect(() => {
        (async () => {
            if (getUsername() !== bio.username) {
                const users = await axios.get('/api/users')
                const loggedInUser = users.data.users.find(user => user.username === getUsername())
                if (loggedInUser.following.some(user => user.username === bio.username)) {
                    setIsUserFollowed(true)
                } else {
                    setIsUserFollowed(false)
                }
            }
        })()
    }, [])

    const handleFollowUser = async () => {
        const response = await followUser(bio._id)
        if (response.status === 200) {
            setIsUserFollowed(true)
            dispatch(setProfileBio(response.data.followUser))
        } else if (response.status === 400) {
            // already following
        } else if (response.status === 404) {
            // not logged in
        }
    }

    const handleUnfollowUser = async () => {
        const response = await unFollowUser(bio._id)
        if (response.status === 200) {
            setIsUserFollowed(false)
            dispatch(setProfileBio(response.data.followUser))
        } else if (response.status === 400) {
            // already following
        } else if (response.status === 404) {
            // not logged in
        }
    }

    return (
        <article className={`flx flx-column pd-md ${styles.profileDiv}`}>
            <div className="flx flx-maj-stretch flx-min-center">
                <div className="flx">
                    <p className='txt-lg txt-600 txt-secondary mg-right-xs txt-cap' >{bio?.firstName}</p>
                    <p className='txt-lg txt-600 txt-secondary txt-cap'>{bio?.lastName}</p>
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
            <p className='txt-md txt-off-secondary mg-btm-s'>{`@${bio?.username}`}</p>
            <p className='txt-md txt-off-secondary txt-cap'>{`joined ${getDate(bio?.createdAt)}`}</p>
            <div className="flx flx-min-center mg-top-s">
                <a href={bio.city && `https://www.google.com/search?q=${bio?.city}`} target='_blank' className='txt-md txt-secondary flx flx-min-center mg-right-md'>
                    <span className="material-icons txt-off-secondary mg-right-xs">
                        pin_drop
                    </span>
                    {bio.city ?? 'your city'}
                </a>
                <a href={bio?.portfolio} target='_blank' className='txt-md txt-secondary flx flx-min-center'>
                    <span className="material-icons txt-off-secondary mg-right-xs">
                        link
                    </span>
                    {bio.portfolio ?? 'your portfolio'}
                </a>
            </div>
            <div className='flx flx-maj-stretch flx-min-center mg-top-md'>
                <div className='flx flx-min-center'>
                    <p className='txt-md txt-secondary txt-cap mg-right-xs'>{`followers ${bio?.followers?.length}`}</p>
                    <p className='txt-md txt-secondary txt-cap'>{`following ${bio?.following?.length}`}</p>
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
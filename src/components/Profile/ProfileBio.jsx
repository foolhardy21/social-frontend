import axios from "axios"
import { useAuth, useModal, useProfile } from "contexts"
import { getDate } from 'utils'
import styles from './profile.module.css'

const ProfileBio = () => {
    const { profileState: { bio } } = useProfile()
    const { setModal } = useModal()
    const { getUsername } = useAuth()

    const handleProfileEdit = async () => {
        setModal(m => ({ ...m, type: 'BIO', id: bio.username }))
    }

    return (
        <article className={`flx flx-column pd-md ${styles.profileDiv}`}>
            <div className='flx'>
                <p className='txt-lg txt-600 txt-secondary mg-right-xs txt-cap' >{bio?.firstName}</p>
                <p className='txt-lg txt-600 txt-secondary txt-cap'>{bio?.lastName}</p>
            </div>
            <p className='txt-md txt-off-secondary mg-btm-s'>{`@${bio?.username}`}</p>
            <p className='txt-md txt-off-secondary txt-cap'>{`joined ${getDate(bio?.createdAt)}`}</p>
            <div className="flx flx-min-center mg-top-s">
                <a href={`https://www.google.com/search?q=${bio?.city}`} target='_blank' className='txt-md txt-secondary flx flx-min-center mg-right-md'>
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
                {/* show edit only on logged in user bio */}
                {/* show follow unfollow on user other than logged in */}
                {
                    getUsername() === bio?.username &&
                    <button onClick={handleProfileEdit} className={`btn-outlined b-solid b-secondary txt-secondary txt-md txt-300 brd-md pd-xs`}>edit profile</button>
                }
            </div>
        </article>
    )
}

export default ProfileBio
import { useProfile } from "contexts"
import { getDate } from 'utils'
import styles from './profile.module.css'

const ProfileBio = () => {
    const { profileState: { bio: { value } } } = useProfile()

    return (
        <article className={`flx flx-column pd-md ${styles.profileDiv}`}>

            <div className='flx'>

                <p className='txt-lg txt-600 txt-secondary mg-right-xs txt-cap' >{value?.firstName}</p>

                <p className='txt-lg txt-600 txt-secondary txt-cap'>{value?.lastName}</p>

            </div>

            <p className='txt-md txt-off-secondary mg-btm-s'>{`@${value?.username}`}</p>

            <p className='txt-md txt-off-secondary txt-cap'>{`joined ${getDate(value?.createdAt)}`}</p>

            <div className='flx flx-maj-stretch flx-min-center mg-top-md'>

                <div className='flx flx-min-center'>

                    <p className='txt-md txt-secondary txt-cap mg-right-xs'>{`followers ${value?.followers?.length}`}</p>

                    <p className='txt-md txt-secondary txt-cap'>{`following ${value?.following?.length}`}</p>

                </div>

                <button className={`btn-outlined b-solid b-secondary txt-secondary txt-md txt-300 brd-md pd-xs`}>edit profile</button>

            </div>
        </article>
    )
}

export default ProfileBio
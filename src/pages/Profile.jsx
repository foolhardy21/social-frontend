import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import ClipLoader from 'react-spinners/ClipLoader'
import { FeedPageHOC } from "components/Reusable"
import { useProfile } from "contexts"
import { ProfileBio } from 'components/Profile'

const ProfileSection = () => {
    const params = useParams()
    const { profileState: { bio: { loading } }, getProfileBio, profileDispatch } = useProfile()

    useEffect(() => {
        (async () => {
            const { status, data: { user } } = await getProfileBio(params.username)
            if (status === 200) {
                profileDispatch({ type: 'SET_PROFILE_BIO', payload: user })
            }
        })()
    }, [])

    return (
        <div className='flx flx-column'>
            {
                loading
                    ? <div className='flx flx-center mg-top-xlg'><ClipLoader size={50} color='#ffffff' /></div>
                    : <ProfileBio />
            }
        </div>
    )
}

const Profile = FeedPageHOC(ProfileSection)

export default Profile
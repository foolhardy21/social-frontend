import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { FeedPageHOC } from "components/Reusable"
import { useProfile } from "contexts"

const ProfileSection = () => {
    const params = useParams()
    const { profileState: { bio: { value, loading } }, getProfileBio, profileDispatch } = useProfile()

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
                    ? <p>LOADING</p>
                    : <>
                        <p>{value.firstName}</p>
                        <p>{value.lastName}</p>
                        <p>{value.username}</p>
                    </>
            }
        </div>
    )
}

const Profile = FeedPageHOC(ProfileSection)

export default Profile
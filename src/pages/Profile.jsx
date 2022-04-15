import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import ClipLoader from 'react-spinners/ClipLoader'
import { FeedPageHOC, PostsHOC, Modal } from "components/Reusable"
import { useModal, useProfile } from "contexts"
import { ProfileBio } from 'components/Profile'
import { ExplorePost } from 'components/Explore'

const ProfileSection = () => {
    const params = useParams()
    const { profileState: { bio, posts }, getProfileBio, getProfilePosts, profileDispatch } = useProfile()
    const { modal } = useModal()

    const ProfilePosts = PostsHOC(ExplorePost, posts.value)

    useEffect(() => {
        (async () => {
            const { status, data: { user } } = await getProfileBio(params.username)
            if (status === 200) {
                profileDispatch({ type: 'SET_PROFILE_BIO', payload: user })
            }
        })()
    }, [])

    useEffect(() => {
        if (Object.keys(bio.value).length > 0) {
            (async () => {
                const { status, data: { posts } } = await getProfilePosts(params.username)
                if (status === 200) {
                    profileDispatch({ type: 'SET_PROFILE_POSTS', payload: posts })
                }
            })()
        }
    }, [bio.value])

    return (
        <div className='flx flx-column'>
            {
                bio.loading
                    ? <div className='flx flx-center mg-top-xlg'><ClipLoader size={50} color='#ffffff' /></div>
                    : <ProfileBio />
            }
            {
                posts.loading
                    ? <div className='flx flx-center mg-top-xlg'><ClipLoader size={50} color='#ffffff' /></div>
                    : <ProfilePosts />
            }
            {
                modal.type.length > 0 && <Modal />
            }
        </div>
    )
}

const Profile = FeedPageHOC(ProfileSection)

export default Profile
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from 'react-redux'
import { PostsWrapper, Post, FeedPageWrapper, ModalWrapper } from "components/Reusable"
import { PostEdit, ProfileBio, ProfileEdit } from 'components/Profile'
import { useModal, usePosts, useProfile } from "contexts"
import { initialiseProfilePosts, removePostsLoading, removeProfileLoading, setPostsLoading, setProfileBio, setProfileLoading } from 'slices'
import styles from 'components/Reusable/feedpage.module.css'

const PostModal = ModalWrapper(PostEdit)
const ProfileModal = ModalWrapper(ProfileEdit)

const ProfileSection = () => {
    const params = useParams()
    const { getUserPosts } = usePosts()
    const { getProfileBio } = useProfile()
    const { modal } = useModal()
    const dispatch = useDispatch()
    const profileState = useSelector(state => state.profile)
    const postsState = useSelector(state => state.posts)

    const ProfilePosts = PostsWrapper(Post, postsState.posts)

    useEffect(() => {
        (async () => {
            dispatch(setProfileLoading())
            const { status, data: { user } } = await getProfileBio(params.username)
            if (status === 200) {
                dispatch(setProfileBio(user))
            }
            dispatch(removeProfileLoading())
        })()
    }, [])

    useEffect(() => {
        (async () => {
            dispatch(setPostsLoading())
            const { status, data } = await getUserPosts(params.username)
            if (status === 200) {
                dispatch(initialiseProfilePosts(data.posts))
            }
            dispatch(removePostsLoading())
        })()
    }, [profileState.bio])

    return (
        <div className={`${styles.feedDiv} flx flx-column`}>
            {
                profileState.loading
                    ? <div className='flx flx-center mg-top-xlg'><ClipLoader size={50} color='#ffffff' /></div>
                    : <ProfileBio />
            }
            {
                postsState.loading
                    ? <div className='flx flx-center mg-top-xlg'><ClipLoader size={50} color='#ffffff' /></div>
                    : <ProfilePosts />
            }
            {
                modal.type === 'POST' ? <PostModal /> : modal.type === 'BIO' ? <ProfileModal /> : ''
            }
        </div>
    )
}

const Profile = FeedPageWrapper(ProfileSection)

export default Profile
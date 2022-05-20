import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editBio, resetModal, setModal } from "slices"
import { getUserToken } from 'utils'
import styles from './profile.module.css'

const ProfileEdit = () => {
    const [bio, setBio] = useState({})
    const dispatch = useDispatch()
    const profileState = useSelector(state => state.profile)

    useEffect(() => {
        const user = profileState.bio
        setBio(user)
    }, [])

    const handleBioEdit = () => {
        const token = getUserToken()
        dispatch(editBio({ user: bio, token }))
        setBio({})
        dispatch(resetModal())
    }

    const handleBioCancel = () => {
        setBio({})
        dispatch(resetModal())
    }

    return (
        <>
            <div className="flx flx-min-center">
                <input type='text' placeholder='first name' value={bio.firstName ?? ''} onChange={e => setBio(b => ({ ...b, firstName: e.target.value }))} className='input input-s txt-md pd-xs' />
                <input type='text' placeholder='last name' value={bio.lastName ?? ''} onChange={e => setBio(b => ({ ...b, lastName: e.target.value }))} className='input input-s txt-md pd-xs' />
            </div>
            <div className="flx flx-min-center">
                <input type='text' placeholder='portfolio url' value={bio.portfolio ?? ''} onChange={e => setBio(b => ({ ...b, portfolio: e.target.value }))} className='input input-s txt-md pd-xs' />
                <input type='text' placeholder='city' value={bio.city ?? ''} onChange={e => setBio(b => ({ ...b, city: e.target.value }))} className='input input-s txt-md pd-xs' />
            </div>
            <div className="flx flx-min-center">
                <img srcSet={bio?.profileImg} className={`${styles.profileImg} img-fit-cover brd-full`} />
                <label className={`flx flx-row ${styles.profileImgLabel} mg-top-xs mg-left-xs`}>
                    <span className="material-icons icon-primary">photo_camera</span>
                    <input type="file" onChange={(e) => setBio(b => ({ ...b, profileImg: URL.createObjectURL(e.target.files[0]) }))} accept="image/png, image/jpeg, image/jpg" />
                </label>
            </div>
            <div className="flx flx-min-end flx-maj-end">
                <button onClick={handleBioCancel} className="btn-txt txt-primary txt-md txt-lcase pd-xs">
                    cancel
                </button>
                <button onClick={handleBioEdit} className="btn-solid bg-secondary txt-secondary txt-md txt-lcase pd-xs brd-s">
                    edit
                </button>
            </div>
        </>
    )
}

export default ProfileEdit
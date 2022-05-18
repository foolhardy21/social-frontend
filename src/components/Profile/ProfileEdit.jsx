import { useAuth, useModal, useProfile } from "contexts"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editBio } from "slices"

const ProfileEdit = () => {
    const [bio, setBio] = useState({})
    const { modal: { id }, setModal } = useModal()
    const { } = useProfile()
    const { getUserToken } = useAuth()
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
        setModal(m => ({ ...m, type: '', id: '' }))
    }

    return (
        <>
            <div className="flx">
                <input type='text' placeholder='first name' value={bio.firstName ?? ''} onChange={e => setBio(b => ({ ...b, firstName: e.target.value }))} className='input input-s txt-md pd-xs' />
                <input type='text' placeholder='last name' value={bio.lastName ?? ''} onChange={e => setBio(b => ({ ...b, lastName: e.target.value }))} className='input input-s txt-md pd-xs' />
            </div>
            <input type='text' placeholder='portfolio url' value={bio.portfolio ?? ''} onChange={e => setBio(b => ({ ...b, portfolio: e.target.value }))} className='input input-s txt-md pd-xs' />
            <input type='text' placeholder='city' value={bio.city ?? ''} onChange={e => setBio(b => ({ ...b, city: e.target.value }))} className='input input-s txt-md pd-xs' />
            <div onClick={handleBioEdit} className="flx flx-maj-end">
                <button className="btn-solid bg-secondary txt-secondary txt-md txt-lcase pd-xs brd-s">
                    edit
                </button>
            </div>
        </>
    )
}

export default ProfileEdit
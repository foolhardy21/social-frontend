import { useModal, useProfile } from "contexts"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setProfileBio } from "slices"
import { ACTION_SET_BIO } from "utils"

const ProfileEdit = () => {
    const [bio, setBio] = useState({})
    const { modal: { id }, setModal } = useModal()
    const { getProfileBio, editBio } = useProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const { status, data: { user } } = await getProfileBio(id)
            if (status === 200) {
                setBio(user)
            }
        })()
    }, [])

    const handleBioEdit = async () => {
        const response = await editBio(bio)
        if (response.status === 201) {
            dispatch(setProfileBio(bio))
        }
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
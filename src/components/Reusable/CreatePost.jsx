import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from 'contexts'
import { createPost } from 'slices'
import postStyles from './post.module.css'
import styles from './createpost.module.css'

const CreatePost = () => {
    const [postValue, setPostValue] = useState('')
    const { getUserToken } = useAuth()
    const dispatch = useDispatch()

    const isButtonDisabled = () => postValue.length === 0

    const handlePostSubmit = () => {
        const token = getUserToken()
        dispatch(createPost({ postValue, token }))
        setPostValue('')
    }

    return (
        <article className={`${postStyles.postDiv} flx flx-column pd-s`}>
            <textarea rows='5' placeholder="what's happening?" value={postValue} onChange={(e) => setPostValue(e.target.value)} className={`${styles.textArea} bg-off-secondary txt-secondary pd-xs txt-md`} />
            <div className="flx flx-maj-end mg-top-xs">
                <button type='button' disabled={isButtonDisabled()} onClick={handlePostSubmit} className={`btn-solid ${styles.btnPost} bg-primary txt-primary txt-md txt-lcase pd-xs brd-s`}>post</button>
            </div>
        </article>
    )
}

export default CreatePost
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { usePosts } from 'contexts'
import { initialisePosts } from 'slices'
import postStyles from './post.module.css'
import styles from './createpost.module.css'

const CreatePost = () => {
    const [postValue, setPostValue] = useState('')
    const { createPost } = usePosts()
    const dispatch = useDispatch()

    const isButtonDisabled = () => postValue.length === 0

    const handlePostSubmit = async () => {
        const response = await createPost(postValue)
        if (response.status === 201) {
            dispatch(initialisePosts(response.data.posts))
        } else if (response.status === 404) {
            // not logged in
        }
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
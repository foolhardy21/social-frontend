import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useComments } from 'contexts'
import { initialiseComments } from 'slices'
import postStyles from './post.module.css'
import styles from './createpost.module.css'

const CreateComment = () => {
    const [commentValue, setCommentValue] = useState('')
    const { postId } = useParams()
    const { addCommentToPost } = useComments()
    const dispatch = useDispatch()

    const isButtonDisabled = () => commentValue.length === 0

    const handleCommentSubmit = async () => {
        const response = await addCommentToPost(postId, commentValue)
        if (response.status === 201) {
            dispatch(initialiseComments(response.data.comments))
            setCommentValue('')
        }
    }

    return (
        <article className={`${postStyles.postDiv} flx flx-column pd-s`}>
            <textarea rows='5' placeholder="what do you think?" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} className={`${styles.textArea} bg-off-secondary txt-secondary pd-xs txt-md`} />
            <div className="flx flx-maj-end mg-top-xs">
                <button type='button' disabled={isButtonDisabled()} onClick={handleCommentSubmit} className={`btn-solid ${styles.btnPost} bg-primary txt-primary txt-md txt-lcase pd-xs brd-s`}>comment</button>
            </div>
        </article>
    )
}

export default CreateComment
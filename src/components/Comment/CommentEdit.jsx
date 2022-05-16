import { useComments, useModal } from 'contexts'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../Profile/profile.module.css'

const CommentEdit = () => {
    const [comment, setComment] = useState({})
    const params = useParams()
    const { modal: { id }, setModal } = useModal()
    const { commentsState: { comments }, editComment, commentsDispatch } = useComments()

    const handleCommentEdit = async () => {
        const response = await editComment(params.postId, id, comment)
        if (response.status === 201) {
            commentsDispatch({ type: 'INIT_COMMENTS', payload: response.data.comments })
        }
        setComment({})
        setModal(m => ({ ...m, type: '', id: '' }))
    }

    useEffect(() => {
        setComment(comments.find(comment => comment._id === id))
    }, [])

    return (
        <>
            <textarea rows='5' className={`${styles.postModalTextArea}`} value={comment?.text} onChange={e => setComment(c => ({ ...c, text: e.target.value }))} />
            <div className="flx flx-maj-end">
                <button onClick={handleCommentEdit} className="btn-solid bg-secondary txt-secondary pd-xs brd-s txt-md txt-lcase">
                    edit
                </button>
            </div>
        </>
    )
}

export default CommentEdit
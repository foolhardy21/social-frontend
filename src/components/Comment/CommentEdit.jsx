import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editComment, setModal } from 'slices'
import { getUserToken } from 'utils'
import styles from '../Profile/profile.module.css'

const CommentEdit = () => {
    const [comment, setComment] = useState({})
    const params = useParams()
    const { id } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const { comments } = useSelector(state => state.comments)

    const handleCommentEdit = () => {
        const token = getUserToken()
        dispatch(editComment({ postId: params.postId, commentId: id, commentData: comment, token }))
        setComment({})
        dispatch(setModal({ type: '', id: '' }))
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
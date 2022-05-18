import { useAuth, useModal } from 'contexts'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { editComment } from 'slices'
import styles from '../Profile/profile.module.css'

const CommentEdit = () => {
    const [comment, setComment] = useState({})
    const params = useParams()
    const { modal: { id }, setModal } = useModal()
    const { getUserToken } = useAuth()
    const dispatch = useDispatch()
    const { comments } = useSelector(state => state.comments)

    const handleCommentEdit = () => {
        const token = getUserToken()
        dispatch(editComment({ postId: params.postId, commentId: id, commentData: comment, token }))
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
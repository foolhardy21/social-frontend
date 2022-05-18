import { useAuth, useModal } from 'contexts'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deleteComment, downvoteComment, upvoteComment } from 'slices'
import { getDate, getTime } from 'utils'
import styles from '../Reusable/post.module.css'

const Comment = ({ comment: { _id, username, text, votes: { upvotedBy, downvotedBy }, createdAt, updatedAt } }) => {
    const params = useParams()
    const { getUsername, getUserToken } = useAuth()
    const { setModal } = useModal()
    const dispatch = useDispatch()

    const handleCommentEdit = () => {
        setModal(m => ({ ...m, type: 'COMMENT', id: _id }))
    }
    const handleCommentDelete = () => {
        const token = getUserToken()
        dispatch(deleteComment({ postId: params.postId, commentId: _id, token }))
    }
    const handleCommentUpVote = () => {
        const token = getUserToken()
        dispatch(upvoteComment({ postId: params.postId, commentId: _id, token }))
    }
    const handleCommentDownVote = () => {
        const token = getUserToken()
        dispatch(downvoteComment({ postId: params.postId, commentId: _id, token }))
    }

    return (
        <article className={`${styles.postDiv} pd-s`}>
            <div className='flx flx-maj-stretch'>
                <Link to={`/${username}`} className='btn-txt txt-secondary txt-md txt-500'>
                    {'@ '}{username}
                </Link>
                {
                    getUsername() === username &&
                    <div className='flx'>
                        <button onClick={handleCommentEdit} className='btn-txt mg-right-xs'>
                            <span className='material-icons icon-secondary'>
                                edit
                            </span>
                        </button>
                        <button onClick={handleCommentDelete} className='btn-txt'>
                            <span className='material-icons icon-secondary'>
                                delete
                            </span>
                        </button>
                    </div>
                }
            </div>
            <p className='txt-secondary txt-md txt-300 mg-left-xs mg-top-s mg-btm-s'>{text}</p>
            <p className='txt-off-secondary txt-md txt-300'>{getDate(createdAt)}</p>
            <p className='txt-off-secondary txt-md txt-300'>{getTime(createdAt)}</p>
            <div className='flx flx-maj-stretch mg-top-s'>
                <p className='txt-secondary txt-md txt-300'>{`upvotes ${upvotedBy.length}`}</p>
                <p className='txt-secondary txt-md txt-300'>{`downvotes ${downvotedBy.length}`}</p>
                <div className='flx'>
                    <button onClick={handleCommentUpVote} className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>
                        <span className='material-icons icon-secondary'>arrow_upward</span>
                    </button>
                    <button onClick={handleCommentDownVote} className='btn-txt txt-md txt-secondary txt-300'>
                        <span className='material-icons icon-secondary'>arrow_downward</span>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Comment
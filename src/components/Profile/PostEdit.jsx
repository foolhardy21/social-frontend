import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { editPost, resetModal } from "slices"
import { getUserToken } from 'utils'
import styles from './profile.module.css'

const PostEdit = () => {
    const [post, setPost] = useState({})
    const dispatch = useDispatch()

    const handlePostEdit = () => {
        const token = getUserToken()
        dispatch(editPost({ _id: id, post, token }))
        setPost({})
        dispatch(resetModal())
    }

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/posts/${id}`)
            if (response.status === 200) {
                setPost(response.data.post)
            }
        })()
    }, [])

    return (
        <>
            <textarea rows='5' className={`${styles.postModalTextArea}`} value={post?.content} onChange={e => setPost(p => ({ ...p, content: e.target.value }))} />
            <div className="flx flx-maj-end">
                <button onClick={handlePostEdit} className="btn-solid bg-secondary txt-secondary pd-xs brd-s txt-md txt-lcase">
                    edit
                </button>
            </div>
        </>
    )
}

export default PostEdit
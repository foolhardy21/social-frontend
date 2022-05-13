import axios from "axios"
import { useModal, usePosts } from "contexts"
import { useEffect, useState } from "react"
import { ACTION_EDIT_POST } from "utils"
import styles from './profile.module.css'

const PostEdit = () => {
    const [post, setPost] = useState({})
    const { modal: { id }, setModal } = useModal()
    const { editPost, postsDispatch } = usePosts()

    const handlePostEdit = async () => {
        const response = await editPost(id, post)
        if (response.status === 201) {
            const editedPost = response.data.posts.find(newpost => newpost._id === post._id)
            postsDispatch({ type: ACTION_EDIT_POST, payload: editedPost })
        }
        setPost({})
        setModal(m => ({ ...m, type: '', id: '' }))
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
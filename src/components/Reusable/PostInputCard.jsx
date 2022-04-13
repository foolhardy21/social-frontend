import { useState } from 'react'
import styles from 'components/Explore/explore.module.css'
import styles2 from './reusable.module.css'
import styles3 from 'components/Home/home.module.css'
import { usePosts } from 'contexts'

const PostInputCard = () => {
    const [postValue, setPostValue] = useState('')
    const { createPost, postsDispatch } = usePosts()

    const isButtonDisabled = () => postValue.length === 0

    const handlePostSubmit = async () => {
        const response = await createPost(postValue)
        if (response.status === 201) {
            const createdPost = response.data.posts[response.data.posts.length - 1]
            postsDispatch({ type: 'ADD_POST', payload: createdPost })
        } else if (response.status === 404) {
            // not logged in
        }
        setPostValue('')
    }

    return (
        <article className={`${styles.postDiv} flx flx-column pd-s`}>

            <textarea placeholder="what's happening?" value={postValue} onChange={(e) => setPostValue(e.target.value)} className={`${styles2.textArea} bg-off-secondary txt-secondary pd-xs txt-md`} />

            <div className="flx flx-maj-end mg-top-xs">
                <button type='button' disabled={isButtonDisabled()} onClick={handlePostSubmit} className={`btn-solid ${styles3.btnSignup} bg-primary txt-primary txt-md txt-lcase pd-xs brd-s`}>post</button>
            </div>

        </article>
    )
}

export default PostInputCard
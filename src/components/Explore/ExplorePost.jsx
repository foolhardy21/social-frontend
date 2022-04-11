import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './explore.module.css'

const ExplorePost = () => {
    const [posts, setPosts] = useState()

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/posts')
            setPosts(response.data.posts)
        })()
    }, [])

    return (
        <>
            {
                posts?.map(({ _id, username, content, likes: { likeCount } }) =>

                    <article key={_id} className={`${styles.postDiv} pd-s`}>

                        <p className='txt-secondary txt-md txt-500 mg-btm-xs'>{'@ '}{username}</p>

                        <p className='txt-secondary txt-md txt-300'>{content}</p>

                        <p className='txt-secondary txt-md txt-300 mg-top-s'>{`likes ${likeCount}`}</p>

                    </article>)
            }
        </>
    )
}

export default ExplorePost
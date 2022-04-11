import { useState, useEffect } from 'react'
import { NavBar } from '../components/Reusable'
import styles from '../components/Explore/explore.module.css'
import axios from 'axios'

const Explore = () => {
    const [posts, setPosts] = useState()

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/posts')
            setPosts(response.data.posts)
        })()
    }, [])

    return (
        <div
            className={`bg-off-secondary ${styles.exploreGrid}`}>

            <div className={`${styles.navDiv} flx flx-maj-end`}>
                <NavBar />
            </div>

            <div className={`${styles.feedDiv} flx flx-column pd-md`}>
                {
                    posts?.map(post => <article key={post._id} className={`${styles.postDiv} pd-s`}>
                        <p className='txt-secondary txt-md mg-btm-xs'>{post.username}</p>
                        <p className='txt-secondary card-txtw-md'>{post.content}</p>
                    </article>)
                }
            </div>

            <div className={`${styles.extraDiv}`}>
                {/* third div empty probably for searchbar and trending */}
            </div>

        </div>
    )
}

export default Explore
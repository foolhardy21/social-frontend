import { FeedPageWrapper, Post } from "components/Reusable"
import { usePosts } from "contexts"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from 'components/Reusable/feedpage.module.css'
import { CreateComment } from "components/Reusable"

const PostAndCommentsFeed = () => {
    const [currentPost, setCurrentPost] = useState({})
    const params = useParams()
    const { postsState: { posts } } = usePosts()

    useEffect(() => {
        const post = posts.find(post => post._id === params.postId)
        setCurrentPost(post)
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column`}>
            {
                Object.keys(currentPost).length > 0 && <Post post={currentPost} />
            }
            <CreateComment />
            {
                // post comments
            }
        </div>
    )
}

const PostPage = FeedPageWrapper(PostAndCommentsFeed)

export default PostPage
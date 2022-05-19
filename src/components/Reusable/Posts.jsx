import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPosts, initialisePosts } from "slices"

const PostsWrapper = (PostComponent, posts) => {

    const Posts = () => {
        const [isPostsSorted, setIsPostSorted] = useState(false)
        const [currentPosts, setCurrentPosts] = useState(posts)
        const dispatch = useDispatch()

        const handlePostsSort = () => {
            let sortedPosts = [...currentPosts]
            if (isPostsSorted) {
                sortedPosts = sortedPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                setIsPostSorted(false)
            } else {
                sortedPosts = sortedPosts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
                setIsPostSorted(true)
            }
            setCurrentPosts(sortedPosts)
        }
        return (
            <div className="flx flx-column">
                <div className="flx flx-maj-end mg-top-xs">
                    <button onClick={handlePostsSort} className='btn-txt txt-secondary txt-md'>latest</button>
                </div>
                {
                    currentPosts?.map(post => <PostComponent key={post._id} post={post} />)
                }
            </div>
        )
    }

    return Posts
}

export default PostsWrapper
import { usePosts } from '../../contexts'

const PostsHOC = PostComponent => {

    const PostsSection = () => {
        const { postsState: { posts } } = usePosts()

        return (
            <>
                {
                    posts?.map(post => <PostComponent key={post._id} post={post} />)
                }
            </>
        )
    }

    return PostsSection
}

export default PostsHOC
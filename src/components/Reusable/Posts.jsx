import { usePosts } from 'contexts'

const PostsWrapper = PostComponent => {

    const Posts = () => {
        const { postsState: { posts } } = usePosts()

        return (
            <>
                {
                    posts?.map(post => <PostComponent key={post._id} post={post} />)
                }
            </>
        )
    }

    return Posts
}

export default PostsWrapper
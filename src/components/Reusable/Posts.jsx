const PostsWrapper = (PostComponent, posts) => {

    const Posts = () => {

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
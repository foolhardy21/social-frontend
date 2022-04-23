const PostsWrapper = (PostComponent, posts) => {

    const Posts = () => {

        return (
            <div className="flx flx-column">
                {
                    posts?.map(post => <PostComponent key={post._id} post={post} />)
                }
            </div>
        )
    }

    return Posts
}

export default PostsWrapper
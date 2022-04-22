import styles from './posts.module.css'

const PostsWrapper = (PostComponent, posts, heading) => {

    const Posts = () => {

        return (
            <div className="flx flx-column">

                <p className={`txt-lg txt-600 txt-secondary txt-ucase pd-btm-xs ${styles.pgHeading}`}>
                    {heading}
                </p>

                {
                    posts?.map(post => <PostComponent key={post._id} post={post} />)
                }

            </div>
        )
    }

    return Posts
}

export default PostsWrapper
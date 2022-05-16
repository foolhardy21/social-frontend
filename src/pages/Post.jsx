import { FeedPageWrapper, ModalWrapper, Post } from "components/Reusable"
import { useComments, useModal, usePosts } from "contexts"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from 'components/Reusable/feedpage.module.css'
import { CreateComment } from "components/Reusable"
import { CommentEdit, Comment, CommentsWrapper } from "components/Comment"

const CommentModal = ModalWrapper(CommentEdit)

const PostAndCommentsFeed = () => {
    const [currentPost, setCurrentPost] = useState({})
    const params = useParams()
    const { postsState: { posts } } = usePosts()
    const { commentsState: { comments }, getPostComments, commentsDispatch } = useComments()
    const { modal } = useModal()

    const CommentsSection = CommentsWrapper(Comment, comments)

    useEffect(() => {
        const post = posts.find(post => post._id === params.postId)
        setCurrentPost(post)
    }, [])

    useEffect(() => {
        (async () => {
            if (Object.keys(currentPost).length > 0) {
                const response = await getPostComments(currentPost._id)
                if (response.status === 200) {
                    commentsDispatch({ type: 'INIT_COMMENTS', payload: response.data.comments })
                }
            }
        })()
    }, [currentPost])

    return (
        <div className={`${styles.feedDiv} flx flx-column`}>
            {
                Object.keys(currentPost).length > 0 && <Post post={currentPost} />
            }
            <CreateComment />
            <CommentsSection />
            {
                modal.type === 'COMMENT' ? <CommentModal /> : ''
            }
        </div>
    )
}

const PostPage = FeedPageWrapper(PostAndCommentsFeed)

export default PostPage
import { FeedPageWrapper, ModalWrapper, Post } from "components/Reusable"
import { useComments, useModal, usePosts } from "contexts"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from 'components/Reusable/feedpage.module.css'
import { CreateComment } from "components/Reusable"
import { CommentEdit, Comment, CommentsWrapper } from "components/Comment"
import { useDispatch, useSelector } from "react-redux"
import { initialiseComments } from "slices"

const CommentModal = ModalWrapper(CommentEdit)

const PostAndCommentsFeed = () => {
    const [currentPost, setCurrentPost] = useState({})
    const params = useParams()
    const { posts } = useSelector(state => state.posts)
    const { comments } = useSelector(state => state.comments)
    const { getPostComments } = useComments()
    const { modal } = useModal()
    const dispatch = useDispatch()

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
                    dispatch(initialiseComments(response.data.comments))
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
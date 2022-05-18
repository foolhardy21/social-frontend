import { useEffect } from "react"
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from "react-redux"
import { FeedPageWrapper, PageHeading, Post, PostsWrapper } from "components/Reusable"
import { getBookmarks } from "slices"
import { getUserToken } from 'utils'
import styles from 'components/Reusable/feedpage.module.css'

const BookmarksSection = () => {
    const { bookmarks, loading } = useSelector(state => state.bookmarks)
    const dispatch = useDispatch()

    const BookmarkPosts = PostsWrapper(Post, bookmarks)

    useEffect(() => {
        (async () => {
            const token = getUserToken()
            dispatch(getBookmarks(token))
        })()
    }, [])

    return (
        <div className={`${styles.feedDiv} flx flx-column pd-md`}>
            {
                loading
                    ? <div className='flx flx-center mg-top-xlg'>
                        <ClipLoader size={50} color='#ffffff' />
                    </div>
                    : <>
                        <PageHeading heading='bookmarks' />
                        <BookmarkPosts />
                    </>
            }
        </div>
    )

}

const BookmarksFeedPage = FeedPageWrapper(BookmarksSection)

export default BookmarksFeedPage

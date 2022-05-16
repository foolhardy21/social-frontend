import { useEffect } from "react"
import ClipLoader from 'react-spinners/ClipLoader'
import { useDispatch, useSelector } from "react-redux"
import { FeedPageWrapper, PageHeading, Post, PostsWrapper } from "components/Reusable"
import { useBookmarks } from "contexts"
import { initialiseBookmarks, removeBookmarksLoading, setBookmarksLoading } from "slices"
import styles from 'components/Reusable/feedpage.module.css'

const BookmarksSection = () => {
    const { getBookmarks } = useBookmarks()
    const { bookmarks, loading } = useSelector(state => state.bookmarksState)
    const dispatch = useDispatch()

    const BookmarkPosts = PostsWrapper(Post, bookmarks)

    useEffect(() => {
        (async () => {
            dispatch(setBookmarksLoading())
            const response = await getBookmarks()
            if (response.status === 200) {
                dispatch(initialiseBookmarks(response.data.bookmarks))
            } else if (response.status === 404) {
                // not logged in
            }
            dispatch(removeBookmarksLoading())
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

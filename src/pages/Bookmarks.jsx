import { useEffect } from "react"
import ClipLoader from 'react-spinners/ClipLoader'
import { FeedPageWrapper, PageHeading, Post, PostsWrapper } from "components/Reusable"
import { useBookmarks } from "contexts"
import { ACTION_INIT_BOOKMARKS } from "utils"
import styles from 'components/Reusable/feedpage.module.css'

const BookmarksSection = () => {
    const { getBookmarks, bookmarksDispatch, bookmarksState: { bookmarks, loading } } = useBookmarks()

    const BookmarkPosts = PostsWrapper(Post, bookmarks)

    useEffect(() => {
        (async () => {
            const response = await getBookmarks()
            if (response.status === 200) {
                bookmarksDispatch({ type: ACTION_INIT_BOOKMARKS, payload: response.data.bookmarks })
            } else if (response.status === 404) {
                // not logged in
            }
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

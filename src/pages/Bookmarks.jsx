import { useEffect } from "react"
import ClipLoader from 'react-spinners/ClipLoader'
import { ExplorePost } from "components/Explore"
import { FeedPageHOC, PostsHOC } from "components/Reusable"
import { useBookmarks } from "contexts"
import styles from 'components/Explore/explore.module.css'

const BookmarksSection = () => {
    const { getBookmarks, bookmarksDispatch, bookmarksState: { bookmarks, loading } } = useBookmarks()

    const BookmarkPosts = PostsHOC(ExplorePost, bookmarks)

    useEffect(() => {
        (async () => {
            const response = await getBookmarks()
            if (response.status === 200) {
                bookmarksDispatch({ type: 'INIT_BOOKMARKS', payload: response.data.bookmarks })
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
                    : <BookmarkPosts />
            }
        </div>
    )

}

const Bookmarks = FeedPageHOC(BookmarksSection)

export default Bookmarks
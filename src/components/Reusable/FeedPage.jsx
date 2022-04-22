import { NavBar } from '.'
import styles from './feedpage.module.css'

const FeedPageWrapper = PostsSection => {

    const FeedPage = () => {

        return (
            <div
                className={`bg-off-secondary ${styles.feedPageGrid}`}>

                <div className={`${styles.navDiv} flx flx-maj-end`}>
                    <NavBar />
                </div>

                <PostsSection />

                <div className={styles.extraDiv}>
                    {/* third div empty for now. for searchbar and trending */}
                </div>

            </div>
        )
    }
    return FeedPage
}

export default FeedPageWrapper 
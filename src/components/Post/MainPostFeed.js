import { PostCard, ReplyCard, CommentCard } from './'

const MainPostFeed = () => {

    return (

        <main class="grid grid-feed mg-btm-s pd-left-xxlg pd-right-xxlg">

            <PostCard />

            <ReplyCard />

            <CommentCard />

        </main>
    )
}

export default MainPostFeed
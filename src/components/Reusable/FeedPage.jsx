import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavBar } from '.'
import styles from './feedpage.module.css'

const FeedPageWrapper = PostsSection => {

    const FeedPage = () => {
        const [mostLikedPosts, setMostLikedPosts] = useState([])
        const [mostCommentedPosts, setMostCommentedPosts] = useState([])
        const navigate = useNavigate()
        const { posts } = useSelector(state => state.posts)

        useEffect(() => {
            (async () => {
                const { data: { users } } = await axios.get('/api/users')
                const newPosts = [...posts]
                const likedPosts = newPosts.sort((a, b) => b.likes.likeCount - a.likes.likeCount).slice(0, 5).map(post => {
                    const { profileImg } = users.find(user => user.username === post.username)
                    return { ...post, postUser: profileImg }
                })
                setMostLikedPosts(likedPosts)
                const commentedPosts = newPosts.sort((a, b) => b.comments.length - a.comments.length).slice(0, 5).map(post => {
                    const { profileImg } = users.find(user => user.username === post.username)
                    return { ...post, postUser: profileImg }
                })
                setMostCommentedPosts(commentedPosts)
            })()
        }, [posts])

        return (
            <div
                className={`bg-off-secondary ${styles.feedPageGrid}`}>
                <div className={`${styles.navDiv} flx flx-maj-end`}>
                    <NavBar />
                </div>
                <PostsSection />
                <div className={`${styles.trendingDiv} flx flx-maj-start`}>
                    <div>
                        <div className='mg-left-xs'>
                            <p className='txt-lg txt-secondary txt-lcase mg-left-xs mg-top-s mg-btm-xs'>most liked posts</p>
                            <ul>
                                {
                                    mostLikedPosts?.map(post => <li onClick={() => navigate(`/${post.username}/post/${post._id}`)} key={post._id} className='flx flx-min-center mg-btm-s'>
                                        <img srcSet={post.postUser} alt={post.username} className={`${styles.profileImgSmall} brd-full img-fit-cover mg-right-xs`} />
                                        <div>
                                            <p className='txt-md txt-off-secondary'>{post.username}</p>
                                            <p className='txt-md txt-off-secondary'>{post.content.slice(0, 20)}....</p>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                        <div className='mg-left-xs'>
                            <p className='txt-lg txt-secondary txt-lcase mg-left-xs mg-top-s mg-btm-xs'>most commented on posts</p>
                            <ul>
                                {
                                    mostCommentedPosts?.map(post => <li key={post._id} onClick={() => navigate(`/${post.username}/post/${post._id}`)} className='flx flx-min-center mg-btm-s'>
                                        <img srcSet={post?.postUser} alt='dp' className={`${styles.profileImgSmall} brd-full img-fit-cover mg-right-xs`} />
                                        <div>
                                            <p className='txt-md txt-off-secondary'>{post.username}</p>
                                            <p className='txt-md txt-off-secondary'>{post.content.slice(0, 20)}....</p>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return FeedPage
}

export default FeedPageWrapper 
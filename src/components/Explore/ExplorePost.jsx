import { getDate, getTime } from '../../utils'
import styles from './explore.module.css'

const ExplorePost = ({ post: { username, content, likes: { likeCount }, createdAt } }) => {

    return (

        <article className={`${styles.postDiv} pd-s`}>

            <p className='txt-secondary txt-md txt-500'>{'@ '}{username}</p>

            <p className='txt-secondary txt-md txt-300 mg-left-xs mg-top-s mg-btm-s'>{content}</p>

            <p className='txt-off-secondary txt-md txt-300'>{getDate(createdAt)}</p>

            <p className='txt-off-secondary txt-md txt-300'>{getTime(createdAt)}</p>

            <div className='flx flx-maj-stretch mg-top-s'>

                <p className='txt-secondary txt-md txt-300'>{`likes ${likeCount}`}</p>

                <div className='flx'>

                    <button className='btn-txt txt-md txt-secondary txt-300 mg-right-xs'>bookmark</button>

                    <button className='btn-txt txt-md txt-secondary txt-300'>like</button>

                </div>

            </div>

        </article>
    )

}

export default ExplorePost
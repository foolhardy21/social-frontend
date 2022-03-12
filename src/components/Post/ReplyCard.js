import { profM, profS } from "../../data/profileImg.data"

const ReplyCard = () => {

    return (
        <article class="card-post card-shadow-xs flx flx-column pd-xs">

            <div class="flx flx-maj-start flx-min-center mg-btm-xs">

                <img srcSet={`${profM} 100w,
${profS} 60w`} alt='dp' sizes="(max-width: 768px) 60px, 100px" class="brd-full img-fit-cover" />

                <textarea class="input txt-md mg-left-xs pd-xs" placeholder="reply to @vinay.foolhardy..."></textarea>

            </div>

            <div class="flx flx-maj-end flx-min-center pd-xs">
                <button class="btn-solid txt-secondary bg-secondary txt-md pd-xs">reply</button>
            </div>

        </article>
    )
}

export default ReplyCard
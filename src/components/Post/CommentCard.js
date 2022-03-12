import { profM, profS } from "../../data/profileImg.data"

const CommentCard = () => {

    return (
        <article class="card-post card-shadow-xs flx flx-column pd-xs">

            <div class="flx flx-min-center mg-btm-s">

                <img srcSet={`${profM} 100w,
${profS} 60w`} alt='dp' sizes="(max-width: 768px) 60px, 100px" class="brd-full img-fit-cover" />

                <div class="flx flx-column">

                    <p class="txt-md txt-primary txt-cap mg-left-xs">binay bumar</p>

                    <p class="txt-md txt-off-secondary mg-left-xs">replied to @vinay.foolhardy</p>

                </div>

            </div>

            <p class="pd-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
                asperiores magnam voluptates fugiat iure at, ratione, esse laboriosam ptatum maxime neque quam quaerat?
            </p>

            <p class="txt-off-primary txt-md txt-cap mg-top-xs mg-left-xs">1:45am 13 Dec 2020</p>

            <div class="flx flx-maj-end mg-top-xs mg-right-xs">

                <div class="flx">

                    <p class="txt-md txt-primary mg-right-xs">2</p>

                    <button class="btn-txt txt-md txt-lcase">
                        like
                    </button>

                </div>

            </div>

        </article>
    )
}

export default CommentCard
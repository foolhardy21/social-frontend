import { profM, profS } from "../../data/profileImg.data"

const PostCard = () => {

    return (
        <article class="card-post card-shadow-xs flx flx-column pd-xs">

            <div class="flx flx-maj-stretch flx-min-center mg-btm-s">

                <div class="flx flx-min-center">

                    <img srcSet={`${profM} 100w,
${profS} 60w`} alt='dp' sizes="(max-width: 768px) 60px, 100px"
                        class="brd-full b-solid b-off-primary img-fit-cover" />

                    <div class="flx flx-column">

                        <p class="txt-md txt-primary txt-cap mg-left-xs">vinay kumar</p>

                        <p class="txt-md txt-off-primary mg-left-xs">@vinay.foolhardy</p>

                    </div>

                </div>

                <span class="material-icons icon-primary">
                    bookmark
                </span>

            </div>

            <p class="pd-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
                asperiores magnam voluptates fugiat iure at, ratione, esse laboriosam dolores alias explicabo! Nam
                cumque tempore possimus dicta autem delectus rem nemo, aperiam id modi omnis eveniet laborum enim
                aspernatur unde repellendus distinctio eum aliquid voluptatibus. Voluptatum maxime neque quam quaerat?
            </p>

            <p class="txt-off-primary txt-md txt-cap mg-top-xs mg-left-xs">11:45pm 12 Dec 2020</p>

            <div class="flx flx-maj-end mg-top-xs mg-right-xs">

                <div class="flx">

                    <p class="txt-md txt-primary mg-right-xs">12</p>

                    <button class="btn-txt txt-md txt-lcase">
                        like
                    </button>

                </div>

            </div>

        </article>
    )
}

export default PostCard
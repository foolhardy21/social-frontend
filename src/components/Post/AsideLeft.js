import { profXS } from '../../data/profileImg.data'

const AsideLeft = () => {

    return (

        <aside class="left pos-sticky">
            <p class="txt-md txt-primary txt-cap mg-left-s mg-btm-s">bookmarks</p>

            <ul class="mg-left-md mg-btm-s">
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
            </ul>

            <p class="txt-md txt-primary txt-cap mg-left-s mg-btm-s">drafts</p>

            <ul class="mg-left-md mg-btm-s">
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <p class="txt-md txt-primary">Lorem ipsum dolor.....</p>
                </li>
            </ul>
        </aside>
    )
}

export default AsideLeft
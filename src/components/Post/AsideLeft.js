import { profXS } from '../../data/profileImg.data'
import { Aside, Text } from '../Reusable'

const AsideLeft = () => {

    return (
        <Aside classes="left mg-left-s pos-sticky">

            <Text classes="txt-md txt-primary txt-cap mg-btm-s">bookmarks</Text>

            <ul className="mg-left-md mg-btm-s">

                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>

                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>

                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>

                <li id="aside-item" class="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>

            </ul>

            <Text classes="txt-md txt-primary txt-cap mg-btm-s">drafts</Text>

            <ul className="mg-left-md mg-btm-s">

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' class="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">Lorem ipsum dolor.....</Text>
                </li>
            </ul>
        </Aside>

    )
}

export default AsideLeft

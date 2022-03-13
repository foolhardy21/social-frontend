import { profXS } from "../../data/profileImg.data"
import { Aside, Text } from "../Reusable"

const AsideRight = () => {

    return (
        <Aside classes="right mg-right-s pos-sticky">

            <Text classes="txt-md txt-primary txt-cap mg-btm-s">followers</Text>

            <ul className="mg-left-s mg-btm-s">

                <li id="aside-item" className="flx flx-min-center mg-btm-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center mg-btm-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center mg-btm-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center mg-btm-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>
            </ul>

            <Text classes="txt-md txt-primary txt-cap">following</Text>

            <ul className="mg-left-s mg-btm-s">

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

                <li id="aside-item" className="flx flx-min-center pd-xs">
                    <img src={profXS} alt='dp' className="brd-full mg-right-xs" />
                    <Text classes="txt-md txt-primary">binay</Text>
                </li>

            </ul>

        </Aside>

    )
}

export default AsideRight
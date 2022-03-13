import { profM, profS } from "../../data/profileImg.data"
import { Button, Card, Icon, Image, Text } from '../Reusable'

const PostCard = () => {

    return (
        <Card classes="flx flx-column pd-xs">

            <div className="flx flx-maj-stretch flx-min-center mg-btm-s">

                <div className="flx flx-min-center">

                    <Image srcSet={`${profM} 100w,
${profS} 60w`} alt='profile picture' sizes="(max-width: 768px) 60px, 100px"
                        classes="brd-full b-solid b-off-primary" />

                    <div className="flx flx-column">

                        <Text classes="txt-md txt-primary txt-cap mg-left-xs">vinay kumar</Text>

                        <Text classes="txt-md txt-off-primary mg-left-xs">@vinay.foolhardy</Text>

                    </div>

                </div>

                <Icon classes="icon-primary">
                    bookmark_outlined
                </Icon>

            </div>

            <Text classes="pd-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
                asperiores magnam voluptates fugiat iure at, ratione, esse laboriosam dolores alias explicabo! Nam
                cumque tempore possimus dicta autem delectus rem nemo, aperiam id modi omnis eveniet laborum enim
                aspernatur unde repellendus distinctio eum aliquid voluptatibus. Voluptatum maxime neque quam quaerat?
            </Text>

            <Text classes="txt-off-primary txt-md txt-cap mg-top-xs mg-left-xs">11:45pm 12 Dec 2020</Text>

            <div className="flx flx-maj-end mg-top-xs mg-right-xs">

                <div className="flx">

                    <Text classes="txt-md txt-primary mg-right-xs">12</Text>

                    <Button classes="btn-txt txt-md txt-lcase">
                        like
                    </Button>

                </div>

            </div>

        </Card>
    )
}

export default PostCard
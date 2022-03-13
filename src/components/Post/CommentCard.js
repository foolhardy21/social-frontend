import { profM, profS } from "../../data/profileImg.data"
import { Button, Card, Image, Text } from '../Reusable'

const CommentCard = () => {

    return (
        <Card classes="flx flx-column pd-xs">

            <div className="flx flx-min-center mg-btm-s">

                <Image srcSet={`${profM} 100w,
${profS} 60w`} alt='profile picture' sizes="(max-width: 768px) 60px, 100px" classes="brd-full" />

                <div className="flx flx-column">

                    <Text classes="txt-md txt-primary txt-cap mg-left-xs">binay bumar</Text>

                    <Text classes="txt-md txt-off-secondary mg-left-xs">replied to @vinay.foolhardy</Text>

                </div>

            </div>

            <Text classes="pd-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
                asperiores magnam voluptates fugiat iure at, ratione, esse laboriosam ptatum maxime neque quam quaerat?
            </Text>

            <Text classes="txt-off-primary txt-md txt-cap mg-top-xs mg-left-xs">1:45am 13 Dec 2020</Text>

            <div className="flx flx-maj-end mg-top-xs mg-right-xs">

                <div className="flx">

                    <Text classes="txt-md txt-primary mg-right-xs">2</Text>

                    <Button classes="btn-txt txt-md txt-lcase">
                        like
                    </Button>

                </div>

            </div>

        </Card>
    )
}

export default CommentCard
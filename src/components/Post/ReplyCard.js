import { profM, profS } from "../../data/profileImg.data"
import { Button, Card, Image, TextArea } from '../Reusable'

const ReplyCard = () => {

    return (

        <Card classes="flx flx-column pd-xs">

            <div className="flx flx-maj-start flx-min-center mg-btm-xs">

                <Image srcSet={`${profM} 100w,
${profS} 60w`} alt='profile picture' sizes="(max-width: 768px) 60px, 100px" classes="brd-full" />

                <TextArea classes="txt-md mg-left-xs pd-xs" placeholder="reply to @vinay.foolhardy..."></TextArea>

            </div>

            <div className="flx flx-maj-end flx-min-center pd-xs">

                <Button classes="btn-solid txt-secondary bg-secondary txt-md pd-xs">reply</Button>

            </div>

        </Card>
    )
}

export default ReplyCard
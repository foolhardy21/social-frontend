import { Button, Header, Icon, NavBar, Text } from '../Reusable'

const PostHeader = () => {

    return (
        <Header>

            <Text classes="txt-lg txt-ucase txt-primary">sneakerhood</Text>

            <NavBar>

                <Button classes="btn-txt txt-primary txt-md txt-lcase mg-right-s">
                    profile
                </Button>

                <Button classes="btn-txt txt-primary txt-md txt-lcase mg-right-s">
                    feed
                </Button>

                <Button classes="btn-txt txt-primary bg-primary txt-md pd-xs txt-lcase">logout</Button>

            </NavBar>

            <Icon classes="icon-primary">
                bedtime
            </Icon>

        </Header>

    )
}

export default PostHeader
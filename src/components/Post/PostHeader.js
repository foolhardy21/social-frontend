const PostHeader = () => {

    return (
        <header class="b-solid flx flx-maj-even flx-min-center pd-top-md pd-btm-md">

            <p class="txt-lg txt-ucase txt-primary">sneakerhood</p>

            <nav class="flx flx-center">

                <button class="btn-txt txt-primary txt-md txt-lcase mg-right-s">
                    profile
                </button>

                <button class="btn-txt txt-primary txt-md txt-lcase mg-right-s">
                    feed
                </button>

                <button class="btn-txt txt-primary bg-primary txt-md pd-xs txt-lcase">logout</button>

            </nav>

            <span class="material-icons icon-primary">
                bedtime
            </span>

        </header>
    )
}

export default PostHeader
const Text = (props) => {

    return (
        <p className={`${props.classes}`}>
            {props.children}
        </p>
    )
}

export default Text

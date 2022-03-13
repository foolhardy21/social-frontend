const Image = (props) => {

    return (
        <img srcSet={props.srcSet} alt={props.dp} sizes={props.sizes}
            className={`img-fit-cover ${props.classes}`} />
    )
}

export default Image
const Card = (props) => {

    return (
        <article className={`card-dim card-shadow-xs ${props.classes}`}>
            {props.children}
        </article>
    )
}

export default Card
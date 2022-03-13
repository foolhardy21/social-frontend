const Icon = (props) => {

    return (
        <span className={`material-icons ${props.classes}`}>
            {props.children}
        </span>
    )
}

export default Icon

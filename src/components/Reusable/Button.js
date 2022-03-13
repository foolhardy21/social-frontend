const Button = (props) => {

    return (
        <button className={props.classes}>
            {props.children}
        </button>
    )
}

export default Button

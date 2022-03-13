const TextArea = (props) => {

    return (
        <textarea className={`input ${props.classes}`} placeholder={props.placeholder}>
            {props.children}
        </textarea>
    )
}

export default TextArea
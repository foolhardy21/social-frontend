const CommentsWrapper = (CommentComponent, comments) => {

    const Comments = () => {

        return (
            <div className="flx flx-column">
                {
                    comments?.map(comment => <CommentComponent key={comment._id} comment={comment} />)
                }
            </div>
        )
    }

    return Comments
}

export default CommentsWrapper
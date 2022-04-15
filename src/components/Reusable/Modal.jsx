import { PostModal } from "components/Profile"
import { useModal } from "contexts"

const Modal = () => {
    const { modal: { type } } = useModal()

    if (type === 'BIO') {
        return (
            <section className="flx flx-center modal-container pos-fixed tl-0 z-5">
                <article className="modal-md bg-primary">
                    <p>nothing yet</p>
                </article>
            </section>
        )
    }
    return (
        <PostModal />
    )
}

export default Modal
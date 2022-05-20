const ModalWrapper = (ModalComponent) => {

    const Modal = () => {
        return (
            <section className="flx flx-center modal-container pos-fixed tl-0 z-5">
                <article className="modal-md bg-primary brd-s pd-s">
                    <ModalComponent />
                </article>
            </section>
        )
    }
    return Modal
}

export default ModalWrapper
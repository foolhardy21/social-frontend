import { PostModal, ProfileModal } from "components/Profile"
import { useModal } from "contexts"

const Modal = () => {
    const { modal: { type } } = useModal()

    return (type === 'BIO')
        ? <ProfileModal />
        : <PostModal />
}

export default Modal
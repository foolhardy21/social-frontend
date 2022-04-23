import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'

const HomeMain = () => {
    const navigate = useNavigate()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <main className='flx flx-column pd-md'>
            <p className='txt-secondary txt-xxlg txt-500'>sneaker culture</p>
            <p className='txt-secondary txt-xlg txt-400 mg-top-xs mg-btm-xxlg'>join the gang</p>
            <button onClick={navigateToSignup} className={`btn-solid ${styles.btnSignup} bg-primary txt-primary txt-lg txt-400 pd-top-s pd-btm-s brd-s mg-top-md mg-btm-md`}>sign up</button>
            <button onClick={navigateToLogin} className='btn-outlined b-solid b-secondary txt-secondary txt-lg txt-400 pd-top-s pd-btm-s brd-s'>log in</button>
        </main>
    )
}

export default HomeMain
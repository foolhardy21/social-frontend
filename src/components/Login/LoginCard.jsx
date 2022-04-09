import { Link } from 'react-router-dom'
import { LoginForm } from "./"

const LoginCard = () => {

    return (
        <section className='card-dim flx flx-column flx-center pd-lg bg-primary brd-s'>

            <p className='txt-xlg txt-400 txt-primary'>log in to SneakerHood</p>

            <LoginForm />

            <p className='txt-md txt-primary'>dont have an account? <Link to='/signup' className='txt-cap txt-primary txt-500'>sign up</Link></p>

        </section>
    )
}

export default LoginCard
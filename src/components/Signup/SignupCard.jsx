import { Link } from 'react-router-dom'
import { SignupForm } from "./"

const SignupCard = () => {

    return (
        <section className="card-dim flx flx-column flx-center bg-primary pd-lg brd-s">

            <p className="txt-xlg txt-primary txt-400">create your account</p>

            <SignupForm />

            <p className='txt-md txt-primary'>already have an account? <Link to='/login' className='txt-cap txt-primary txt-500'>log in</Link></p>

        </section>
    )
}

export default SignupCard
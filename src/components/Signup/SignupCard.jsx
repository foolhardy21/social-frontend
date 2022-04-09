import { SignupForm } from "./"

const SignupCard = () => {

    return (
        <section className="card-dim flx flx-column bg-primary pd-lg brd-s">

            <p className="txt-xlg txt-primary txt-400">create your account</p>

            <SignupForm />

        </section>
    )
}

export default SignupCard
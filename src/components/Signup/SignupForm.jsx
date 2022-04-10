import { useState } from "react"
import { useAuth } from "../../contexts/auth.context"

const SignupForm = () => {
    const [signupForm, setSignupForm] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        alert: {
            message: '',
            type: ''
        },
        passwordInputType: 'password'
    })
    const { signUpUser } = useAuth()

    const togglePasswordInputType = () => {
        signupForm.passwordInputType === 'password' ? setSignupForm(f => ({ ...f, passwordInputType: 'text' })) : setSignupForm(f => ({ ...f, passwordInputType: 'password' }))
    }

    const handleSignupSubmit = async e => {
        e.preventDefault()

        if (signupForm.username === '' || signupForm.password === '' || signupForm.firstName === '' || signupForm.lastName === '') {
            setSignupForm(f => ({ ...f, alert: { message: 'form is empty', type: 'error' } }))
        } else {
            const response = await signUpUser(signupForm.username,
                signupForm.password, signupForm.firstName, signupForm.lastName)
            if (response.status === 201) {
                setSignupForm(f => ({ ...f, alert: { message: 'account created', type: 'success' } }))
            } else if (response.status === 422 || response.status === 500) {
                setSignupForm(f => ({ ...f, alert: { message: 'username already exists', type: 'error' } }))
            }
        }
    }

    return (
        <form onSubmit={handleSignupSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                signupForm.alert.message.length > 0 && <div className={` ${signupForm.alert.type === 'error' ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{signupForm.alert.type === 'error' ? 'error' : 'check_circle'}</span>
                    <p className='txt-md txt-secondary txt-cap txt-500'>{signupForm.alert.message}</p>
                </div>
            }

            <input type='text' placeholder="username" value={signupForm.username} onChange={e => setSignupForm(f => ({ ...f, username: e.target.value }))} className="input input-md txt-md pd-xs mg-btm-s" />

            <div className="flx flx-maj-start flx-min-center">

                <input type={signupForm.passwordInputType} placeholder='password' value={signupForm.password} onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))} className="input input-md txt-md pd-xs mg-btm-s" />

                <button type="button" onClick={togglePasswordInputType} className="btn-txt mg-left-xs">
                    <span className={`material-icons ${signupForm.passwordInputType === 'password' ? 'txt-off-secondary' : 'txt-primary'} `}>
                        visibility
                    </span>
                </button>

            </div>

            <input type='text' placeholder="first name" value={signupForm.firstName} onChange={e => setSignupForm(f => ({ ...f, firstName: e.target.value }))} className="input input-md txt-md pd-xs mg-btm-s" />

            <input type='text' placeholder="last name" value={signupForm.lastName} onChange={e => setSignupForm(f => ({ ...f, lastName: e.target.value }))} className="input input-md txt-md pd-xs mg-btm-s" />

            <div className="flx flx-maj-end">
                <button type='submit' className="btn-solid bg-secondary txt-secondary txt-md txt-ucase pd-left-s pd-right-s brd-s pd-top-xs pd-btm-xs">signup</button>
            </div>

        </form>
    )
}

export default SignupForm
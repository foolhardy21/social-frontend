import { useReducer } from "react"
import { useAuth } from "../../contexts/auth.context"
import { signupReducer } from "../../reducers"
import { isFormEmpty } from "../../utils"

const SignupForm = () => {
    const [signupState, signupDispatch] = useReducer(signupReducer, {
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
    const { username, password, firstName, lastName, alert: { message, type }, passwordInputType } = signupState

    const togglePasswordInputType = () => {
        signupDispatch({ type: 'TOGGLE_PASSWORD_TYPE' })
    }

    const updateUsername = e => {
        signupDispatch({ type: 'UPDATE_USERNAME', payload: e.target.value })
    }

    const updatePassword = e => {
        signupDispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value })
    }

    const updateFirstName = e => {
        signupDispatch({ type: 'UPDATE_FIRSTNAME', payload: e.target.value })
    }

    const updateLastName = e => {
        signupDispatch({ type: 'UPDATE_LASTNAME', payload: e.target.value })
    }

    const handleSignupSubmit = async e => {
        e.preventDefault()

        if (isFormEmpty({ username, password, firstName, lastName })) {
            signupDispatch({ type: 'UPDATE_ALERT', payload: { message: 'form is empty', type: 'error' } })
        } else {
            const response = await signUpUser(username, password, firstName, lastName)
            if (response.status === 201) {
                signupDispatch({ type: 'UPDATE_ALERT', payload: { message: 'signed up', type: 'success' } })
            } else if (response.status === 422 || response.status === 500) {
                signupDispatch({ type: 'UPDATE_ALERT', payload: { message: 'user already exists', type: 'error' } })
            }
        }
    }

    return (
        <form onSubmit={handleSignupSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                message.length > 0 && <div className={` ${type === 'error' ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{type === 'error' ? 'error' : 'check_circle'}</span>
                    <p className='txt-md txt-secondary txt-cap txt-500'>{message}</p>
                </div>
            }

            <input type='text' placeholder="username" value={username} onChange={e => updateUsername(e)} className="input input-md txt-md pd-xs mg-btm-s" />

            <div className="flx flx-maj-start flx-min-center">

                <input type={passwordInputType} placeholder='password' value={password} onChange={e => updatePassword(e)} className="input input-md txt-md pd-xs mg-btm-s" />

                <button type="button" onClick={togglePasswordInputType} className="btn-txt mg-left-xs">
                    <span className={`material-icons ${passwordInputType === 'password' ? 'txt-off-secondary' : 'txt-primary'} `}>
                        visibility
                    </span>
                </button>

            </div>

            <input type='text' placeholder="first name" value={firstName} onChange={e => updateFirstName(e)} className="input input-md txt-md pd-xs mg-btm-s" />

            <input type='text' placeholder="last name" value={lastName} onChange={e => updateLastName(e)} className="input input-md txt-md pd-xs mg-btm-s" />

            <div className="flx flx-maj-end">
                <button type='submit' className="btn-solid bg-secondary txt-secondary txt-md txt-ucase pd-left-s pd-right-s brd-s pd-top-xs pd-btm-xs">signup</button>
            </div>

        </form>
    )
}

export default SignupForm
import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/auth.context"
import { signupReducer } from "../../reducers"
import { ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_FIRST_NAME, ACTION_UPDATE_LAST_NAME, ACTION_UPDATE_PASSWORD, ACTION_UPDATE_USERNAME, ALERT_DISPLAY_TIME, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, isFormEmpty, showAlert } from "../../utils"

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
    const navigate = useNavigate()
    const { username, password, firstName, lastName, alert: { message, type }, passwordInputType } = signupState

    const togglePasswordInputType = () => {
        signupDispatch({ type: ACTION_TOGGLE_PASSWORD_TYPE })
    }

    const updateUsername = e => {
        signupDispatch({ type: ACTION_UPDATE_USERNAME, payload: e.target.value })
    }

    const updatePassword = e => {
        signupDispatch({ type: ACTION_UPDATE_PASSWORD, payload: e.target.value })
    }

    const updateFirstName = e => {
        signupDispatch({ type: ACTION_UPDATE_FIRST_NAME, payload: e.target.value })
    }

    const updateLastName = e => {
        signupDispatch({ type: ACTION_UPDATE_LAST_NAME, payload: e.target.value })
    }

    const handleSignupSubmit = async e => {
        e.preventDefault()

        if (isFormEmpty({ username, password, firstName, lastName })) {
            showAlert(signupDispatch, 'form is empty', ALERT_TYPE_ERROR)
        } else {
            const response = await signUpUser(username, password, firstName, lastName)
            if (response.status === 201) {
                showAlert(signupDispatch, 'signed up', ALERT_TYPE_SUCCESS)
                setTimeout(() => navigate('/login'), ALERT_DISPLAY_TIME + 100)
            } else if (response.status === 422) {
                showAlert(signupDispatch, 'user already exists', ALERT_TYPE_ERROR)
            }
        }
    }

    return (
        <form onSubmit={handleSignupSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                message.length > 0 && <div className={` ${type === ALERT_TYPE_ERROR ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{type === ALERT_TYPE_ERROR ? 'error' : 'check_circle'}</span>
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

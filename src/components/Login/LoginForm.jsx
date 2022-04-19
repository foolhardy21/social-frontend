import { useReducer, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "contexts"
import { loginReducer } from "reducers"
import { isFormEmpty, ACTION_TOGGLE_PASSWORD_TYPE, ACTION_UPDATE_PASSWORD, ACTION_UPDATE_USERNAME, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_DISPLAY_TIME, showAlert } from "utils"

const LoginForm = () => {
    const navigate = useNavigate()
    const submitBtnRef = useRef(null)
    const [loginState, loginDispatch] = useReducer(loginReducer, {
        username: '',
        password: '',
        alert: {
            message: '',
            type: ''
        },
        passwordInputType: 'password'
    })
    const { logInUser } = useAuth()

    const { username, password, alert: { message, type }, passwordInputType } = loginState

    const togglePasswordInputType = () => {
        loginDispatch({ type: ACTION_TOGGLE_PASSWORD_TYPE })
    }

    const updateUsername = e => {
        loginDispatch({ type: ACTION_UPDATE_USERNAME, payload: e.target.value })
    }

    const updatePassword = e => {
        loginDispatch({ type: ACTION_UPDATE_PASSWORD, payload: e.target.value })
    }

    const handleLoginSubmit = async e => {
        e.preventDefault()

        if (isFormEmpty({ username, password })) {
            showAlert(loginDispatch, 'form is empty', ALERT_TYPE_ERROR)
        } else {
            const response = await logInUser(username, password)
            if (response.status === 200) {
                showAlert(loginDispatch, 'logged in', ALERT_TYPE_SUCCESS)
                setTimeout(() => navigate('/explore'), ALERT_DISPLAY_TIME + 100)
            } else if (response.status === 404) {
                showAlert(loginDispatch, 'user not found', ALERT_TYPE_ERROR)
            } else if (response.status === 401) {
                showAlert(loginDispatch, 'wrong password', ALERT_TYPE_ERROR)
            }
        }
    }

    const handleGuestLogin = () => {
        loginDispatch({ type: 'UPDATE_USERNAME', payload: 'coolmohit' })
        loginDispatch({ type: 'UPDATE_PASSWORD', payload: 'a1!' })
    }

    useEffect(() => {
        if (username === 'coolmohit' && password === 'a1!') {
            submitBtnRef.current.click()
        }
    }, [username, password])

    return (
        <form onSubmit={handleLoginSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                message.length > 0 && <div className={` ${type === ALERT_TYPE_ERROR ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{type === ALERT_TYPE_ERROR ? 'error' : 'check_circle'}</span>
                    <p className='txt-md txt-secondary txt-cap txt-500'>{message}</p>
                </div>
            }

            <input type='text' placeholder='username' value={username} onChange={(e => updateUsername(e))} className='input input-md txt-md txt-primary pd-xs mg-btm-s' />

            <div className="flx flx-maj-start flx-min-center">
                <input type={passwordInputType} placeholder='password' value={password} onChange={(e => updatePassword(e))} className='input input-md txt-md txt-primary pd-xs mg-btm-s' />
                <button type='button' onClick={togglePasswordInputType} className="btn-txt mg-left-xs">
                    <span className={`material-icons ${passwordInputType === 'password' ? 'txt-off-secondary' : 'txt-primary'} `}>
                        visibility
                    </span>
                </button>
            </div>

            <div className='flx flx-maj-end'>
                <button ref={submitBtnRef} type="submit" className='btn-solid bg-secondary txt-secondary txt-md txt-ucase pd-left-s pd-right-s pd-top-xs pd-btm-xs brd-s'>login</button>
            </div>

            <div className='flx flx-maj-end mg-top-xs'>
                <button onClick={handleGuestLogin} type="button" className='btn-outlined b-solid b-primary bg-primary txt-primary txt-md txt-cap pd-left-s pd-right-s pd-top-xs pd-btm-xs brd-s'>guest login</button>
            </div>

        </form>
    )
}

export default LoginForm

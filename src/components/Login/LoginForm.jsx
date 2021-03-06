import { useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleLoginPasswordType, updateLoginUsername, updateLoginPassword, updateLoginAlert, logInUser } from 'slices'
import { isFormEmpty, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_DISPLAY_TIME, showAlert } from "utils"

const LoginForm = () => {
    const loginState = useSelector((state) => state.login)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitBtnRef = useRef(null)
    const location = useLocation()

    const from = location?.state?.from?.pathname || '/explore'

    const { username, password, alert: { message, type }, passwordInputType } = loginState

    const togglePasswordInputType = () => {
        dispatch(toggleLoginPasswordType())
    }

    const updateUsername = e => {
        dispatch(updateLoginUsername(e.target.value))
    }

    const updatePassword = e => {
        dispatch(updateLoginPassword(e.target.value))
    }

    const handleLoginSubmit = e => {
        e.preventDefault()

        if (isFormEmpty({ username, password })) {
            showAlert(dispatch, updateLoginAlert, 'form is empty', ALERT_TYPE_ERROR)
        } else {
            dispatch(logInUser({ username, password }))
            dispatch(updateLoginUsername(''))
            dispatch(updateLoginPassword(''))
        }
    }

    const handleGuestLogin = () => {
        dispatch(updateLoginUsername('coolmohit'))
        dispatch(updateLoginPassword('a1!'))
    }

    useEffect(() => {
        if (authState.isUserLoggedIn) {
            showAlert(dispatch, updateLoginAlert, 'logged in', ALERT_TYPE_SUCCESS)
            setTimeout(() => navigate(from), ALERT_DISPLAY_TIME + 100)
        } else if (authState.error.length > 0) {
            showAlert(dispatch, updateLoginAlert, authState.error, ALERT_TYPE_ERROR)
        }
    }, [authState])

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
            </div >
            <div className='flx flx-maj-end mg-top-xs'>
                <button onClick={handleGuestLogin} type="button" className='btn-outlined b-solid b-primary bg-primary txt-primary txt-md txt-cap pd-left-s pd-right-s pd-top-xs pd-btm-xs brd-s'>guest login</button>
            </div>
        </form >
    )
}

export default LoginForm

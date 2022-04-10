import { useReducer } from "react"
import { useAuth } from "../../contexts"
import { loginReducer } from "../../reducers"
import { isFormEmpty } from "../../utils"

const LoginForm = () => {
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
        loginDispatch({ type: 'TOGGLE_PASSWORD_TYPE' })
    }

    const updateUsername = e => {
        loginDispatch({ type: 'UPDATE_USERNAME', payload: e.target.value })
    }

    const updatePassword = e => {
        loginDispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value })
    }

    const handleLoginSubmit = async e => {
        e.preventDefault()

        if (isFormEmpty({ username, password })) {
            loginDispatch({ type: 'UPDATE_ALERT', payload: { message: 'form is empty', type: 'error' } })
        } else {
            const response = await logInUser(username, password)
            if (response.status === 200) {
                loginDispatch({ type: 'UPDATE_ALERT', payload: { message: 'logged in', type: 'success' } })
            } else if (response.status === 404) {
                loginDispatch({ type: 'UPDATE_ALERT', payload: { message: 'user not found', type: 'error' } })
            }
        }
    }

    return (
        <form onSubmit={handleLoginSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                message.length > 0 && <div className={` ${type === 'error' ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{type === 'error' ? 'error' : 'check_circle'}</span>
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
                <button type="submit" className='btn-solid bg-secondary txt-secondary txt-md txt-ucase pd-left-s pd-right-s pd-top-xs pd-btm-xs brd-s'>login</button>
            </div>

        </form>
    )
}

export default LoginForm
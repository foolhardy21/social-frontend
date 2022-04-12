import { useReducer } from "react"
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
    const { username, password, alert: { message, type }, passwordInputType } = loginState

    const showAlert = (message, type) => {
        loginDispatch({ type: 'UPDATE_ALERT', payload: { message, type } })
        setTimeout(() => loginDispatch({ type: 'UPDATE_ALERT', payload: { message: '', type: '' } }), 1500)
    }

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
            showAlert('form is empty', 'error')
        } else {
            const response = await logInUser(username, password)
            if (response.status === 200) {
                showAlert('logged in', 'success')
                setTimeout(() => navigate('/explore'), 1600)
            } else if (response.status === 404) {
                showAlert('user not found', 'error')
            } else if (response.status === 401) {
                showAlert('wrong password', 'error')
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
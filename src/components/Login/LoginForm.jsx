import { useState } from "react"
import { useAuth } from "../../contexts"

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
        alert: {
            message: '',
            type: ''
        }
    })
    const { logInUser } = useAuth()

    async function handleLoginSubmit(e) {
        e.preventDefault()

        if (loginForm.username === '' || loginForm.password === '') {
            setLoginForm(f => ({ ...f, alert: { ...f.alert, message: 'form is empty', type: 'error' } }))
        } else {
            const response = await logInUser(loginForm.username, loginForm.password)
            if (response.status === 200) {
                setLoginForm(f => ({ ...f, alert: { ...f.alert, message: 'logged in', type: 'success' } }))
            } else if (response.status === 404) {
                setLoginForm(f => ({ ...f, alert: { ...f.alert, message: 'user not found', type: 'error' } }))
            }
        }
    }

    return (
        <form onSubmit={handleLoginSubmit} className='flx flx-column mg-top-md mg-btm-md'>

            {
                loginForm.alert.message.length > 0 && <div className={` ${loginForm.alert.type === 'error' ? 'bg-err' : 'bg-success'} flx flx-min-center flx-maj-start pd-xs brd-s mg-btm-xs`}>
                    <span className='material-icons icon-secondary  mg-right-xs'>{loginForm.alert.type === 'error' ? 'error' : 'check_circle'}</span>
                    <p className='txt-md txt-secondary txt-cap txt-500'>{loginForm.alert.message}</p>
                </div>
            }

            <input type='text' placeholder='username' value={loginForm.username} onChange={(e => setLoginForm(f => ({ ...f, username: e.target.value })))} className='input input-md txt-md txt-primary pd-xs mg-btm-s' />

            <input type='password' placeholder='password' value={loginForm.password} onChange={(e => setLoginForm(f => ({ ...f, password: e.target.value })))} className='input input-md txt-md txt-primary pd-xs mg-btm-s' />

            <div className='flx flx-maj-end'>
                <button type="submit" className='btn-solid bg-secondary txt-secondary txt-md txt-ucase pd-left-s pd-right-s pd-top-xs pd-btm-xs brd-s'>login</button>
            </div>

        </form>
    )
}

export default LoginForm
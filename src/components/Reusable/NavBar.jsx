import { useLocation, Link } from "react-router-dom"
import { useAuth } from "../../contexts"

const NavBar = () => {
    const { isUserLoggedIn } = useAuth()
    const { pathname } = useLocation()

    return (
        <ul className='pd-md'>

            <li className='flx pd-s'>
                <p className='txt-secondary txt-lg'>sneakerhood</p>
            </li>

            <li>
                <Link to='/home' className='flx flx-min-center pd-s'>
                    <span className='material-icons icon-secondary mg-right-xs'>home</span>
                    <p className={`txt-secondary txt-lg ${pathname === '/home' && 'txt-600'}`}>home</p>
                </Link>
            </li>

            <li>
                <Link to='/explore' className='flx flx-min-center pd-s'>
                    <span className='material-icons icon-secondary'>tag</span>
                    <p className={`txt-secondary txt-lg ${pathname === '/explore' && 'txt-600'}`}>explore</p>
                </Link>
            </li>

            <li>
                <Link to='/bookmarks' className='flx flx-min-center pd-s'>
                    <span className='material-icons icon-secondary mg-right-xs'>bookmark</span>
                    <p className={`txt-secondary txt-lg ${pathname === '/bookmark' && 'txt-600'}`}>bookmarks</p>
                </Link>
            </li>

            <li>
                <Link to='/profile' className='flx flx-min-center pd-s'>
                    <span className='material-icons icon-secondary mg-right-xs'>person</span>
                    <p className={`txt-secondary txt-lg ${pathname === '/profile' && 'txt-600'}`}>profile</p>
                </Link>
            </li>

            {/* add conditional icon for logout and login */}

            <li>
                <Link to={`${isUserLoggedIn ? '/explore' : '/login'}`} className='flx flx-min-center pd-s'>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        {
                            isUserLoggedIn ? 'logout' : 'login'
                        }
                    </span>
                    <p className='txt-secondary txt-lg'>
                        {
                            isUserLoggedIn ? 'logout' : 'login'
                        }
                    </p>
                </Link>
            </li>
        </ul>

    )
}

export default NavBar
import { useLocation, Link, useNavigate } from "react-router-dom"
import { getUsername } from 'utils'
import styles from './navbar.module.css'
import { useDispatch, useSelector } from "react-redux"
import { logOutUser } from "slices"

const NavBar = () => {
    const { isUserLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleLogoutUser = () => {
        dispatch(logOutUser())
        navigate('/')
    }

    return (
        <ul className='pd-top-md pd-right-s'>
            <li className='flx pd-s'>
                <p className='txt-secondary txt-lg'>sneakerhood</p>
            </li>
            <li>
                <Link to='/myfeed' className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        home
                    </span>
                    <p className={`txt-secondary txt-lg ${styles.navBarItemText} ${pathname === '/home' && 'txt-600'}`}>
                        my feed
                    </p>
                </Link>
            </li>
            <li>
                <Link to='/explore' className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        tag
                    </span>
                    <p className={`txt-secondary txt-lg ${styles.navBarItemText} ${pathname === '/explore' && 'txt-600'}`}>
                        explore
                    </p>
                </Link>
            </li>
            <li>
                <Link to='/bookmarks' className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        bookmark
                    </span>
                    <p className={`txt-secondary txt-lg ${styles.navBarItemText} ${pathname === '/bookmarks' && 'txt-600'}`}>
                        bookmarks
                    </p>
                </Link>
            </li>
            <li>
                <Link to={`/${getUsername()}`} className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        person
                    </span>
                    <p className={`txt-secondary txt-lg ${styles.navBarItemText} ${pathname === '/profile' && 'txt-600'}`}>
                        profile
                    </p>
                </Link>
            </li>
            {
                isUserLoggedIn
                    ?
                    <li className={`flx flx-min-center ${styles.linkLogout} ${styles.navBarItem}`}>
                        <a onClick={handleLogoutUser} className={`flx  flx-min-center pd-s`}>
                            <span className='material-icons icon-secondary mg-right-xs'>
                                logout
                            </span>
                            <p className={`txt-secondary txt-lg ${styles.navBarItemText}`}>
                                logout
                            </p>
                        </a>
                    </li>
                    :
                    <li>
                        <Link to='/login' className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                            <span className='material-icons icon-secondary mg-right-xs'>
                                login
                            </span>
                            <p className={`txt-secondary txt-lg ${styles.navBarItemText}`}>
                                login
                            </p>
                        </Link>
                    </li>
            }
        </ul>

    )
}

export default NavBar

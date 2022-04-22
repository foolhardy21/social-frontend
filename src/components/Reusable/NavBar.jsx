import { useLocation, Link, useNavigate } from "react-router-dom"
import { useAuth } from "contexts"
import styles from './navbar.module.css'

const NavBar = () => {
    const { isUserLoggedIn, logoutUser } = useAuth()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleLogoutUser = () => {
        logoutUser()
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
                <Link to='/profile' className={`flx flx-min-center ${styles.navBarItem} pd-s`}>
                    <span className='material-icons icon-secondary mg-right-xs'>
                        person
                    </span>
                    <p className={`txt-secondary txt-lg ${styles.navBarItemText} ${pathname === '/profile' && 'txt-600'}`}>
                        profile
                    </p>
                </Link>
            </li>

            {/* add conditional icon for logout and login */}

            {
                isUserLoggedIn
                    ?
                    <li className={`flx flx-min-center ${styles.navBarItem}`}>

                        <button onClick={handleLogoutUser} className={`btn-txt flx  flx-min-center pd-s`}>
                            <span className='material-icons icon-secondary mg-right-xs'>
                                logout
                            </span>
                            <p className={`txt-secondary txt-lg ${styles.navBarItemText}`}>
                                logout
                            </p>
                        </button>

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

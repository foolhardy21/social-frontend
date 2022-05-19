const { useSelector } = require("react-redux")
const { Navigate, useLocation } = require("react-router-dom")

const RequireAuth = ({ children }) => {
    const location = useLocation()
    const { isUserLoggedIn } = useSelector(state => state.auth)

    return isUserLoggedIn ? children : <Navigate to='/login' state={{ from: location }} replace />
}

export default RequireAuth
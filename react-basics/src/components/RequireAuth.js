import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RequireAuth({ children, redirectTo, role }) {
    let isAuthenticated = !!localStorage.getItem('token');
    var userRole = null;
    if (isAuthenticated) {
        userRole = jwtDecode(localStorage.getItem('token')).user_type
        const exp = jwtDecode(localStorage.getItem('token')).exp
        console.log(exp);
        console.log(Date.now());
        if (Date.now() >= exp * 1000) {
            alert('Login Timeout!')
            localStorage.removeItem('token')
            return <Navigate to={'/login'} />
        }
    }

    return isAuthenticated && role.includes(userRole) ? children : <Navigate to={redirectTo} />
}
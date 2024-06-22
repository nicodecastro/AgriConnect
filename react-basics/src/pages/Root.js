import Header from './User/header/Header.js';
import Footer from './User/footer/Footer';
import { Outlet } from 'react-router';
import GetUserRole from '../components/GetUserRole.js';
import AdminHeader from './Admin/Header/AdminHeader.js';

export default function Root() {

    // userRole is the role of logged in user ('user' or 'admin')
    var userRole = GetUserRole(localStorage.getItem('token'))


    return (
        <>
             {userRole == "user"? <Header />: <AdminHeader/>}
            <div className='root-content'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
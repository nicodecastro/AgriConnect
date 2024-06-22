import './Login.css';
// import SignUp from './SignUp';
import Footer from '../User/footer/Footer';
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import logo from '../../Images/Circular Logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/register')
            .then((res) => {
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password })
            const token = response.data.token
            console.log(jwtDecode(token))
            alert('Login successful')
            setEmail('')
            setPassword('')
            fetchUsers();
            navigate('/') // '/' is path to home page, '/shop/' is path to view products
            window.location.reload()
            localStorage.setItem('token', token)
        } catch (err) {
            alert('Invalid credentials')
            console.log('Login Error')
        }
    }

    return (
        <>
            {isAuthenticated ? <Navigate to={"/"} /> :
            <div className="login-page">
                <img className="login-bg-img" src="https://wallpapers.com/images/hd/beautiful-countryside-agriculture-ho7hwjfzpuhqtvnm.jpg"></img>
                <div className="login-box">
                    <img className='logo' src={logo} />
                    <h2>Login to your account</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="email-input" placeholder='Email' required></input>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password-input" placeholder='Password' required></input>
                        <button
                            type="submit"
                            className='login-button'>Login</button>
                    </form>
                    <p>New here? <Link to={`/signup`} >Sign Up</Link></p>
                </div>
            </div>}
            <Footer />
            <Outlet />
        </>
    )
}
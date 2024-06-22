import { Outlet, Link, useNavigate } from 'react-router-dom'
import './SignUp.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Expire from '../../components/Expire';


export default function SignUp() {
    const navigate = useNavigate();
    const [user, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [middle_name, setMiddleName] = useState('')
    const [last_name, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const [key, setKey] = useState(0)
    const [requestMessage, setRequestMessage] = useState('')
    const [bgColor, setBgColor] = useState("#0A6847")

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/register')
            .then((res) => {
                console.log(res.data);          // REMOVE! For testing purposes only!
            })
    }

    const handleRegister = (event) => {
        event.preventDefault()
        axios
            .post('http://localhost:3001/register',
                {
                    email,
                    password,
                    first_name,
                    middle_name,
                    last_name
                })
            .then(() => {
                alert('Registration Successful')
                setEmail('')
                setPassword('')
                setFirstName('')
                setMiddleName('')
                setLastName('')
                fetchUsers()
                navigate('/login')
            })
            .catch((error) => {
                setBgColor("#D32F2F");
                setKey(key + 1);
                setRequestMessage('Signup Error: Email already in use!')
            })
    }

    return (
        <>
            <div class="signup-page">
                <div class="signup-box">
                    <h1>Sign up</h1>
                    <form onSubmit={handleRegister}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="email-input" placeholder='Email' required></input>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="password-input" placeholder='Password' required></input>
                        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' required></input>
                        <input type="text" value={middle_name} onChange={(e) => setMiddleName(e.target.value)} placeholder='Middle name (optional)'></input>
                        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' required></input>
                        <button
                            type="submit"
                            className='login-button'>Submit</button>
                    </form>
                    <Link to={`/login`}><p>back</p></Link>
                    <Outlet />
                </div>
                {<Expire delay="3000" text={requestMessage} bgColor={bgColor} expireKey={key} />}
            </div>
        </>
    )

}
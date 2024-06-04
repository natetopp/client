import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import UploadButton from '../Upload/UploadButton';
import SignupButton from '../Signup/SignupButton';
import LoginButton from '../Login/LoginButton';
import LogoutButton from '../Logout/LogoutButton';
import './css/navBar.css';

export default function NavBar() {
    const token = localStorage.getItem('token');

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (token) {
            try {
                const data = jwtDecode(token);
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, [token]);

    return (
        <nav className='navBar'>
            <div className='navBar__content'>
                <p className='navBar__logoText'>Do(x)</p>
                <div className='navBar__buttons'>
                    {(!token && (
                        <div className='navBar__sessionBlock'>
                            <SignupButton />
                            <LoginButton />
                        </div>
                    )) || (
                            token && (
                                <div className='navBar__sessionBlock'>
                                    <p className='navBar__username'>{userInfo.username} {userInfo.isAdmin ? '(Admin)' : ''}</p>
                                    <LogoutButton />
                                </div>
                            ))}
                    <UploadButton />
                </div>
            </div>
        </nav>
    );
}

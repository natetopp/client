import React, { useLayoutEffect, useState } from 'react';
import LoginModal from './LoginModal';
import '../../css/buttons.css';

export default function LoginButton() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setLoginModalOpen(false);
    };

    useLayoutEffect(() => {
        loginModalOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [loginModalOpen]);

    return (
        <>
            <button className='secondaryButton' onClick={handleLoginClick}>
                Log in
            </button>
            {loginModalOpen && (
                <LoginModal onClose={handleCloseModal} />
            )}
        </>
    );
}
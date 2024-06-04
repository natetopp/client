import React, { useLayoutEffect, useState } from 'react';
import SignupModal from './SignupModal';
import '../../css/buttons.css';
import '../NavBar/css/navBar.css';

export default function SignupButton() {
    const [signupModalOpen, setSignupModalOpen] = useState(false);

    const handleSignupClick = () => {
        setSignupModalOpen(true);
    };

    const handleCloseModal = () => {
        setSignupModalOpen(false);
    };

    useLayoutEffect(() => {
        signupModalOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [signupModalOpen]);

    return (
        <>
            <button className='secondaryButton' onClick={handleSignupClick}>
                Sign up
            </button>
            {signupModalOpen && (
                <SignupModal onClose={handleCloseModal} />
            )}
        </>
    );
}
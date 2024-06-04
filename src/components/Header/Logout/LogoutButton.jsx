import React, { useLayoutEffect, useState } from 'react';
import LogoutModal from './LogoutModal';
import '../../css/buttons.css';

export default function LogoutButton() {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const handleCloseModal = () => {
        setLogoutModalOpen(false);
    };

    useLayoutEffect(() => {
        logoutModalOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [logoutModalOpen]);

    return (
        <>
            <button className='secondaryButton' onClick={handleLogoutClick}>
                Log out
            </button>
            {logoutModalOpen && (
                <LogoutModal onClose={handleCloseModal} />
            )}
        </>
    );
}
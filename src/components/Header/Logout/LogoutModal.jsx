import React from 'react';
import '../../css/modals.css';
import '../../css/buttons.css';

export default function LogoutModal({ onClose }) {
    const handleLogout = async () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className='modal__header'>Log out</h2>
                <div className='modal__content'>
                    <p>Are you sure you want to log out?</p>
                    <div className='modal__buttons'>
                        <button
                            className='modal__submitButton redButton'
                            onClick={handleLogout}>
                            Log out
                        </button>
                        <button
                            className='modal__cancelButton secondaryButton'
                            onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

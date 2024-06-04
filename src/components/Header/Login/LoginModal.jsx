import React, { useState } from 'react';
import '../../css/modals.css';
import '../../css/forms.css';
import '../../css/buttons.css';

export default function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameFieldStyle, setUsernameFieldStyle] = useState('');
    const [passwordFieldStyle, setPasswordFieldStyle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username && !password) {
            setUsernameFieldStyle('form__textArea_error');
            setPasswordFieldStyle('form__textArea_error');
            return;
        } else if (!username) {
            setUsernameFieldStyle('form__textArea_error');
            return;
        } else if (!password) {
            setPasswordFieldStyle('form__textArea_error');
            return;
        }

        const data = {
            username: username,
            password: password,
        }

        try {
            const res = await fetch('http://localhost:5000/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else if (res.status === 404) {
                alert('User not found');
            } else if (res.status === 400) {
                alert('Wrong password');
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to sign up: ${errorText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__header">Log in</h2>
                <form className='modal__content form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className={`form__textArea ${usernameFieldStyle}`}
                        onChange={(e) => { setUsername(e.target.value); setUsernameFieldStyle('') }}
                        placeholder='Username' />
                    <input
                        type='password'
                        className={`form__textArea ${passwordFieldStyle}`}
                        onChange={(e) => { setPassword(e.target.value); setPasswordFieldStyle('') }}
                        placeholder='Password' />
                    <div className='modal__buttons'>
                        <button
                            type='submit'
                            className='modal__submitButton primaryButton'>
                            Log in
                        </button>
                        <button
                            className='modal__cancelButton secondaryButton'
                            onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
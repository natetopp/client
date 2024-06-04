import React, { useState } from 'react';
import '../../css/modals.css';
import '../../css/forms.css';
import '../../css/buttons.css';

export default function SignupModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

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
            isAdmin: isAdmin,
        }

        try {
            const res = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                window.location.reload();
            } else if (res.status === 400) {
                alert('This username is taken');
            } else if (res.status === 401) {
                alert('Username cannot contain space characters');
            } else if (res.status === 402) {
                alert('Username must be from 5 to 20 characters');
            } else if (res.status === 403) {
                alert('Password cannot be shorter than 8 characters, must contatin only latin letters and include an uppercase letter, a lowercase letter, and a number');
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
                <h2 className="modal__header">Sign up</h2>
                <form className='modal__content form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className={`form__textArea ${usernameFieldStyle}`}
                        onChange={(e) => { setUsername(e.target.value); setUsernameFieldStyle('') }}
                        placeholder='Username (required)' />
                    <input
                        type='password'
                        className={`form__textArea ${passwordFieldStyle}`}
                        onChange={(e) => { setPassword(e.target.value); setPasswordFieldStyle('') }}
                        placeholder='Password (required)' />
                    <div className="form__checkboxBlock">
                        <input
                            type='checkbox'
                            className='form__checkbox'
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            id='makeAnAdmin' />
                        <label htmlFor='makeAnAdmin' className='form__checkboxLabel'>
                            Make an admin
                        </label>
                    </div>
                    <div className='modal__buttons'>
                        <button
                            type='submit'
                            className='modal__submitButton primaryButton'>
                            Sign up
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
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../../css/modals.css';
import '../../css/forms.css';
import '../../css/buttons.css';

export default function UploadModal({ onClose }) {
    const token = localStorage.getItem('token');

    const [document, setDocument] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState({});

    const [nameFieldStyle, setNameFieldStyle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!document) {
            alert('Document file is required');
            return;
        }

        if (!name) {
            setNameFieldStyle('form__textArea_error');
            return;
        }

        if (description.length > 800) {
            alert('Description cannot be longer than 800 characters');
            return;
        }

        const formData = new FormData();
        formData.append('document', document);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('user', user.username + (user.isAdmin ? ' (Admin)' : ''));

        try {
            const res = await fetch('http://localhost:5000/files', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                window.location.reload();
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to upload a document: ${errorText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            try {
                const data = jwtDecode(token);
                setUser(data);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        } else {
            setUser({
                username: 'Unauthorized user',
            });
        }
    }, [token, setUser]);

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__header">Upload document</h2>
                <form className='modal__content form' onSubmit={handleSubmit}>
                    <input
                        type='file'
                        className='form__filePicker'
                        onChange={(e) => setDocument(e.target.files[0])}
                        accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/epub+zip' />
                    <input
                        type='text'
                        className={`form__textArea ${nameFieldStyle}`}
                        onChange={(e) => { setName(e.target.value); setNameFieldStyle('') }}
                        placeholder='Name (required)' />
                    <textarea
                        className='form__textArea descField'
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description' />
                    <div className='modal__buttons'>
                        <button
                            type='submit'
                            className='modal__submitButton primaryButton'>
                            Upload
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
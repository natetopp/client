import React, { useState } from 'react';
import '../../css/modals.css';
import '../../css/forms.css';
import '../../css/buttons.css';

export default function EditModal({ id, name, description, onClose }) {
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);

    const [nameFieldStyle, setNameFieldStyle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newName) {
            setNameFieldStyle('form__textArea_error');
            return;
        }

        if (newDescription.length > 1000) {
            alert('Description cannot be longer than 1000 characters');
            return
        }

        const data = {
            newName: newName,
            newDescription: newDescription,
        }

        try {
            const res = await fetch(`http://localhost:5000/files/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                window.location.reload();
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to edit a document: ${errorText}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__header">Edit document</h2>
                <form className='modal__content form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className={`form__textArea ${nameFieldStyle}`}
                        onChange={(e) => { setNewName(e.target.value); setNameFieldStyle('') }}
                        value={newName}
                        placeholder='Name (required)' />
                    <textarea
                        className='form__textArea descField'
                        onChange={(e) => setNewDescription(e.target.value)}
                        value={newDescription}
                        placeholder='Description' />
                    <div className='modal__buttons'>
                        <button
                            type='submit'
                            className='modal__submitButton primaryButton'>
                            Save
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

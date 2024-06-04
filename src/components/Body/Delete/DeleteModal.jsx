import React from 'react';
import '../../css/modals.css';
import '../../css/buttons.css';

export default function DeleteModal({ id, document, onClose }) {
    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/files/${id}/${document}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                window.location.reload();
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to delete a document: ${errorText}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className='modal__header'>Delete document</h2>
                <div className='modal__content'>
                    <p>Are you sure you want to delete this document?</p>
                    <div className='modal__buttons'>
                        <button
                            className='modal__submitButton redButton'
                            onClick={handleDelete}>
                            Delete
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

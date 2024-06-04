import React from 'react';
import moment from 'moment';
import '../../css/modals.css';
import '../../css/buttons.css';

export default function InfoModal({ id, description, document, size, creationDate, onClose }) {
    const ext = document.split('.').pop();
    const formattedCreationDate = moment(creationDate).format('MMMM Do YYYY, HH:mm');

    return (
        <div className='overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h2 className='modal__header'>Document info</h2>
                <div className='modal__content'>
                    {description.length > 0 && <div className='modal__block'>
                        <h3 className='modal__caption'>
                            Description
                        </h3>
                        <p className='modal__text'>
                            {description}
                        </p>
                    </div>}
                    <div className='modal__block'>
                        <h3 className='modal__caption'>
                            Attributes
                        </h3>
                        <p className='modal__text'>
                            <span className='modal__attribute'>Extension:</span> .{ext}
                        </p>
                        <p className='modal__text'>
                            <span className='modal__attribute'>Size:</span> {size} MB
                        </p>
                        <p className='modal__text'>
                            <span className='modal__attribute'>Uploaded:</span> {formattedCreationDate}
                        </p>
                    </div>
                    <div className='modal__buttons'>
                        <button
                            className='modal__cancelButton secondaryButton'
                            onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
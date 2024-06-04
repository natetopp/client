import React, { useLayoutEffect, useState } from 'react';
import UploadModal from './UploadModal';
import '../../css/buttons.css';

export default function UploadButton() {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    const handleUploadClick = () => {
        setUploadModalOpen(true);
    };

    const handleCloseModal = () => {
        setUploadModalOpen(false);
    };

    useLayoutEffect(() => {
        uploadModalOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [uploadModalOpen]);

    return (
        <>
            <button className='primaryButton' onClick={handleUploadClick}>
                Upload
            </button>
            {uploadModalOpen && (
                <UploadModal onClose={handleCloseModal} />
            )}
        </>
    );
}
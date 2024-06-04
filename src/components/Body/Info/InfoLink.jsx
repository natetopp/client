import React, { useLayoutEffect, useState } from 'react';
import InfoModal from './InfoModal';
import '../../css/links.css';

export default function InfoLink({ id, description, docmt, size, creationDate }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInfoClick = ({ id, description, docmt, size, creationDate }) => {
        setSelectedFile({ id, description, docmt, size, creationDate });
    };

    const handleCloseModal = () => {
        setSelectedFile(null);
    };

    useLayoutEffect(() => {
        selectedFile != null ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [selectedFile]);

    return (
        <>
            <span className='link' onClick={() => handleInfoClick({ id, description, docmt, size, creationDate })}>
                More details
            </span>
            {selectedFile && (
                <InfoModal
                    id={selectedFile.id}
                    description={selectedFile.description}
                    document={selectedFile.docmt}
                    size={selectedFile.size}
                    creationDate={selectedFile.creationDate}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
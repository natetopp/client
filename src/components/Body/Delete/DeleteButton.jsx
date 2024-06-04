import React, { useLayoutEffect, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiTrash } from 'react-icons/fi';
import DeleteModal from './DeleteModal';
import '../../css/buttons.css';

export default function DeleteButton({ id, docmt, username }) {
    const token = localStorage.getItem('token');

    const [user, setUser] = useState({});
    const [deleteAllowed, setDeleteAllowed] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleDeleteClick = ({ id, docmt }) => {
        setSelectedFile({ id, docmt });
    };

    const handleCloseModal = () => {
        setSelectedFile(null);
    };

    useLayoutEffect(() => {
        selectedFile != null ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [selectedFile]);

    useEffect(() => {
        if (token) {
            try {
                const data = jwtDecode(token);
                setUser(data);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, [token]);

    useEffect(() => {
        if (user.isAdmin || username === user.username) {
            setDeleteAllowed(true);
        }
    }, [user, username]);

    return (
        <>
            {deleteAllowed && (
                <button className='iconButtonRed' onClick={() => handleDeleteClick({ id, docmt })}>
                    <FiTrash size={24} />
                </button>
            )}
            {selectedFile && (
                <DeleteModal
                    id={selectedFile.id}
                    document={selectedFile.docmt}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

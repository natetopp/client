import React, { useLayoutEffect, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiEdit } from 'react-icons/fi';
import EditModal from './EditModal';
import '../../css/buttons.css';

export default function EditButton({ id, name, description, username }) {
    const token = localStorage.getItem('token');

    const [user, setUser] = useState({});
    const [editAllowed, setEditAllowed] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleEditClick = ({ id, name, description }) => {
        setSelectedFile({ id, name, description });
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
            setEditAllowed(true);
        }
    }, [user, username]);

    return (
        <>
            {editAllowed && (
                <button className='iconButtonBlue' onClick={() => handleEditClick({ id, name, description })}>
                    <FiEdit size={24} />
                </button>
            )}
            {selectedFile && (
                <EditModal
                    id={selectedFile.id}
                    name={selectedFile.name}
                    description={selectedFile.description}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

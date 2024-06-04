import React, { useEffect, useState } from 'react';
import { FiFile } from 'react-icons/fi';
import InfoLink from '../Info/InfoLink';
import CopyButton from '../Copy/CopyButton';
import EditButton from '../Edit/EditButton';
import DeleteButton from '../Delete/DeleteButton';
import './css/fileCard.css';

export default function FileCard() {
    const [filesData, setFilesData] = useState([]);

    const filesInit = async () => {
        try {
            const res = await fetch('http://localhost:5000/files', {
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                setFilesData(data.reverse());
            } else {
                const errorText = await res.text();
                throw new Error(`Failed to initiate documents: ${errorText}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        filesInit();
    }, []);

    return (
        <>
            {filesData && filesData.map(f => (
                <div className='fileCard' key={f._id} onClick={() => window.open(`http://localhost:5000/uploads//${f.document}`, 'blank', 'noreferrer')}>
                    <div className='fileCard__fileInfo'>
                        <div className='fileCard__fileIcon'><FiFile size={30} /></div>
                        <div className='fileCard__fileData' onClick={(e) => e.stopPropagation()}>
                            <h2 className='fileCard__fileName'>{f.name}</h2>
                            <div className='fileCard__fileDesc'>
                                {f.user} •&nbsp;<InfoLink id={f._id} description={f.description} docmt={f.document} size={f.size} creationDate={f.creationDate} />
                            </div>
                        </div>
                    </div>
                    <div className='fileCard__fileActions' onClick={(e) => e.stopPropagation()}>
                        <CopyButton document={f.document} />
                        <EditButton id={f._id} name={f.name} description={f.description} username={f.user} />
                        <DeleteButton id={f._id} docmt={f.document} username={f.user} />
                    </div>
                </div>
            ))}
        </>
    );
}

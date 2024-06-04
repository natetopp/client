import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { FiCheck } from 'react-icons/fi';
import '../../css/buttons.css';

export default function CopyButton({ document }) {
    const [copyButtonStyle, setCopyButtonStyle] = useState('iconButtonBlue');
    const [isClicked, setIsClicked] = useState(false);

    const handleCopyClick = ({ document }) => {
        navigator.clipboard.writeText(`http://localhost:5000/uploads//${document}`);
        setCopyButtonStyle('iconButtonGreen');
        setIsClicked(true);
    };

    return (
        <>
            <button className={copyButtonStyle} onClick={() => handleCopyClick({ document })}>
                {(!isClicked && <FiCopy size={24} />) ||
                    (isClicked && <FiCheck size={24} />)}
            </button>
        </>
    );
}
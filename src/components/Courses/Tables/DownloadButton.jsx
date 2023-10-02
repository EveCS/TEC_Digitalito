import React, { useEffect } from 'react';
import { Buffer } from 'buffer';

const DownloadButton = ({ base64Data, filename }) => {
    let url = "";

    useEffect(() => {

        const decodedData = Buffer.from(base64Data, 'base64');
        const blob = new Blob([decodedData], { type: 'application/octet-stream' });
        url = URL.createObjectURL(blob);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [base64Data, filename]);

    return (
        <a href={url} download={filename}>
            Download File
        </a>
    );
};

export default DownloadButton;

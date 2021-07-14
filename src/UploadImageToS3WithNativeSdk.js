import React, { useState } from 'react';
import AWS from 'aws-sdk';
require('dotenv').config()

const { REACT_APP_ACCESS_KEY_ID, REACT_APP_SECRET_ACCESS_KEY, REACT_APP_REGION } = process.env;

const S3_BUCKET = 'synkbooks-log-bucket';

AWS.config.update({
    region: REACT_APP_REGION,
    accessKeyId: REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_SECRET_ACCESS_KEY
})

console.log(REACT_APP_REGION + REACT_APP_ACCESS_KEY_ID + REACT_APP_SECRET_ACCESS_KEY)

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REACT_APP_REGION
})
const UploadImageToS3WithNativeSdk = () => {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params).on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total)) * 100 )
        }).send((err => {
            if (err) console.log(err)
        }))
    }

    return <>
        <div> Native SDK File Upload Progress is {progress}%</div>
        <input type='file' onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}>Upload to S3</button>
    </>
}

export default UploadImageToS3WithNativeSdk;
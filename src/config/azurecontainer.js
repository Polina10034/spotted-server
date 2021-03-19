const azureStorage = require('azure-storage');
const getStream = require('into-stream');

var account_name = process.env.AZURE_STORAGE_ACCOUNT || 'account_name';
var account_key = process.env.AZURE_STORAGE_ACCESS_KEY || 'account_key';
var blob_url = process.env.AZURE_STORAGE_URL || 'blob_url';
var container_name = process.env.AZURE_C1_NAME || 'container_name';

const azureStorageConfig = {
    accountName: account_name,
    accountKey: account_key,
    blobURL: blob_url,
    containerName: container_name
};

const uploadFileToBlob = async (directoryPath, file) => {
 
    return new Promise((resolve, reject) => {
 
        const blobName = getBlobName(file.originalname);
        const stream = getStream(file.buffer);
        const streamLength = file.buffer.length;
 
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ filename: blobName, 
                    originalname: file.originalname, 
                    size: streamLength, 
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}` });
            }
        });
 
    });
 
};
 
const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};
module.exports = uploadFileToBlob;
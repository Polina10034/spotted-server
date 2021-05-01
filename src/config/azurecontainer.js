/* eslint-disable max-len */
/* eslint-disable camelcase */
const azureStorage = require('azure-storage');
const getStream = require('into-stream');

const account_name = process.env.AZURE_STORAGE_ACCOUNT || 'account_name';
const account_key = process.env.AZURE_STORAGE_ACCESS_KEY || 'account_key';
const blob_url = process.env.AZURE_STORAGE_URL || 'blob_url';
const container_name = process.env.AZURE_C1_NAME || 'container_name';
const containerraw_name = process.env.AZURE_C3_NAME || 'containerraw_name';

const azureStorageConfig = {
  accountName: account_name,
  accountKey: account_key,
  blobURL: blob_url,
  containerName: container_name,
};

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

const uploadFileToBlob = async (directoryPath, file) => new Promise((resolve, reject) => {
  const blobName = getBlobName(file.originalname);
  const stream = getStream(file.buffer);
  const streamLength = file.buffer.length;

  const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
  blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve({
        filename: blobName,
        originalname: file.originalname,
        size: streamLength,
        path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
        url: `${azureStorageConfig.blobURL}/${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
      });
    }
  });
});

const uploadRawFileToBlob = async (directoryPath, file) => new Promise((resolve, reject) => {
  // const blobName = getBlobName(file.originalname);
  const blobName = file.originalname;

  // const blobName = getBlobName(file.originalname);
  const stream = getStream(file.buffer);
  const streamLength = file.buffer.length;
  azureStorageConfig.containerName = containerraw_name;
  const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
  blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve({
        filename: blobName,
        originalname: file.originalname,
        size: streamLength,
        path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
        url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
      });
    }
  });
});

// const uploadFilesToBlob = async (directoryPath, files) => new Promise((resolve, reject) => {
//   const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);

//   if (files.length > 0) {
//     for (let i = 0; i < files.length; i++) {
//       const blobName = getBlobName(files[i].originalname);
//       const stream = getStream(files[i].buffer);
//       const streamLength = files[0].buffer.length;
//       blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           console.log('success uploaded');
//         //   resolve({
//         //     filename: blobName,
//         //     originalname: file.originalname,
//         //     size: streamLength,
//         //     path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
//         //     url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
//         //   });
//         }
//       });
//     }
//   }
// });


module.exports = {
  uploadFileToBlob,
  // uploadFilesToBlob,
  uploadRawFileToBlob,
};

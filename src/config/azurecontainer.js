/* eslint-disable max-len */
/* eslint-disable camelcase */
const azureStorage = require("azure-storage");
const getStream = require("into-stream");

const account_name = process.env.AZURE_STORAGE_ACCOUNT || "account_name";
const account_key = process.env.AZURE_STORAGE_ACCESS_KEY || "account_key";
const blob_url = process.env.AZURE_STORAGE_URL || "blob_url";
const container_name = process.env.AZURE_C1_NAME || "container_name";
const containerraw_name = process.env.AZURE_C3_NAME || "containerraw_name";

const azureStorageConfig = {
  accountName: account_name,
  accountKey: account_key,
  blobURL: blob_url,
  containerName: container_name,
};

//function for files upload to azure container
const uploadFileToBlob = async (directoryPath, file) =>
  new Promise((resolve, reject) => {
    const blobName = file.originalname;
    const stream = getStream(file.buffer);
    const streamLength = file.buffer.length;

    const blobService = azureStorage.createBlobService(
      azureStorageConfig.accountName,
      azureStorageConfig.accountKey
    );
    blobService.createBlockBlobFromStream(
      azureStorageConfig.containerName,
      `${directoryPath}/${blobName}`,
      stream,
      streamLength,
      (err) => {
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
      }
    );
  });

//function for uploaing raw files to container (pre species detection)
const uploadRawFileToBlob = async (directoryPath, file) =>
  new Promise((resolve, reject) => {
    const blobName = file.originalname;
    const stream = getStream(file.buffer);
    const streamLength = file.buffer.length;
    azureStorageConfig.containerName = containerraw_name;
    const blobService = azureStorage.createBlobService(
      azureStorageConfig.accountName,
      azureStorageConfig.accountKey
    );
    blobService.createBlockBlobFromStream(
      azureStorageConfig.containerName,
      `${directoryPath}/${blobName}`,
      stream,
      streamLength,
      (err) => {
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
      }
    );
  });

//function for file copy in container
const CopyBlobFiles = async (directoryPath, urlArr) =>
  new Promise((resolve, reject) => {
    const lenght = urlArr.length;
    const results = [];
    for (let i = 0; i < lenght; i += 1) {
      const url = urlArr[i];
      const urlSplit = url.split("/");
      const fileNameSplit = urlSplit[5].split(".");
      const blobService = azureStorage.createBlobService(
        azureStorageConfig.accountName,
        azureStorageConfig.accountKey
      );
      blobService.startCopyBlob(
        url,
        azureStorageConfig.containerName,
        `${directoryPath}/${fileNameSplit[0]}_${i}.${fileNameSplit[1]}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            results.push({
              filename: urlSplit[5],
              url: `${azureStorageConfig.blobURL}/${azureStorageConfig.containerName}/${directoryPath}/${fileNameSplit[0]}_${i}.${fileNameSplit[1]}`,
            });
            resolve({
              url: `${azureStorageConfig.blobURL}/${azureStorageConfig.containerName}/${directoryPath}/${fileNameSplit[0]}_${i}.${fileNameSplit[1]}`,
              result,
            });
          }
        }
      );
    }
  });
const CopyVideoBlobFiles = async (directoryPath, urlArr) =>
  new Promise((resolve, reject) => {
    const lenght = urlArr.length;
    const results = [];
    for (let i = 0; i < lenght; i += 1) {
      const url = urlArr[i];
      const urlSplit = url.split("/");
      const blobService = azureStorage.createBlobService(
        azureStorageConfig.accountName,
        azureStorageConfig.accountKey
      );
      blobService.startCopyBlob(
        url,
        azureStorageConfig.containerName,
        `${directoryPath}/${urlSplit[5]}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            results.push({
              filename: urlSplit[5],
              url: `${azureStorageConfig.blobURL}/${azureStorageConfig.containerName}/${directoryPath}/${urlSplit[5]}`,
            });
            resolve({
              url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${urlSplit[5]}`,
              result,
            });
          }
        }
      );
    }
  });

//function - delete files from container (for images which failed species detection)
const deleteBlobFile = async (directoryPath, files) =>
  new Promise((resolve, reject) => {
    const lenght = files.length;
    const results = [];
    for (let i = 0; i < lenght; i += 1) {
      const blobName = files[i];
      const blobService = azureStorage.createBlobService(
        azureStorageConfig.accountName,
        azureStorageConfig.accountKey
      );
      blobService.deleteBlobIfExists(
        azureStorageConfig.containerName,
        `${directoryPath}/${blobName}`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            results.push(blobName);
            resolve(`Successfully deleted: ${JSON.stringify(result)}`);
          }
        }
      );
    }
  });

module.exports = {
  uploadFileToBlob,
  uploadRawFileToBlob,
  CopyBlobFiles,
  deleteBlobFile,
  CopyVideoBlobFiles,
};

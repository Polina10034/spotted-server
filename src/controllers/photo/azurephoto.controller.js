/* eslint-disable max-len */
const {
  uploadFileToBlob, uploadRawFileToBlob, CopyBlobFiles, deleteBlobFile,
} = require('../../config/azurecontainer');

module.exports = {

  async imageUpload(req, res, next) {
    try {
      const encounterId = req.query.id;
      const image = await uploadFileToBlob(encounterId, req.file); // encounterId is a directory in the Azure container for encounter images
      return res.json(image);
    } catch (error) {
      next(error);
      return error;
    }
  },

  async imageDelete(req, res, next) {
    try {
      const { encounterId } = req.body;
      const { files } = req.body;
      const result = await deleteBlobFile(encounterId, files); // encounterId is a directory in the Azure container for encounter images
      return res.json(result);
    } catch (error) {
      next(error);
      return error;
    }
  },


  async rawImageUpload(req, res, next) {
    try {
      const encounterId = req.query.id;
      const image = await uploadRawFileToBlob(encounterId, req.file); // encounterId is a directory in the Azure container for encounter images
      return res.json(image);
    } catch (error) {
      next(error);
      return error;
    }
  },

  async rawImageCopy(req, res, next) {
    try {
      const encounterId = req.query.id;
      const status = await CopyBlobFiles(encounterId, req.urlArr); // encounterId is a directory in the Azure container for encounter images
      return res.json(status);
    } catch (error) {
      next(error);
      return error;
    }
  },
};

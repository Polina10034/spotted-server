const uploadFileToBlob = require("../../config/azurecontainer");

module.exports = {
  //Upload video file to azure
  async videoUpload(req, res, next) {
    try {
      // encounterId is a directory in the Azure container for encounter images
      const encounterId = req.query.id;
      const video = await uploadFileToBlob(encounterId, req.file);
      return res.json(video);
    } catch (error) {
      next(error);
      return error;
    }
  },
};

const uploadFileToBlob = require('../../config/azurecontainer');
 
module.exports = {

   async videoUpload (req, res, next){
    try {
        // console.log('id = ' + req.query.id);
        const encounterId = req.query.id;
        // let encounterId = req.body.encounterId || 'encounter_id'
        const video = await uploadFileToBlob(encounterId, req.file); // encounterId is a directory in the Azure container for encounter images
        return res.json(video);
    } catch (error) {
        next(error);
    }
}
}
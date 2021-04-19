import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as azurePhotoController from '../controllers/photo/azurephoto.controller';
import * as identifiedEncounterController from '../controllers/encounter/identifedEncounter.controller';
import * as boundingBoxController from '../controllers/photo/boundingBox.controller';
import * as photoController from '../controllers/photo/photo.controller';
import * as siteController from '../controllers/site/site.controller';
import * as videoController from '../controllers/video/video.controller';
import * as azureVideoController from '../controllers/video/azurevideo.controller';


const multer = require('multer');

const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

const router = express.Router();

// // TODO api loggedin  routes

router.get('/me', userController.profile);

router.post(
  '/changePassword',
  validate(userValidator.changePassword),
  userController.changePassword,
);

router.get('/getAllEncounters', encounterController.getAllEncounters);
router.get('/getEncounter', encounterController.getEncounter);
router.post('/addEncounter', encounterController.addEncounter);
router.put('/updateEncounter', encounterController.updateEncounter);
router.delete('/deleteEncounter', encounterController.deleteEncounter);

router.post('/uploadphoto', singleFileUpload.single('image'), azurePhotoController.imageUpload);
router.get('/getAllIdentifiedEncounters', identifiedEncounterController.getAllIdentifiedEncounters);
router.get('/getIdentifiedEncounter', identifiedEncounterController.getIdentifiedEncounter);
router.put('/updateIdentifiedEncounter', identifiedEncounterController.updateIdentifiedEncounter);
router.delete('/deleteIdentifiedEncounter', identifiedEncounterController.deleteIdentifiedEncounter);
router.post('/addIdentifiedEncounter', identifiedEncounterController.addIdentifiedEncounter);


router.post('/addBoundingBox', boundingBoxController.addBoundingBox);
router.get('/getBoundingBox', boundingBoxController.getBoundingBox);

router.post('/addPhoto', photoController.addPhoto);
router.get('/getAllPhotos', photoController.getAllPhotos);
router.get('/getEncounterPhotos', photoController.getEncounterPhotos);
router.get('/getIdntEncounterPhotos', photoController.getIdntEncounterPhotos);

router.get('/getPhoto', photoController.getPhoto);
router.put('/updatePhoto', photoController.updatePhoto);
router.delete('/deletePhoto', photoController.deletePhoto);

router.get('/getAllIsraeliSites', siteController.getAllIsraeliSites);

router.post('/addVideo', videoController.addVideo);
//router.get('/getAllVideos', videoController.getAllVideos);
router.get('/getEncounterVideos', videoController.getEncounterVideos);
router.get('/getIdntEncounterVideos', videoController.getIdntEncounterVideos);

//router.get('/getVideo', videoController.getVideo);
//router.put('/updateVideo', videoController.updateVideo);
//router.delete('/deleteVideo', videoController.deleteVideo);
router.post('/uploadvideo', singleFileUpload.single('video'), azureVideoController.videoUpload);


module.exports = router;

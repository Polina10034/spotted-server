import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as identifiedEncounterController from '../controllers/encounter/identifedEncounter.controller';
import * as siteController from '../controllers/site/site.controller';
import * as azurePhotoController from '../controllers/photo/azurephoto.controller';
import * as azureVideoController from '../controllers/video/azurevideo.controller';
import * as photoController from '../controllers/photo/photo.controller';
import * as firstSystemResults from '../controllers/systemResults/firstSystemResults.controller';
import * as videoController from '../controllers/video/video.controller';

const router = express.Router();

const multer = require('multer');

const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

// Public routes

router.post(
  '/login',
  validate(userValidator.login),
  userController.login,
);
router.post(
  '/register',
  validate(userValidator.register),
  userController.register,
);

router.get('/getAllEncounters', encounterController.getAllEncounters);
router.get('/getActiveEncounters', encounterController.getActiveEncounters);
router.post('/addEncounter', encounterController.addEncounter);
router.get('/getEncounter', encounterController.getEncounter);
router.put('/updateEncounter', encounterController.updateEncounter);

router.get('/getAllIdentifiedEncounters', identifiedEncounterController.getAllIdentifiedEncounters);
router.post('/addIdentifiedEncounter', identifiedEncounterController.addIdentifiedEncounter);
router.get('/getIdentifiedEncounter', identifiedEncounterController.getIdentifiedEncounter);
router.put('/updateIdentifiedEncounter', identifiedEncounterController.updateIdentifiedEncounter);

router.get('/getAllIsraeliSites', siteController.getAllIsraeliSites);

router.post('/uploadrawphoto', singleFileUpload.single('image'), azurePhotoController.rawImageUpload);
router.post('/uploadVideo', singleFileUpload.single('video'), azureVideoController.videoUpload);

router.post('/uploadphoto', singleFileUpload.single('image'), azurePhotoController.imageUpload);
router.delete('/deletephotofromBlob', azurePhotoController.imageDelete);

router.post('/addPhoto', photoController.addPhoto);
router.get('/getAllPhotos', photoController.getAllPhotos);
router.get('/getEncounterPhotos', photoController.getEncounterPhotos);
router.get('/getIdntEncounterPhotos', photoController.getIdntEncounterPhotos);

router.post('/addEncounterFirstSystemResults', firstSystemResults.addEncounterFirstSystemResults);
router.post('/addVideoFirstSystemResults', firstSystemResults.addVideoFirstSystemResults);

router.post('/addVideo', videoController.addVideo);
router.get('/getEncounterVideos', videoController.getEncounterVideos);


module.exports = router;

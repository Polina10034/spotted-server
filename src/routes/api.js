import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as azurePhotoController from '../controllers/photo/azurephoto.controller';
import * as identifiedEncounterController from '../controllers/encounter/identifedEncounter.controller';
import * as boundingBoxController from '../controllers/photo/boundingBox.controller';
import * as photoController from '../controllers/photo/photo.controller';


const multer = require('multer')
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

router.get('/getAllEncounters',encounterController.getAllEncounters);
router.get('/getEncounter',encounterController.getEncounter);
router.post('/addEncounter',encounterController.addEncounter);
router.put('/updateEncounter',encounterController.updateEncounter);
router.delete('/deleteEncounter',encounterController.deleteEncounter);

router.post('/uploadphoto', singleFileUpload.single('image'), azurePhotoController.imageUpload);
router.get('/getAllIdentifiedEncounters',identifiedEncounterController.getAllIdentifiedEncounters);
router.put('/updateIdentifiedEncounter',identifiedEncounterController.updateIdentifiedEncounter);
router.delete('/deleteIdentifiedEncounter',identifiedEncounterController.deleteIdentifiedEncounter);

router.post('/addBoundingBox',boundingBoxController.addBoundingBox);
router.get('/getBoundingBox',boundingBoxController.getBoundingBox);

router.post('/addPhoto',photoController.addPhoto);
router.get('/getAllPhotos',photoController.getAllPhotos);
router.get('/getPhoto',photoController.getPhoto);
router.put('/updatePhoto',photoController.updatePhoto);
router.delete('/deletePhoto',photoController.deletePhoto);


module.exports = router;

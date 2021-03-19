import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as identifiedEncounterController from '../controllers/encounter/identifedEncounter.controller';
import * as boundingBoxController from '../controllers/photo/boundingBox.controller';

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

router.get('/getAllIdentifiedEncounters',identifiedEncounterController.getAllIdentifiedEncounters);
router.put('/updateIdentifiedEncounter',identifiedEncounterController.updateIdentifiedEncounter);
router.delete('/deleteIdentifiedEncounter',identifiedEncounterController.deleteIdentifiedEncounter);

router.post('/addBoundingBox',boundingBoxController.addBoundingBox);
router.get('/getBoundingBox',boundingBoxController.getBoundingBox);





module.exports = router;

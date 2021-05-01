import express from 'express';
import * as userController from '../controllers/user/user.controller';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as identifiedEncounterController from '../controllers/encounter/identifedEncounter.controller';

const router = express.Router();

// Admin routes

router.get('/allUsers', userController.allUsers);

router.get('/getAllEncounters', encounterController.getAllEncounters);
router.get('/getEncounter', encounterController.getEncounter);
router.post('/addEncounter', encounterController.addEncounter);
router.put('/updateEncounter', encounterController.updateEncounter);
router.delete('/deleteEncounter', encounterController.deleteEncounter);

router.get('/getAllIdentifiedEncounters', identifiedEncounterController.getAllIdentifiedEncounters);
router.put('/updateIdentifiedEncounter', identifiedEncounterController.updateIdentifiedEncounter);
router.delete('/deleteIdentifiedEncounter', identifiedEncounterController.deleteIdentifiedEncounter);
router.get('/getIdentifiedEncounter', identifiedEncounterController.getIdentifiedEncounter);
router.post('/addIdentifiedEncounter', identifiedEncounterController.addIdentifiedEncounter);


// router.get('/userStatistic', userController.userStatistic);
// router.get('/encounterStatistic', encounterController.encounterStatistic);
// router.post('/addFirstSystemResultes',encounterController.addFirstSystemResultes);
// router.post('/addSecoundSystemResultes',encounterController.addSecoundSystemResultes);
// router.post('/addBoundingBox',encounterController.addBoundingBox);
// router.post('/addClassification',encounterController.addClassification);
// router.post('/addRecognized',encounterController.addRecognized);
// router.post('/addIdentified',encounterController.addIdentified);
// router.put('/updateClassification',ManualResultsController.updateClassification);
// router.put('/updateRecognized',ManualResultsController.updateRecognized);
// router.put('/updateIdentified',ManualResultsController.updateIdentified);

module.exports = router;

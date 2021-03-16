import express from 'express';
import * as userController from '../controllers/user/user.controller';
import * as encounterController from '../controllers/encounter/encounter.controller';

const router = express.Router();

// Admin routes

router.get('/allUsers', userController.allUsers);

// router.put('/updateEncounter',encounterController.updateEncounter);
// router.delete('/deleteEncounter',encounterController.deleteEncounter);

// router.get('/searchEncounter', encounterController.filterEncounter);
// router.put('/updateIdentifyEncounter',encounterController.updateIdentifyEncounter);

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

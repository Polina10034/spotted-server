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

module.exports = router;

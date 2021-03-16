import express from 'express';
import * as userController from '../controllers/user/user.controller';
import * as encounterController from '../controllers/encounter/encounter.controller';

const router = express.Router();

// Admin routes

router.get('/allUsers', userController.allUsers);

// router.put('/updateEncounter',encounterController.updateEncounter);
// router.delete('/deleteEncounter',encounterController.deleteEncounter);

module.exports = router;

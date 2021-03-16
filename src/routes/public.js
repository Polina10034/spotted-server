import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as encounterController from '../controllers/encounter/encounter.controller';

const router = express.Router();

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

router.get('/getAllEncounters',encounterController.getAllEncounters);
router.post('/addEncounter',encounterController.addEncounter);
router.get('/getEncounter',encounterController.getEncounter);

module.exports = router;

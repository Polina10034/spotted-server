/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import {
  IdentifiedEncounter, User, Photo, LifeStage,
} from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const moment = require('moment');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

export const getAllIdentifiedEncounters = async (req, res) => {
  try {
    // const page = req.params.page || 1;
    const identifiedEncounters = await IdentifiedEncounter.findAndCountAll({
      // order: [['UpdatedAt', 'DESC']],
    });
    return successResponse(req, res, { identifiedEncounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addIdentifiedEncounter = async (req, res) => {
  try {
    const {
      LifeStageID,
      Gender,
      isAlive,
      ProfilePicture,
    } = req.body;
    let payload = {};

    payload = {
      LifeStageID,
      Gender: Gender || 'unknown',
      isAlive,
      UpdateBy: req.user.id,
      ProfilePicture,
    };

    const newIdentifiedEncounter = await IdentifiedEncounter.create(payload);
    return successResponse(req, res, { newIdentifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdentifiedEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    const identifiedEncounter = await IdentifiedEncounter.findOne({
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
        {
          model: LifeStage,
          // attributes: ['firstName'],
        },
      ],
      where: { IdentifiedEncounterID: id },
    });
    return successResponse(req, res, { identifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateIdentifiedEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    await IdentifiedEncounter.update(
      {
        LifeStageID: req.body.LifeStageID,
        Gender: req.body.Sex,
        isAlive: req.body.isAlive === 'yes' ? 1 : 0,
        UpdateBy: req.body.UpdateBy,
        ProfilePicture: req.body.ProfilePicture,
        // TL: req.body.TL,
        // DL: req.body.DL,
        // DW: req.body.DW,
        // MaxDepth: req.body.MaxDepth,
        // Distance: req.body.Distance,
        // Temp: req.body.Temp,
        // Description: req.body.Description,
        // Link: req.body.Link,
        // Photographer: req.body.Photographer,

      },
      { where: { IdentifiedEncounterID: id } },
    );
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteIdentifiedEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    const identifiedEncounter = await IdentifiedEncounter.findOne({
      where: { IdentifiedEncounterID: id },
    });
    await identifiedEncounter.destroy();
    return successResponse(req, res, { identifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdntEncounterPhotos = async (req, res) => {
  try {
    const { individualids } = req.body;
    const identEncounters = await IdentifiedEncounter.findAll({
      where: { IdentifiedEncounterID: individualids },
    });
    return successResponse(req, res, { identEncounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdntEncountersPhotos = async (req, res) => {
  try {
    const { individualids } = req.body;
    const identEncounters = await IdentifiedEncounter.findAll({
      include: [
        {
          model: Photo,
          attributes: ['src', 'IdentifiedEncounterID', 'FirstSystemResultID', 'SecoundSystemResultID', 'PhotoID', 'EncounterID'],
        },
        {
          model: User,
          attributes: ['firstName'],
        },
        {
          model: LifeStage,
          attributes: ['Stage'],
        },
      ],
      where: { IdentifiedEncounterID: individualids },
    });
    return successResponse(req, res, { identEncounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdntEncounterPhotosbySides = async (req, res) => {
  const IdntEncountersCount = [];
  const sides = ['Right', 'Left', 'Top'];

  try {
    const RightPhotos = await IdentifiedEncounter.findAndCountAll({
      include: [
        {
          model: Photo,
          where: {
            RightSide: true,
            PathPhoto: {
              [Op.not]: null,
            },
          },
          attributes: ['src', 'RightSide', 'IdentifiedEncounterID'],
        },
      ],
    });
    IdntEncountersCount.push(RightPhotos.count);

    const LeftPhotos = await IdentifiedEncounter.findAndCountAll({
      include: [
        {
          model: Photo,
          where: {
            LeftSide: true,
            PathPhoto: {
              [Op.not]: null,
            },
          },
          attributes: ['src', 'LeftSide', 'IdentifiedEncounterID'],
        },
      ],
    });
    IdntEncountersCount.push(LeftPhotos.count);

    const TopPhotos = await IdentifiedEncounter.findAndCountAll({
      include: [
        {
          model: Photo,
          where: {
            TopSide: true,
            PathPhoto: {
              [Op.not]: null,
            },
          },
          attributes: ['src', 'TopSide', 'IdentifiedEncounterID'],
        },
      ],
    });
    IdntEncountersCount.push(TopPhotos.count);

    return successResponse(req, res, { IdntEncountersCount, sides });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdentEncountersperMonth = async (req, res) => {
  const encMonthData = [];
  const monthsString = [];
  const cuurMonth = moment().month();
  const currYear = moment().year();

  try {
    for (let i = 0; i < 12; i += 1) {
      const startMonth = moment([currYear - 1, cuurMonth, 1])
        .add(i, 'months')
        .toDate();
      const startMonthString = moment([currYear - 1, cuurMonth, 1])
        .add(i, 'months')
        .format('MMM');
      const endMonth = moment([currYear - 1, cuurMonth, 1])
        .add(i + 1, 'months')
        .toDate();

      const encounters = await IdentifiedEncounter.findAndCountAll({
        where: {
          CreatedAt: {
            [Op.gte]: startMonth,
            [Op.lt]: endMonth,
          },
        },
      });
      encMonthData.push(encounters.count);
      monthsString.push(startMonthString);
    }
    return successResponse(req, res, { encMonthData, monthsString });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

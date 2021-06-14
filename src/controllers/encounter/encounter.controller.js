/* eslint-disable no-await-in-loop */
import {
  Encounter, User, Site, ReportType,
} from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const moment = require('moment');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

export const getAllEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAndCountAll({
      include: [{ model: Site }],
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getActiveEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAndCountAll({
      include: [{ model: Site }],
      where: {
        IsActive: true,
        SiteID: {
          [Op.gt]: 0,
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getActiveEncountersperMonth = async (req, res) => {
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

      const encounters = await Encounter.findAndCountAll({
        where: {
          IsActive: true,
          EncounterDate: {
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

export const getUserEncounters = async (req, res) => {
  const { id } = req.user;
  try {
    const encounters = await Encounter.findAndCountAll({
      where: { ReportedBy: id, IsActive: true },
      // order: [['CreatedAt', 'DESC']],
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addEncounter = async (req, res) => {
  try {
    const {
      EncounterDate,
      SiteID,
      Email,
      SpottedCountReported,
      IsPregnant,
      Gender,
      TL,
      DL,
      DW,
      Distance,
      MaxDepth,
      Temp,
      Description,
      Link,
      Photographer,
    } = req.body;
    let payload = {};
    if (req.user) {
      const { id, email } = req.user;
      payload = {
        EncounterDate,
        ReporterEmail: email,
        SiteID,
        SpottedCountReported,
        Verified: false,
        MediaType: 1,
        ReportedBy: id,
        Gender,
        ReportTypeID: 1,
        IsPregnant: IsPregnant === 'Yes' ? 1 : 0,
        TL,
        DL,
        DW,
        Distance,
        MaxDepth,
        Temp,
        Description,
        Link,
        Photographer,
      };
    } else {
      payload = {
        EncounterDate,
        ReporterEmail: Email,
        SiteID,
        SpottedCountReported,
        Verified: false,
        MediaType: 1,
        ReportTypeID: 1,
        Gender,
        IsPregnant: IsPregnant === 'Yes' ? 1 : 0,
        TL,
        DL,
        DW,
        Distance,
        MaxDepth,
        Temp,
        Description,
        Link,
        Photographer,
      };
    }
    const newEncounter = await Encounter.create(payload);
    return successResponse(req, res, { newEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    const encounter = await Encounter.findOne({
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
        {
          model: ReportType,
        },
      ],
      where: { EncounterID: id },
    });
    return successResponse(req, res, { encounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const updateEncounterIsActive = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    // const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    await Encounter.update(
      {
        IsActive: isActive,
      },
      { where: { EncounterID: id } },
    );
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const updateEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    // const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    await Encounter.update(
      {
        EncounterDate: req.body.EncounterDate,
        ReporterEmail: req.body.ReporterEmail,
        SiteID: req.body.SiteID,
        SpottedCountReported: req.body.SpottedCountReported,
        SpottedCount: req.body.SpottedCount,
        Verified: req.body.Verified === 'yes' ? 1 : 0,
        MediaType: req.body.MediaType,
        ProfilePicture: req.body.ProfilePicture,
        OriginalID: req.body.OriginalID,
        IsPregnant: req.body.IsPregnant === 'yes' ? 1 : 0,
        Gender: req.body.Gender,
        UpdatedBy: req.user ? req.user.id : null,
        MaxDepth: req.body.MaxDepth,
        Distance: req.body.Distance,
        Temp: req.body.Temp,
        Description: req.body.Description,
        Link: req.body.Link,
        UpdateBy: req.user ? req.user.id : null,
        TL: req.body.TL,
        DL: req.body.DL,
        DW: req.body.DW,
      },
      { where: { EncounterID: id } },
    );
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    await encounter.destroy();
    return successResponse(req, res, { encounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

import { Encounter } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const getAllEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAndCountAll({
      order: [['CreatedAt', 'DESC']],
    //   offset: (page - 1) * limit,
    //   limit,
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addEncounter = async (req, res) => {
  try {
    const {
      EncounterDate, SiteID, Email, SpottedCountReported, IsPregnant, Gender,
    } = req.body;
    let payload = {};
    if (req.user) {
      const { userId } = req.user;
      payload = {
        EncounterDate,
        ReporterEmail: Email,
        SiteID,
        SpottedCountReported,
        Verified: false,
        MediaType: 1,
        ReportedBy: userId,
        Gender,
        IsPregnant: IsPregnant === 'Yes' ? 1 : 0,
      };
    } else {
      payload = {
        EncounterDate,
        ReporterEmail: Email,
        SiteID,
        SpottedCountReported,
        Verified: false,
        MediaType: 1,
        Gender,
        IsPregnant: IsPregnant === 'Yes' ? 1 : 0,
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
    const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    return successResponse(req, res, { encounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    // const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    await Encounter
      .update({
        EncounterDate: req.body.EncounterDate,
        ReporterEmail: req.body.ReporterEmail,
        SiteID: req.body.SiteID,
        SpottedCountReported: req.body.SpottedCountReported,
        Verified: req.body.Verified === 'yes' ? 1 : 0,
        MediaType: req.body.MediaType,
        ProfilePicture: req.body.url,
      }, { where: { EncounterID: id } });
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

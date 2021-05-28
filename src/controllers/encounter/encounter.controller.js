import { Encounter, User } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const getAllEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAndCountAll({});
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getActiveEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAndCountAll({
      where: { IsActive: true },
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getUserEncounters = async (req, res) => {
  const { id } = req.user;
  try {
    const encounters = await Encounter.findAndCountAll({
      where: { ReportedBy: id, IsActive: true },
      order: [['CreatedAt', 'DESC']],
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
          // where: {
          // },
          attributes: ['firstName'],

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
    await Encounter
      .update({
        IsActive: isActive,
      }, { where: { EncounterID: id } });
    return successResponse(req, res, {});
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
        SpottedCount: req.body.SpottedCount,
        Verified: req.body.Verified === 'yes' ? 1 : 0,
        MediaType: req.body.MediaType,
        ProfilePicture: req.body.ProfilePicture,
        OriginalID: req.body.OriginalID,
        IsPregnant: req.body.IsPregnant === 'yes' ? 1 : 0,
        Gender: req.body.Gender,
        // ReportTypeID: req.body.ReportTypeID,
        UpdatedBy: req.user ? req.user.id : null,
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

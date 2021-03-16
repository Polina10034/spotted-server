import { Encounter } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAllEncounters = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const encounters = await Encounter.findAndCountAll({
    //   order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { encounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addEncounter = async (req, res) => {
  try {
    const {
      EncounterDate, SiteID, Email, SpottedCountReported,
    } = req.body;
        var payload = {};
    if(req.user){
        const {userId} = req.user;
        payload = {
            EncounterDate: EncounterDate,
            ReporterEmail:Email,
            SiteID: SiteID,
            SpottedCountReported:SpottedCountReported,
            Verified: false,
            MediaType: 1,
            ReportedBy:userId
        };
    }else{
        payload = {
            EncounterDate: EncounterDate,
            ReporterEmail:Email,
            SiteID: SiteID,
            SpottedCountReported:SpottedCountReported,
            Verified: false,
            MediaType: 1,
        };
    }
    const newEncounter = await Encounter.create(payload);
    return successResponse(req, res, {newEncounter});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getEncounter = async (req, res) => {
  try {
    const { encounterId } = req.body;
    const encounter = await Encounter.findOne({ where: { EncounterID: encounterId } });
    return successResponse(req, res, { encounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateEncounter = async (req, res) => {
  try {
    const id = req.query.id;
    const encounter = await Encounter.findOne({ where: { EncounterID: id } });
    await Encounter
    .update({ 
        EncounterDate: req.body.EncounterDate,
        ReporterEmail: req.body.ReporterEmail,
        SiteID: req.body.SiteID,
        SpottedCountReported: req.body.SpottedCountReported,
        Verified: req.body.Verified,
        MediaType: req.body.MediaType,  
        }, { where: { EncounterID: id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteEncounter = async (req, res) => {
    try {
      const id = req.query.id;
      const encounter = await Encounter.findOne({ where: { EncounterID: id } });
      await encounter.destroy();
      return successResponse(req, res, {encounter});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

import { IdentifiedEncounter } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAllIdentifiedEncounters = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const identifiedEncounters = await IdentifiedEncounter.findAndCountAll({
       order: [['UpdatedAt', 'DESC']],
    });
    return successResponse(req, res, { identifiedEncounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addIdentifiedEncounter = async (req, res) => {
  try {
    const {
      Photographer, ReportTypeID, LifeStageID, TL, DL, DW, MaxDepth, Distance, Temp, Description, Comments, Link, 
    } = req.body;
        var payload = {};
    if(req.user){
        const {userId} = req.user;
        payload = {
            Photographer: Photographer,
            ReporterLifeStageID: LifeStageID,
            ReportTypeID: ReportTypeID,
            Sex: false,
            isAlive: false,
            TL: TL,
            DL: DL,
            DW: DW,
            MaxDepth: MaxDepth,
            Distance: Distance,
            Temp: Temp,
            Description: Description,
            Comments: Comments,
            SpeciesID: 1,
            Link: Link,
            UpdateBy:userId

        };
    }else{
        payload = {
            Photographer: Photographer,
            ReporterLifeStageID:LifeStageID,
            ReportTypeID: ReportTypeID,
            Sex: false,
            isAlive: false,
            TL: TL,
            DL: DL,
            DW: DW,
            MaxDepth: MaxDepth,
            Distance: Distance,
            Temp: Temp,
            Description: Description,
            Comments: Comments,
            SpeciesID: 1,
            Link: Link,
        };
    }
    const newIdentifiedEncounter = await IdentifiedEncounter.create(payload);
    return successResponse(req, res, {newIdentifiedEncounter});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getIdentifiedEncounter = async (req, res) => {
  try {
    // const { identifiedEncounterId } = req.body;
    const id = req.query.id;
    const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
    return successResponse(req, res, { identifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateIdentifiedEncounter = async (req, res) => {
  try {
    const id = req.query.id;
    const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
    await IdentifiedEncounter
    .update({ 
        Photographer: req.body.Photographer,
        ReporterLifeStageID: req.body.LifeStageID,
        ReportTypeID: req.body.ReportTypeID,
        Sex: req.body.Sex,
        isAlive: req.body.isAlive,
        TL: req.body.TL,
        DL: req.body.DL,
        DW: req.body.DW,
        MaxDepth: req.body.MaxDepth,
        Distance: req.body.Distance,
        Temp: req.body.Temp,
        Description: req.body.Description,
        Comments: req.body.Comments,
        SpeciesID: req.body.SpeciesID,
        Link: req.body.Link,
        UpdateBy: req.body.UpdateBy,
        }, { where: { IdentifiedEncounterID: id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteIdentifiedEncounter = async (req, res) => {
    try {
      const id = req.query.id;
      const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
      await identifiedEncounter.destroy();
      return successResponse(req, res, {identifiedEncounter});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

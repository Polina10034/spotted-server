/* eslint-disable max-len */
import { IdentifiedEncounter } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const getAllIdentifiedEncounters = async (req, res) => {
  try {
    // const page = req.params.page || 1;
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
      Photographer, ReportTypeID, EncounterID, LifeStageID, TL, DL, DW, MaxDepth, Distance, Temp, Description, Link, Sex, isAlive, ProfilePicture,
    } = req.body;
    let payload = {};
    const { userId } = req.user;
    payload = {
      Photographer,
      ReportTypeID,
      LifeStageID,
      EncounterID,
      Sex,
      isAlive: isAlive === 'yes' ? 1 : 0,
      TL,
      DL,
      DW,
      MaxDepth,
      Distance,
      Temp,
      Description,
      Link,
      UpdateBy: userId,
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
    // const { identifiedEncounterId } = req.body;
    const { id } = req.query;
    const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
    return successResponse(req, res, { identifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateIdentifiedEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    // const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
    await IdentifiedEncounter
      .update({
        Photographer: req.body.Photographer,
        LifeStageID: req.body.LifeStageID,
        ReportTypeID: req.body.ReportTypeID,
        Sex: req.body.Sex,
        isAlive: req.body.isAlive === 'yes' ? 1 : 0,
        TL: req.body.TL,
        DL: req.body.DL,
        DW: req.body.DW,
        MaxDepth: req.body.MaxDepth,
        Distance: req.body.Distance,
        Temp: req.body.Temp,
        Description: req.body.Description,
        SpeciesID: req.body.SpeciesID,
        Link: req.body.Link,
        UpdateBy: req.body.UpdateBy,
        ProfilePicture: req.body.ProfilePicture,
      }, { where: { IdentifiedEncounterID: id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteIdentifiedEncounter = async (req, res) => {
  try {
    const { id } = req.query;
    const identifiedEncounter = await IdentifiedEncounter.findOne({ where: { IdentifiedEncounterID: id } });
    await identifiedEncounter.destroy();
    return successResponse(req, res, { identifiedEncounter });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdntEncounterPhotos = async (req, res) => {
  try {
    const { individualids } = req.body;
    const identEncounters = await IdentifiedEncounter.findAll({ where: { IdentifiedEncounterID: individualids } });
    return successResponse(req, res, { identEncounters });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

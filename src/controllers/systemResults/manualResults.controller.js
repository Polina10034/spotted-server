/* eslint-disable import/prefer-default-export */
import { ManualResult } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

//Add researcher manual confirmation of individual detection  
export const addManualResult = async (req, res) => {
  let payload = {};
  try {
    const { userId } = req.user;
    const { EncounterID, IndividualID, url } = req.body;
    payload = {
      EncounterID,
      IdentifiedEncounterID: IndividualID,
      VerfiedBy: userId,
      PhotoPath: url,
    };
    const newResult = await ManualResult.create(payload);
    return successResponse(req, res, { newResult });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

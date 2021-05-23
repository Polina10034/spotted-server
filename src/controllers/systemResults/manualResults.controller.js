/* eslint-disable import/prefer-default-export */
import { ManualResult } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addManualResult = async (req, res) => {
  console.log(req.user);
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

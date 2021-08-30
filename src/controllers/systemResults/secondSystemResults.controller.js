/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
import { SecoundSystemResult, Photo } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addSecondSystemResult = async (req, res) => {
  try {
    const { ResultsIds, url } = req.body;
    const payload = {
      PhotoPath: url,
      IsRecognized: ResultsIds.length > 0 ? 1 : 0,
      Results: ResultsIds.toString(),
    };
    const newResult = await SecoundSystemResult.create(payload);
    return successResponse(req, res, { newResult });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

//Add bulk of individual detection results 
export const addSecondSystemResults = async (req, res) => {
  const secondSystemResults = [];
  const updatePhotosResults = [];
  let newResult = {};
  let photoResult = {};
  try {
    const { Results } = req.body;
    const { length } = Results;
    for (let i = 0; i < length; i += 1) {
      const { Similar_individuals, src } = Results[i];
      const individuals_ID = Similar_individuals.map(arrayItem => arrayItem.id);
      const payload = {
        PhotoPath: src,
        IsRecognized: Similar_individuals.length > 0 ? 1 : 0,
        Results: individuals_ID.toString(),
      };
      newResult = await SecoundSystemResult.create(payload);
      secondSystemResults.push(newResult);

      if (newResult.SecoundSystemResultID) {
        const photoPayload = {
          SecoundSystemResultID: newResult.SecoundSystemResultID,
        };
        photoResult = await Photo.update(photoPayload, { where: { PathPhoto: src } });
        updatePhotosResults.push(photoResult);
      }
    }
    return successResponse(req, res, { secondSystemResults, updatePhotosResults });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

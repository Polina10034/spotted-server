/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
import { SecoundSystemResult, Photo } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

// const { deleteBlobFile } = require('../../config/azurecontainer');

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

// export const addSecondSystemResults = async (req, res) => {
//   const secondSystemResults = [];
//   const updatePhotosResults = [];
//   let newResult = {};
//   let photoResult = {};
//   try {
//     const { Results } = req.body;
//     console.log(Results.length);
//     const { length } = Results;
//     for (let i = 0; i < length; i += 1) {
//       const lenghtIn = Results[i].length;

//       for (let j = 0; j < lenghtIn; j += 1) {
//         const { individuals_ID, src } = Results[i][j];

//         const payload = {
//           PhotoPath: src,
//           IsRecognized: individuals_ID.length > 0 ? 1 : 0,
//           Results: individuals_ID.toString(),
//         };
//         newResult = await SecoundSystemResult.create(payload);
//         secondSystemResults.push(newResult);

//         if (newResult.SecoundSystemResultID) {
//           const photoPayload = {
//             SecoundSystemResultID: newResult.SecoundSystemResultID,
//           };
//           photoResult = await Photo.update(photoPayload, { where: { PathPhoto: src } });
//           updatePhotosResults.push(photoResult);
//         }
//       }
//     }
//     return successResponse(req, res, { secondSystemResults, updatePhotosResults });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

export const addSecondSystemResults = async (req, res) => {
  const secondSystemResults = [];
  const updatePhotosResults = [];
  let newResult = {};
  let photoResult = {};
  try {
    const { Results } = req.body;
    console.log(Results.length);
    const { length } = Results;
    for (let i = 0; i < length; i += 1) {
      // for (let j = 0; j < lenghtIn; j += 1) {
      const { Similar_individuals, src } = Results[i];
      // const lenghtResults = Similar_individuals.length;
      const individuals_ID = Similar_individuals.map(arrayItem => arrayItem.id);
      // for (let j = 0; j < lenghtResults; j += 1)
      console.log(individuals_ID);
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
      // }
    }
    return successResponse(req, res, { secondSystemResults, updatePhotosResults });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

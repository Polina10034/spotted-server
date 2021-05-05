/* eslint-disable no-await-in-loop */
import { FirstSystemResult, BoundingBox, Photo } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const { deleteBlobFile } = require('../../config/azurecontainer');

export const addFirstSystemResult = async (req, res) => {
  try {
    let newBoundingBox = {};
    const {
      confidences, encounterId, count, filename, x, y, w, h,
    } = req.body;
    let payload = {};
    payload = {
      EncounterID: encounterId,
      FileName: filename,
      Confidence: confidences,
      Count: count,
      IsIdentified: count > 0 ? 1 : 0,
    };
    const newRow = await FirstSystemResult.create(payload);
    if (newRow.FirstSystemResultID) {
      const payloadbox = {
        Confidence: confidences,
        FirstSystemResultID: newRow.FirstSystemResultID,
        PhotoID: filename,
        Left_x: x,
        Top_y: y,
        Width: w,
        Height: h,
      };
      newBoundingBox = await BoundingBox.create(payloadbox);
    }

    return successResponse(req, res, { newRow, newBoundingBox });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addEncounterFirstSystemResults = async (req, res) => {
  let newRow = {};
  const firstSystemResultsRes = [];
  console.log(req.body);

  try {
    const { encounterId } = req.body;
    const { results } = req.body;
    const { photosBlobData } = req.body;
    const boundingBoxPayload = [];
    const photosPayload = [];
    console.log(photosBlobData);
    const lenght = results.length;
    const deletePhotos = [];
    for (let i = 0; i < lenght; i += 1) {
      const { data, counts, filename } = results[i];

      let payload = {};
      payload = {
        EncounterID: encounterId,
        FileName: filename,
        Count: counts,
        IsIdentified: counts > 0 ? 1 : 0,
      };

      newRow = await FirstSystemResult.create(payload);
      firstSystemResultsRes.push(newRow);
      if (data !== undefined && newRow.FirstSystemResultID) {
        const blobPhoto = photosBlobData.find(item => item.filename === filename);
        let j = 0;
        while (data[j] !== undefined) {
          const payloadbox = {
            Confidence: data[j][0].confidences,
            FirstSystemResultID: newRow.FirstSystemResultID,
            PhotoID: filename,
            Left_x: data[j][0].x,
            Top_y: data[j][0].y,
            Width: data[j][0].w,
            Height: data[j][0].h,
          };
          boundingBoxPayload.push(payloadbox);
          j += 1;
        }
        const payloadPhoto = {
          EncounterID: encounterId,
          CountPerImage: counts,
          RightSide: false,
          LeftSide: false,
          FrontSide: false,
          TopSide: false,
          FirstSystemResultID: newRow.FirstSystemResultID,
          src: blobPhoto.url,
        };
        photosPayload.push(payloadPhoto);
      } else {
        deletePhotos.push(filename);
      }
    }
    const deleteResult = await deleteBlobFile(encounterId, deletePhotos);
    const photosResults = await Photo.bulkCreate(photosPayload);
    const newBoundingBox = await BoundingBox.bulkCreate(boundingBoxPayload);
    return successResponse(req, res, {
      firstSystemResultsRes, newBoundingBox, photosResults, deleteResult,
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getEncounterFirstSystemResults = async (req, res) => {
  try {
    const { id } = req.body;
    const firstSystemResults = await FirstSystemResult
      .findAndCountAll({ where: { EncounterID: id } });
    return successResponse(req, res, { firstSystemResults });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getFirstSystemResult = async (req, res) => {
  try {
    const { id } = req.body;
    const firstSystemResult = await FirstSystemResult
      .findOne({ where: { FirstSystemResultID: id } });
    return successResponse(req, res, { firstSystemResult });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAllFirstSystemResult = async (req, res) => {
  try {
    const firstSystemResults = await FirstSystemResult
      .findAndCountAll({
        order: [['CreatedAt', 'DESC']],
      //   offset: (page - 1) * limit,
      //   limit,
      });
    return successResponse(req, res, { firstSystemResults });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

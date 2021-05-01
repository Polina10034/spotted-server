import { BoundingBox } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addBoundingBox = async (req, res) => {
  try {
    const {
      confidences, photoId, x, y, w, h, resultsID,
    } = req.body;
    let payload = {};
    payload = {
      Confidence: confidences,
      FirstSystemResultsID: resultsID,
      PhotoID: photoId,
      Left_x: x,
      Top_y: y,
      Width: w,
      Height: h,
    };
    const newBoundingBox = await BoundingBox.create(payload);
    return successResponse(req, res, { newBoundingBox });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getBoundingBox = async (req, res) => {
  try {
    const { boundingBoxId } = req.body;
    const boundingBox = await BoundingBox.findOne({ where: { BoundingBoxID: boundingBoxId } });
    return successResponse(req, res, { boundingBox });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

import { BoundingBox } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

//Add (create) new bounding box of a photo detected by species detection component
export const addBoundingBox = async (req, res) => {
  try {
    const { confidences, photoId, x, y, w, h, resultsID } = req.body;
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

//Get single photo bounding box
export const getBoundingBox = async (req, res) => {
  try {
    const { boundingBoxId } = req.body;
    const boundingBox = await BoundingBox.findOne({
      where: { BoundingBoxID: boundingBoxId },
    });
    return successResponse(req, res, { boundingBox });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

//Get photos bounding boxes
export const getPhotosBoundingBoxes = async (req, res) => {
  try {
    const { photosId } = req.body;
    const boundingBoxes = await BoundingBox.findAll({
      where: { PhotoID: photosId },
    });
    return successResponse(req, res, { boundingBoxes });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


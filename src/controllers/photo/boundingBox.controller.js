import { BoundingBox } from '../../models';
import { successResponse, errorResponse} from '../../helpers';

export const addBoundingBox = async (req, res) => {
  try {
    const {
        PhotoID, Left_x, Top_y, Width, Height, Confidence
    } = req.body;
        var payload = {};
        payload = {
            PhotoID: PhotoID,
            Left_x:Left_x,
            Top_y: Top_y,
            Width:Width,
            Height: Height,
            Confidence: Confidence
        };
    const newBoundingBox = await BoundingBox.create(payload);
    return successResponse(req, res, {newBoundingBox});
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



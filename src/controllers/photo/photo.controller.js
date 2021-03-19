import { Photo } from '../../models';
import { successResponse, errorResponse} from '../../helpers';

export const getAllPhotos = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const photos = await Photo.findAndCountAll({
    //   order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addPhoto = async (req, res) => {
  try {
    const {
      id, count, url
  } = req.body;
      var payload = {};
      payload = {
          EncounterID: id,
          CountPerImage:count,
          RightSide: false,
          LeftSide: false,
          FrontSide: false,
          TopSide: false,
          PathPhoto: url     
      };
  const newPhoto = await Photo.create(payload);
  return successResponse(req, res, {newPhoto});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getPhoto = async (req, res) => {
  try {
    const { photoId } = req.body;
    const photo = await Photo.findOne({ where: { PhotoID: photoId } });
    return successResponse(req, res, { photo });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const id = req.query.id;
    const photo = await Photo.findOne({ where: { PhotoID: id } });
    await Photo
    .update({ 
      EncounterID: req.body.EncounterID,
      CountPerImage: req.body.CountPerImage,
      UploadDate: req.body.UploadDate,
      RightSide: req.body.RightSide,
      LeftSide: req.body.LeftSide,
      FrontSide: req.body.FrontSide,  
      TopSide: req.body.TopSide,
      FirstSystemResultID: req.body.FirstSystemResultID,
      SecoundSystemResultID: req.body.SecoundSystemResultID,
      EncounterGroupID: req.body.EncounterGroupID,
      PathPhoto: req.body.PathPhoto,
        }, { where: { PhotoID: id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deletePhoto = async (req, res) => {
    try {
      const id = req.query.id;
      const photo = await Photo.findOne({ where: { PhotoID: id } });
      await photo.destroy();
      return successResponse(req, res, {photo});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};






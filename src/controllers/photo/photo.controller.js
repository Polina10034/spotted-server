import { Photo } from '../../models';
import { successResponse, errorResponse} from '../../helpers';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

export const getAllPhotos = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const photos = await Photo.findAndCountAll({
    //   order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getEncounterPhotos = async (req, res) => {
  try {
    const id = req.query.id;
    const photos = await Photo.findAll({
      where: { 
        EncounterID: id,
        PathPhoto: {
        [Op.not]: null, // Like: sellDate IS NOT NULL
    },
    },
      attributes: ['src']
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getIdntEncounterPhotos = async (req, res) => {
  try {
    const id = req.query.id;
    const photos = await Photo.findAll({
      where: { 
        IdentifiedID: id,
        PathPhoto: {
        [Op.not]: null, // Like: sellDate IS NOT NULL
    },
    },
      attributes: ['src']
    });
    // const photos = await Photo.findAndCountAll({
    //   where: { EncounterID: id },
    //   attributes: ['PathPhoto'],
    //   // include: [ { model: UserRole, as: 'Role', include: [{model: Permission, as: 'Permissions', attributes: {include:['id', 'name'], exclude:'UserRolePermission' } }] } ]
   
    // });
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






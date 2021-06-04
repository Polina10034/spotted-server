/* eslint-disable no-await-in-loop */
import { Photo, Encounter, Site } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAndCountAll({
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getAllDetectPhotosCount = async (req, res) => {
  try {
    const photos = await Photo.findAndCountAll({
      where: {
        IdentifiedEncounterID: {
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
    });
    const { count } = photos;
    return successResponse(req, res, { count });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getEncounterPhotos = async (req, res) => {
  try {
    const { id } = req.query;
    const photos = await Photo.findAll({
      where: {
        EncounterID: id,
        PathPhoto: {
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
      attributes: [
        'src',
        'PhotoID',
        'FirstSystemResultID',
        'LeftSide',
        'RightSide',
        // 'FrontSide',
        'TopSide',
        // 'BackSide',
      ],
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getIdntEncounterPhotos = async (req, res) => {
  try {
    const { id } = req.query;
    const photos = await Photo.findAll({
      where: {
        IdentifiedEncounterID: id,
        PathPhoto: {
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
      attributes: ['src'],
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getIdntEncounterPhotosSites = async (req, res) => {
  try {
    const { id } = req.query;
    const photos = await Photo.findAndCountAll({
      include: [
        {
          model: Encounter,
          where: {
            IsActive: true,
            // PathPhoto: {
            //   [Op.not]: null, // Like: sellDate IS NOT NULL
            // },
          },
          attributes: ['SiteID', 'EncounterID', 'EncounterDate'],
          include: {
            model: Site,
          },
          group: ['EncounterID'],

        },

      ],
      where: {
        IdentifiedEncounterID: id,
        // EncounterID,
        PathPhoto: {
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
      attributes: ['src', 'IdentifiedEncounterID', 'EncounterID'],
    });
    return successResponse(req, res, { photos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const updatePhotoSide = async (req, res) => {
  try {
    const { src } = req.body;
    const updateStatus = await Photo
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
        // PathPhoto: req.body.PathPhoto,
      }, { where: { PathPhoto: src } });
    return successResponse(req, res, { updateStatus });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const addPhoto = async (req, res) => {
  try {
    const {
      id, count, url,
    } = req.body;
    let payload = {};
    payload = {
      EncounterID: id,
      CountPerImage: count,
      RightSide: false,
      LeftSide: false,
      FrontSide: false,
      TopSide: false,
      PathPhoto: url,
    };
    const newPhoto = await Photo.create(payload);
    return successResponse(req, res, { newPhoto });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getPhotoByUrl = async (req, res) => {
  try {
    const { PhotoPath } = req.body;
    const photo = await Photo.findOne({ where: { src: PhotoPath } });
    return successResponse(req, res, { photo });
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
    const { id } = req.query;
    // const photo = await Photo.findOne({ where: { PhotoID: id } });
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
export const updateDBidentPhoto = async (req, res) => {
  try {
    const { id, url } = req.body;
    // const photo = await Photo.findOne({ where: { PhotoID: id } });
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
        // PathPhoto: url,
        IdentifiedEncounterID: id,
      }, { where: { PathPhoto: url } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.query;
    const photo = await Photo.findOne({ where: { PhotoID: id } });
    await photo.destroy();
    return successResponse(req, res, { photo });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getPhotosbySides = async (req, res) => {
  const PhotosData = [];
  const sides = ['Right', 'Left', 'Top'];
  try {
    const RightPhotos = await Photo.findAndCountAll({
      where: {
        RightSide: true,
        PathPhoto: {
          [Op.not]: null,
        },
      },
      attributes: ['src', 'RightSide'],
    });
    PhotosData.push(RightPhotos.count);
    const LeftPhotos = await Photo.findAndCountAll({
      where: {
        LeftSide: true,
        PathPhoto: {
          [Op.not]: null,
        },
      },
      attributes: ['src', 'LeftSide'],
    });
    PhotosData.push(LeftPhotos.count);

    const TopPhotos = await Photo.findAndCountAll({
      where: {
        TopSide: true,
        PathPhoto: {
          [Op.not]: null,
        },
      },
      attributes: ['src', 'TopSide'],
    });
    PhotosData.push(TopPhotos.count);

    return successResponse(req, res, { PhotosData, sides });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

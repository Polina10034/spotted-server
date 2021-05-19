import { Video } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

// export const getAllVedio = async (req, res) => {
//   try {
//     const Vedio = await Photo.findAndCountAll({
//     //   order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
//     });
//     return successResponse(req, res, { vedio });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

export const getEncounterVideos = async (req, res) => {
  try {
    const { id } = req.query;
    const videos = await Video.findAll({
      where: {
        EncounterID: id,
        VideoPath: {
          [Op.not]: null,
        },
      },
    });
    return successResponse(req, res, { videos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const getIdntEncounterVideos = async (req, res) => {
  try {
    const { id } = req.query;
    const videos = await Video.findAll({
      where: {
        EncounterID: id,
        VideoPath: {
          [Op.not]: null, // Like: sellDate IS NOT NULL
        },
      },
      attributes: ['src'],
    });
    return successResponse(req, res, { videos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addVideo = async (req, res) => {
  try {
    const {
      id, fileName,
    } = req.body;
    let payload = {};
    payload = {
      EncounterID: id,
      VideoPath: `${process.env.AZURE_STORAGE_URL}/video/${fileName}`,
    };
    const newVideo = await Video.create(payload);
    return successResponse(req, res, { newVideo });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// export const getPhoto = async (req, res) => {
//   try {
//     const { photoId } = req.body;
//     const photo = await Photo.findOne({ where: { PhotoID: photoId } });
//     return successResponse(req, res, { photo });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

// export const updatePhoto = async (req, res) => {
//   try {
//     const { id } = req.query;
//     // const photo = await Photo.findOne({ where: { PhotoID: id } });
//     await Photo
//       .update({
//         EncounterID: req.body.EncounterID,
//         CountPerImage: req.body.CountPerImage,
//         UploadDate: req.body.UploadDate,
//         RightSide: req.body.RightSide,
//         LeftSide: req.body.LeftSide,
//         FrontSide: req.body.FrontSide,
//         TopSide: req.body.TopSide,
//         FirstSystemResultID: req.body.FirstSystemResultID,
//         SecoundSystemResultID: req.body.SecoundSystemResultID,
//         EncounterGroupID: req.body.EncounterGroupID,
//         PathPhoto: req.body.PathPhoto,
//       }, { where: { PhotoID: id } });
//     return successResponse(req, res, {});
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.query;
    const status = await Video.findOne({ where: { VideoID: id } });
    await status.destroy();
    return successResponse(req, res, { status });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

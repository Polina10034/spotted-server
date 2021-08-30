import { Video } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

export const getEncounterVideos = async (req, res) => {
  try {
    const limit = 1;
    const { id } = req.query;
    const video = await Video.findAll({
      where: {
        EncounterID: id,
        VideoPath: {
          [Op.not]: null,
        },
      },
      limit,
    });
    return successResponse(req, res, { video });
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
          [Op.not]: null, 
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
      VideoPath: `${process.env.AZURE_STORAGE_URL}/${process.env.AZURE_C4_NAME}/${fileName}`,
    };
    const newVideo = await Video.create(payload);
    return successResponse(req, res, { newVideo });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


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

/* eslint-disable import/prefer-default-export */
import { LifeStage, MediaType } from '../../models';

import { successResponse, errorResponse } from '../../helpers';

export const getAllLifeStage = async (req, res) => {
  try {
    const lifeStage = await LifeStage.findAndCountAll({});
    return successResponse(req, res, { lifeStage });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const getMediaTypes = async (req, res) => {
  try {
    const MediaTypes = await MediaType.findAndCountAll({});
    return successResponse(req, res, { MediaTypes });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

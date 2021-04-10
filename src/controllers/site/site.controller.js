import { Site } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

// eslint-disable-next-line import/prefer-default-export
export const getAllIsraeliSites = async (req, res) => {
  try {
    const sites = await Site.findAll({ where: { Country: 'Israel' } });
    return successResponse(req, res, { sites });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

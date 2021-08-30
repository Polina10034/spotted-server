const Joi = require("joi");

//User id data validation
export const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

//Password change data validation
export const changePassword = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

//User registration data validation
export const register = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

//User login data validation
export const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

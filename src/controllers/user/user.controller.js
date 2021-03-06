import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User, Encounter } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";

export const allUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll({});
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

//Get number of user reported encounters
export const allUsersEncounters = async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      include: [
        {
          model: Encounter,
          where: {
            IsActive: true,
          },
          attributes: ["EncounterID"],
        },
      ],
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

//Get user data by id
export const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const setUserAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.update({ isAdmin: 1 }, { where: { email } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.update(
      { firstName, lastName, email },
      { where: { id: userId } }
    );
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.scope("withSecretColumns").findOne({
      where: { email },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const payload = {
      email,
      firstName,
      lastName,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
    };

    const newUser = await User.create(payload);
    newUser.password = undefined;
    return successResponse(req, res, { newUser });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.scope("withSecretColumns").findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error("Incorrect Email Id/Password");
    }
    const reqPass = crypto
      .createHash("md5")
      .update(req.body.password || "")
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Incorrect Email Id/Password");
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.scope("withSecretColumns").findOne({
      where: { id: userId },
    });

    const reqPass = crypto
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Old password is incorrect");
    }

    const newPass = crypto
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");

    await User.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

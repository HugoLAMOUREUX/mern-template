const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const COOKIE_MAX_AGE = 86_400_000;
const JWT_MAX_AGE = "1d";

const getUsers = async (req, res, next) => {
  try {
    query = {};
    if (req.params.id) query._id = req.params.id.toString();

    const users = await UserModel.find(query);
    res.status(200).send({ data: { users } });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: "SERVER_ERROR" });
  }
};

const register = async (req, res) => {
  try {
    let { password, firstName, lastName, email } = req.body;

    if (!password || !firstName || !lastName || !email)
      return res.status(400).send({
        user: null,
        code: "EMAIL_FULLNAME_OR_PASSWORD_REQUIRED",
      });

    email = email.trim().toLowerCase();

    const userExists = await UserModel.findOne({ email: email });

    if (userExists) return res.status(400).send({ user: null, code: "USER_ALREADY_REGISTERED" });

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = jwt.sign({ _id: user._id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    const cookieOptions = {
      maxAge: COOKIE_MAX_AGE,
      secure: config.ENVIRONMENT === "development" ? false : true,
      httpOnly: true,
      sameSite: config.ENVIRONMENT === "development" ? "Lax" : "Strict",
    };
    res.cookie("jwt", token, cookieOptions);

    return res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: "SERVER_ERROR" });
  }
};

const login = async (req, res) => {
  let { password, email } = req.body;
  email = (email || "").trim().toLowerCase();

  if (!email || !password) return res.status(400).send({ code: "EMAIL_AND_PASSWORD_REQUIRED" });

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(401).send({ code: "USER_NOT_EXISTS" });

    const match = config.ENVIRONMENT === "development" || (await user.comparePassword(password));
    if (!match) return res.status(401).send({ code: "PASSWORDS_NOT_MATCH" });

    user.set({ lastLoginAt: Date.now() });
    await user.save();

    const cookieOptions = {
      maxAge: COOKIE_MAX_AGE,
      secure: config.ENVIRONMENT !== "development",
      httpOnly: true,
      sameSite: config.ENVIRONMENT === "development" ? "Lax" : "None",
    };

    const token = jwt.sign({ _id: user._id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });
    res.cookie("jwt", token, cookieOptions);

    return res.status(200).send({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: "SERVER_ERROR" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).send({});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const login_token = async (req, res) => {
  try {
    const { user } = req;
    user.set({ lastLoginAt: Date.now() });
    await user.save();
    return res.status(200).send({ user, token: req.cookies.jwt });
  } catch (error) {
    capture(error);
    return res.status(500).send({ code: "SERVER_ERROR" });
  }
};

module.exports = { register, login, logout, getUsers, login_token };

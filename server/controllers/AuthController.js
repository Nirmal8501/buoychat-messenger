import { compare } from "bcrypt";
import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { response } from "express";

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId: userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const email = request.body?.email || ""; // if req.body is undefined, initialised with empty
    const password = request.body?.password || "";

    if (email === "" || password === "") {
      return response.status(400).send("Email and Password are required...");
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return response.status(400).send("User with the Email Already Exists...");
    }

    const user = await Users.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    }); // sending jwt token to user in form of cookie

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        isProfileSetup: user.isProfileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Server Error");
  }
};

export const login = async (request, response, next) => {
  try {
    const email = request.body?.email || ""; // if req.body is undefined, initialised with empty
    const password = request.body?.password || "";

    if (email === "" || password === "") {
      return response.status(400).send("Email and Password are required...");
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return response.status(404).send("User Does Not Exist...");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Entered Password is Wrong...");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    }); // sending jwt token to user in form of cookie

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        isProfileSetup: user.isProfileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (request, response, next) => {
  // user is already authenticated in the client side but still we can put an extra check here, but instead we ll make use of cookie which we had set
  console.log("inside get user info");
  // console.log({ request });
  console.log(request.userId);
  try {
    const userData = await Users.findById(request.userId); // this is the decrypted UserId which we are setting in middleware after successful auth. as request has only email n pass but we gotta search from ID (as it is indexed) so we push ID in request with the help of payload

    if (!userData)
      return response.status(404).send(`User with given ID not found...`);

    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      isProfileSetup: userData.isProfileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

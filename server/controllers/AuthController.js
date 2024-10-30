import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (email, userID) => {
  return jwt.sign({ email, userID }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const email = request.body?.email || ""; // if req.body is undefined, initialised with empty
    const password = request.body?.password || "";
    const confirmPassword = request.body.confirmPassword || "";

    if (email === "" || password === "") {
      return response.status(400).send("Email and Password are required...");
    }

    if (password != confirmPassword) {
      return response.status(400).send("Passwords Do not Match");
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return response.status(400).send("User with the Email Already Exists...");
    }

    const user = await Users.create({ email, password });
    response.cookie("jwt", createToken(email, userID), {
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

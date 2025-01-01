import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  //   console.log(request.cookies);
  const token = request.cookies.jwt;
  //   console.log({ token });
  if (!token) {
    // console.log("token not present");
    return response
      .status(401)
      .send("Unauthenticated: You must login before proceeding...");
  }

  jwt.verify(token, process.env.JWT_key, async (err, payload) => {
    if (err) {
      return response
        .status(403)
        .send("Token is invalid or might have expired...");
    }
    // console.log("token valid now setting user iD");
    request.userId = payload.userId;
    // console.log("Decoded token payload:", { payload });
    // console.log("Decoded token request:", { request });
    // console.log(
    //   `Request userID: ${request.userId} and payload.userId: ${payload.userId}`
    // );
    // console.log("userID set now calling next");
    next();
  });
};

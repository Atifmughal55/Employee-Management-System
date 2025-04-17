import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "You must be Logged In",
        success: false,
        error: true,
      });
    }

    const decoded = await jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    if (!decoded) {
      return res.status(403).json({
        message: "Access Token Expired",
        success: false,
        error: true,
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "You are not logged In",
      success: false,
      error: true,
    });
  }
};

export default auth;

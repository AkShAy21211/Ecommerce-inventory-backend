import { NextFunction, Request, Response } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.Jwt_secret as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
console.log(token);

  if (!token) return res.status(401).json({ message: "Access denied token is required" });

  jwt.verify(token, JWT_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).json({
        message: "Access denied invalid token or expired",
      });
    }

    (req as any).current = decode;
    next();
  });
};

export default verifyToken;

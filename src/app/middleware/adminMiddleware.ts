import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.Jwt_secret as string;

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).current.role;

  console.log("current user role: " + userRole);

  if (userRole !== "admin") {
    return res
      .status(403)
      .json({
        message: "You are not authorized to perform this action",
        success: false,
      });
  }

  next()
};

export default isAdmin;

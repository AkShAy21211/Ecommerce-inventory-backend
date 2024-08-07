import { Request, Response } from "express";
import config from "../../config";
import jwt from "jsonwebtoken";
import {
  createUsers,
  findUserByEmail,
  validatePassword,
} from "./user.services";

const JWT_SECRET = config.JWT_SECRET as string;

export const signUpUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({
        message: "User already exists plese sign in",
        success: false,
      });
      return;
    }

    const userRole = role || "user";

    const user = await createUsers(email, password, userRole);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "User request failed",
      success: false,
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(400).json({
        message: "User not exists plese sign up",
        success: false,
      });
      return;
    }

    const isValidPassword = await validatePassword(email, password);

    if (!isValidPassword) {
      res.status(400).json({
        message: "Invalid login credentials",
        success: false,
      });
      return;
    }

    const token = jwt.sign(
      { email: existingUser?.email, role: existingUser?.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successfull",
      success: true,
      token,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "User request failed",
      success: false,
    });
  }
};

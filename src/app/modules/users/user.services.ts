import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";
export const findUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async (
  email: string,
  password: string,
  role: string
): Promise<TUser | null | undefined> => {
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({ email, password: hashPassword, role });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const validatePassword = async (
  email: string,
  password: string
): Promise<boolean | null | undefined> => {
  try {
    const user = await UserModel.findOne({ email });

    const isValid = await bcrypt.compare(password, user?.password as string);

    return isValid;
  } catch (error) {
    console.log(error);
  }
};

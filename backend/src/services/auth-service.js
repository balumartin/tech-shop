import { loginSchema, registerSchema } from "../schemas/auth-schema.js";
import bcrypt from "bcrypt";
import HttpError from "../utils/http-error";
import prisma from "../db/prisma.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/base.js";

const authService = {
  register: async ({ userName, email, password }) => {
    await registerSchema.validate({ userName, email, password });

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
      const dbUser = await prisma.user.create({
        data: { userName, email, password: hashedPassword },
      });
      console.log(dbUser);
      return {
        id: dbUser.id,
        userName,
        role: dbUser.role,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
      };
    } catch (error) {
      throw new HttpError(`Error creating user: ${error.message}`);
    }
  },
  login: async (data) => {
    await loginSchema.validate(data);

    const { email, password } = data;

    const dbUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log(dbUser);

    if (!dbUser) throw new HttpError("Invalid email or password");

    if (await bcrypt.compare(password, dbUser.password)) {
      const token = jwt.sign(
        {
          id: dbUser.id,
          userName: dbUser.userName,
          email,
          role: dbUser.role,
          createdAt: dbUser.createdAt,
          updatedAt: dbUser.updatedAt,
        },
        JWT_SECRET
      );
      console.log({token})
      return { token };
    }
    throw new HttpError("Invalid email or password", 403);
  },
};

export default authService;

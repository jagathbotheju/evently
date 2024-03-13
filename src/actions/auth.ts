"use server";
import prisma from "@/lib/prismadb";
import { RegisterSchema } from "@/lib/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

export const getUserById = async (userid: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userid },
    });

    if (!user) {
      return {
        success: false,
        error: "No user Found!",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      error: "Inter Server Error",
    };
  }
};

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields) {
      return {
        success: false,
        error: "Error Creating User,Missing Fields",
      };
    }

    const { name, email, password } = values;
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      return {
        success: false,
        error: "Email address already Exist",
      };
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPw,
      },
    });
    if (!newUser) {
      return {
        success: false,
        error: "Unable to create user, please try later",
      };
    }

    const { hashedPassword, ...userNoPass } = newUser;

    //send activation mail
    // const jwtUserId = signJwt({ id: userNoPass.id });
    // const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
    // const body = compileActivationMailTemplate(
    //   newUser.name || "guest",
    //   activationUrl
    // );
    // await sendMail({
    //   to: userNoPass.email as string,
    //   subject: "Activate Your Account",
    //   body,
    // });

    return {
      success: true,
      message: "User Signup Successfully",
    };
  } catch (error: any) {
    throw Error("Internal Server Error");
  }
};

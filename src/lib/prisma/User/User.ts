"use server";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import "bcrypt";
import bcrypt from "bcrypt";
import prisma from "../prisma";

const createUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!data.email || !data.password || !data.firstName || !data.lastName) {
    return {
      error:
        "Création d'un compte utilisateur - Toutes les données sont requises",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName.toUpperCase(),
      },
    });
    console.log(
      `Création d'un compte utilisateur - ${user.firstName} ${user.lastName}`
    );
    return {
      success: `Création d'un compte utilisateur -  ${user.firstName} ${user.lastName}`,
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          `Création d'un compte utilisateur - ${data.email} existe déjà`
        );
        return {
          error: `Création d'un compte utilisateur - ${data.email} existe déjà`,
        };
      }
    }
    console.log(error.message);
    return {
      error: error.message as string,
    };
  }
};

export default createUser

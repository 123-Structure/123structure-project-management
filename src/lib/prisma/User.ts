"use server";
import { User } from "@prisma/client";
import "bcrypt";
import bcrypt from "bcrypt";
import prisma from "./prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<{
  success?: string;
  error?: string;
}> => {
  if (!data.email || !data.password || !data.name) {
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
        name: data.name,
      },
    });
    console.log(`Création d'un compte utilisateur - ${user.name}`);
    return {
      success: `Création d'un compte utilisateur - ${user.name}`,
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

"use server";
import { User } from "@prisma/client";
import "bcrypt";
import bcrypt from "bcrypt";
import prisma from "./prisma";

export const createUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  if (!data.email || !data.password || !data.name) {
    return {
      message: "⚠ User - Toutes les données sont requises",
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
    console.log(`🎉 Nouveau user créé : ${user.name}`);
    return {
      message: `🎉 Nouveau user créé : ${user.name}`,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      message: `💥 Erreur - Création user : ${error.message as string}`,
    };
  }
};

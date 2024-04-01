import prisma from "@/lib/prisma/prisma";
import { credentialsSchema, userSchema } from "@/lib/schema/authSchema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function authMiddleware(credentials: {
  email: string;
  password: string;
}) {
  try {
    const parsedCredentials = credentialsSchema.parse(credentials);

    const user = await prisma.user.findUnique({
      where: { email: parsedCredentials.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 401, statusText: "User not found" }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      parsedCredentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401, statusText: "Invalid password" }
      );
    }

    const userData = userSchema.parse({
      id: user.id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Non Autorisé" },
        { status: 401, statusText: "Not Allowed" }
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error(err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err.issues },
        { status: 400, statusText: "Bad Request" }
      );
    }
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

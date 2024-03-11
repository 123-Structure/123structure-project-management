"use client";
import { createUser } from "@/lib/prisma/User";
import { User } from "@prisma/client";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

// Define your form schema using zod
const formSchema = z.object({
  firstName: z
    .string({
      required_error: "Le champs est requis",
    })
    .describe("Prénom"),
  lastName: z
    .string({
      required_error: "Le champs est requis",
    })
    .describe("Nom"),
  email: z
    .string({
      required_error: "Email est requis.",
    })
    .min(2, {
      message: "Email doit faire plus de 2 caractères",
    })
    .email(),

  password: z
    .string({
      required_error: "Mot de passe est requis",
    })
    .min(8, {
      message: "Mot de passe doit faire au moins 8 caractères",
    })
    .describe("Mot de passe"),
});

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // console.log(data);
    const newUser = await createUser(data as User);

    if (newUser.error) {
      toast.error("Authentification", {
        description: `${newUser.error}`,
      });
    } else if (newUser.success) {
      toast.success("Authentification", {
        description: `${newUser.success}`,
      });
      router.push("/auth/connexion");
    }
  };

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={(data: any) => handleSubmit(data)}
      fieldConfig={{
        password: {
          inputProps: {
            type: "password",
            placeholder: "••••••••",
          },
        },
      }}
    >
      <AutoFormSubmit>
        <LogIn className="mr-2 size-4" />
        Inscription
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default SignUp;

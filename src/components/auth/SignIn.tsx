"use client";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

// Define your form schema using zod
const formSchema = z.object({
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

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { email, password } = data;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.error) {
      console.error("Erreur de connexion :", response.error);
      toast.error("Authentification", { description: response.error });
    } else if (response?.url) {
      toast.success("Authentification", {
        description: `${email} connecté avec succès.`,
      });
      router.push("/");
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
        Connexion
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default SignIn;

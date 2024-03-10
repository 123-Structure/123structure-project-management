"use client";
import { createUser } from "@/lib/prisma/User";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

// Define your form schema using zod
const formSchema = z.object({
  email: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
  name: z.string({
    required_error: "Le champs est requis",
  }),
});

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // console.log(data);
    const newuser = await createUser(data as User);

    toast("Message du serveur", {
      description: `${newuser.message}`,
    });

    router.push("api/auth/signin");
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
      <AutoFormSubmit>Inscription</AutoFormSubmit>
    </AutoForm>
  );
};

export default SignUp;

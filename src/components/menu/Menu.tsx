"use client";
import { LogOut, PlusCircle, UserIcon, Users, Wrench } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import User from "./User";

const Menu = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/auth/connexion");
    toast.success("Authentification", {
      description: `${session?.user.firstName} ${session?.user.lastName} déconnecté avec succès.`,
    });
  };

  if (!session) {
    return <></>;
  }

  return (
    <nav className="flex w-full justify-center p-4">
      <div className="flex gap-4">
        <Button variant="link" onClick={() => router.push("/")}>
          <UserIcon className="mr-2 size-4" />
          Espace personnel
        </Button>
        <Button variant="link" disabled>
          <Users className="mr-2 size-4" />
          Équipe
        </Button>
        <Button variant="link" disabled>
          <Wrench className="mr-2 size-4" />
          Outils
        </Button>
        <Button variant="link" onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" />
          Déconnexion
        </Button>
        <Button onClick={() => router.push("/dossier/nouveau")}>
          <PlusCircle className="mr-2 size-4" />
          Nouveau dossier
        </Button>
      </div>
      <div className="absolute right-8 top-4">
        <User />
      </div>
    </nav>
  );
};

export default Menu;

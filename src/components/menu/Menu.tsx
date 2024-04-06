"use client";
import tools from "@/lib/constants/tools";
import { LogOut, PlusCircle, UserIcon, Users, Wrench } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import User from "./User";

const Menu = () => {
  const pathname = usePathname();
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
        <Button
          className={pathname === "/" ? "bg-primary/10" : ""}
          variant="link"
          onClick={() => router.push("/")}
        >
          <UserIcon className="mr-2 size-4" />
          Espace personnel
        </Button>
        <Button
          className={pathname === "/equipe" ? "bg-primary/10" : ""}
          variant="link"
          onClick={() => router.push("/equipe")}
        >
          <Users className="mr-2 size-4" />
          Équipe
        </Button>
        <HoverCard>
          <HoverCardTrigger>
            <Button
              className={pathname === "/outils" ? "bg-primary/10" : ""}
              variant="link"
              onClick={() => router.push("/outils")}
            >
              <Wrench className="mr-2 size-4" />
              Outils
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="grid grid-cols-2 gap-2">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded p-2 text-sm text-slate-950 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted dark:text-slate-50"
                onClick={() => router.push(tool.link)}
              >
                <p className="flex items-center gap-2 font-semibold">
                  {tool.icon}
                  {tool.title}
                </p>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
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

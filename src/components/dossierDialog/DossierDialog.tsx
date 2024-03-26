"use client";
import useDossierStore from "@/lib/store/dossier.store";
import { primaryColor } from "@/lib/utils/tailwindConfig";
import {
  AudioLines,
  Ban,
  Contact,
  Folder,
  MapPin,
  Pencil,
  Snowflake,
  Star,
  User,
  Wind,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DossierForm from "../DossierForm";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import ZoneCard from "./ZoneCard";

const DossierDialog = () => {
  const dossier = useDossierStore((s) => s.dossier);
  const resetDossier = useDossierStore((s) => s.resetDossier);
  const { data: session } = useSession();

  const [editMode, setEditMode] = useState<boolean>(false);

  const userId =
    `${session?.user?.firstName?.[0]?.toLowerCase()}.${session?.user?.lastName?.toLowerCase()}` ||
    "";

  const handleCloseDialog = () => {
    resetDossier();
    setEditMode(false);
  };

  return (
    <Dialog open={dossier.openDialog} onOpenChange={handleCloseDialog}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="size-4" />
            {`${dossier.dossier?.numDossier} - 
              ${dossier.dossier?.nomDossier}`}
          </DialogTitle>
        </DialogHeader>
        {editMode ? (
          <ScrollArea className="max-h-96  pr-4">
            <DossierForm mode="update" setEditMode={setEditMode} />
          </ScrollArea>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <Badge>
                <Contact className="mr-2 size-4" />
                {dossier.dossier?.client}
              </Badge>
              <Badge>
                <MapPin className="mr-2 size-4" />
                {`${dossier.location?.codePostal} ${dossier.location?.ville}`}
              </Badge>
              <Badge variant="secondary">
                <User className="mr-2 size-4" />
                {dossier.dossier?.dessinePar}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <ZoneCard
                  title="Séisme"
                  type="seism"
                  value={dossier.location?.seisme}
                  icon={<AudioLines className="size-20" />}
                />
                <ZoneCard
                  title="Vent"
                  type="wind"
                  value={dossier.location?.vent}
                  icon={<Wind className="size-20" />}
                />
                <ZoneCard
                  title="Neige"
                  type="snow"
                  value={dossier.location?.neige}
                  icon={<Snowflake className="size-20" />}
                />
              </div>
              <p className="text-lg font-semibold">
                Remarques sur le dossier :
              </p>
              <p className="italic underline">Général :</p>
              {dossier.feedback?.generalNote ? (
                <div className="flex gap-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      fill={primaryColor}
                      strokeWidth={1.5}
                      fillOpacity={
                        dossier.feedback?.generalNote
                          ? index <= dossier.feedback?.generalNote - 1
                            ? 1
                            : 0
                          : 0
                      }
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
              <p>{dossier.feedback?.generalComment ?? "-"}</p>
            </div>
          </>
        )}
        <DialogFooter>
          {userId === dossier.dossier?.dessinePar && !editMode ? (
            <Button onClick={() => setEditMode(true)}>
              <Pencil className="mr-2 size-4" /> Editer
            </Button>
          ) : userId === dossier.dossier?.dessinePar && editMode ? (
            <Button onClick={() => setEditMode(false)}>
              <Ban className="mr-2 size-4" /> Annuler
            </Button>
          ) : (
            <></>
          )}
          <Button variant={"secondary"} onClick={handleCloseDialog}>
            <X className="mr-2 size-4" /> Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DossierDialog;

"use client";
import useDossierStore from "@/lib/store/dossier.store";
import { primaryColor } from "@/lib/utils/tailwindConfig";
import {
  AudioLines,
  Contact,
  Folder,
  MapPin,
  Snowflake,
  Star,
  User,
  Wind,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ZoneCard from "./ZoneCard";

const DossierDialog = () => {
  const dossier = useDossierStore((s) => s.dossier);
  const resetDossier = useDossierStore((s) => s.resetDossier);

  return (
    <Dialog open={dossier.openDialog} onOpenChange={() => resetDossier()}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pb-2">
            <Folder className="size-4" />
            {`${dossier.dossier?.numDossier} - 
              ${dossier.dossier?.nomDossier}`}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2">
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
          </DialogDescription>
        </DialogHeader>
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
          <p className="text-lg font-semibold">Remarques sur le dossier :</p>
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
      </DialogContent>
    </Dialog>
  );
};

export default DossierDialog;

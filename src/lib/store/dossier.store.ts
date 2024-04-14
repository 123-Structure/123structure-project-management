import { Dossier, Location } from "@prisma/client";
import { create } from "zustand";

export interface IDossier {
  openDialog: boolean;
  dossier?: Dossier;
  location?: Location;
}

type DossierType = {
  dossier: IDossier;
  setDossier: (state: IDossier) => void;
  resetDossier: () => void;
};

const defaultDossier = {
  openDialog: false,
  dossier: undefined,
  location: undefined,
};

const useDossierStore = create<DossierType>((set) => ({
  dossier: defaultDossier,
  setDossier: (newDossier: {
    openDialog: boolean;
    dossier?: Dossier;
    location?: Location;
  }) => {
    set({
      dossier: {
        openDialog: newDossier.openDialog,
        dossier: newDossier.dossier,
        location: newDossier.location,
      },
    });
  },
  resetDossier: () => {
    set({ dossier: defaultDossier });
  },
}));

export default useDossierStore;

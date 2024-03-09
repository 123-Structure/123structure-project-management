interface ICommune {
  nom: string;
  code: string;
  codeDepartement: string;
  siren: string;
  codeEpci: string;
  codeRegion: string;
  codesPostaux: string[];
  population: number;
}

interface ISeismSnowWind {
  zmin: string;
  code: string;
  zmax: string;
  vent_ec1: string;
  seisme_ec8: string;
  neige_ec1: string;
  commune: ICommune;
}

export default ISeismSnowWind;

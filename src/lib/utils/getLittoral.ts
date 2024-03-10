import littoral from "../assets/littoral.json";
import ILittoral from "../interface/ILittoral";

const getLittoral = (codeInsee: string): ILittoral | undefined => {
  return littoral.find((ville) => ville.INSEE_COM === codeInsee);
};

export default getLittoral;

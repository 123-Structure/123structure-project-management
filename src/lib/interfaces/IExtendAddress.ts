import IAddress from "./IAddress";
import IGeoJSON from "./IGeoJSON";

interface IExtendAddress extends IAddress {
  zones: {
    vent: string;
    neige: string;
    seisme: string;
  };
  geoJSON: IGeoJSON;
}

export default IExtendAddress;

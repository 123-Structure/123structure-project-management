interface IGeometry {
  type: string;
  coordinates: number[];
}

interface IProperties {
  label: string;
  score: number;
  id: string;
  type: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  population: number;
  city: string;
  context: string;
  importance: number;
  municipality: string;
}

interface IAddressResponse {
  type: string;
  geometry: IGeometry;
  properties: IProperties;
}

export default IAddressResponse;

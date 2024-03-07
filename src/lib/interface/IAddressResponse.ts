interface IAddressResponse {
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

export default IAddressResponse;

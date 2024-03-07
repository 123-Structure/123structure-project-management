import IAddressResponse from "../interface/IAddressResponse";

const fetchAddress = async (query: string): Promise<IAddressResponse[]> => {
  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality&autocomplete=0`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching address: ${response.statusText}`);
    }

    const data = await response.json();
    return data.features as IAddressResponse[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAddress;

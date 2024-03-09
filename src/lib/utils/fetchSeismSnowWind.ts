import ISeismSnowWind from "../interface/ISeismSnowWind";

const fetchSeismSnowWind = async (query: {
  latitude: number;
  longitude: number;
}): Promise<ISeismSnowWind> => {
  try {
    const url = `https://us-central1-aibolide-b291c.cloudfunctions.net/api/lookup?lat=${query.latitude}&lng=${query.longitude}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching zones: ${response.statusText}`);
    }

    const data = await response.json();
    return data as ISeismSnowWind;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchSeismSnowWind;

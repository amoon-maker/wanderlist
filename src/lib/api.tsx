export type City = {
  id: number;
  name: string;
  country: string;
  population: number;
  region?: string;
};

export type Weather = {
  current: {
    temperature_2m: number;
  };
};

export async function getCities() {
  const response = await fetch(
    "https://geodb-free-service.wirefreethought.com/v1/geo/cities?countryIds=CA&limit=10",
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const body = await response.json();
  return body.data;
}

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<Weather> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
  );
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const body = await response.json();
  return body;
}

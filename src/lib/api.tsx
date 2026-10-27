export async function getCities() {
  const response = await fetch(
    "https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10",
  );
  const body = await response.json();
  return body.data;
}
export async function getWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=45.5&longitude=-73.6&current=temperature_2m",
  );

  const body = await response.json();
  return body;
}

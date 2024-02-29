import { api } from "./api";

export interface CityProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CityAPIResponse {
  id: string; //api retorna um número mas posso tratar como string na minha aplicação
  name: string;
  sys: {
    country?: string; //? indica que é opcional
  };
  coord: {
    lat: number;
    lon: number;
  }
}

export async function getCityByNameService(name: string): Promise<CityProps[]> { //Promise porque é uma função assíncrona
  try {
    const { data } = await api.get<CityAPIResponse>(`/weather?q=${name}`);

    const city = {
      id: data.id,
      name: data.sys.country ? `${data.name}, ${data.sys.country}` : data.name,
      longitude: data.coord.lon,
      latitude: data.coord.lat,
    };

    return [city];
  } catch (error) {
    return [];
  }
}
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiEndpoint + "/api/genres";

export async function getGenres() {
  const { data: genres } = await http.get(apiEndpoint);

  return genres;
}

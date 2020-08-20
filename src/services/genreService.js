import http from "./httpService";

const apiEndpoint = "/genres";

export async function getGenres() {
  const { data: genres } = await http.get(apiEndpoint);

  return genres;
}

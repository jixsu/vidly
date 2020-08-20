import http from "./httpService";

const apiEndpoint = "/movies";

export async function getMovies() {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
}

export async function getMovie(movieId) {
  const { data: movie } = await http.get(apiEndpoint + "/" + movieId);
  return movie;
}

export async function deleteMovie(movieId) {
  return await http.delete(`${apiEndpoint}/${movieId}`);
}

export async function saveMovie(movie) {
  if (!movie._id) {
    return await http.post(apiEndpoint, movie);
  }
  let body = { ...movie };
  delete body._id;
  return await http.put(apiEndpoint + "/" + movie._id, body);
}

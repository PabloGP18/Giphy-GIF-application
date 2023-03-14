import { API_KEY, API_URL } from "./settings";

const fromApiReposonseToGifs = (apiResponse) => {
  const { data } = apiResponse;
  const { images, title, id } = data;
  const { url } = images.downsized_medium;
  return { title, url, id };
};

export default function getSingleGif({ id }) {
  return fetch(`${API_URL}/gifs/${id}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then(fromApiReposonseToGifs);
}

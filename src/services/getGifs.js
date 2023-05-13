import { API_KEY, API_URL } from './settings'

const getGifs = ({
  limit = 15,
  keyword = 'morty',
  page = 0,
  rating = 'g',
  language = 'en',
  id = '',
} = {}) => {
  const apiURL = `${API_URL}/gifs/${id}search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    page * limit
  }&rating=${rating}&lang=${language}`
  return fetch(apiURL)
    .then((res) => res.json())
    .then((response) => {
      const { data = [] } = response
      // checking if apidata {data} is an array
      if (Array.isArray(data)) {
        const apiImage = data?.map((image) => {
          const { images, title, id } = image
          const { url } = images?.downsized_medium
          return { title, url, id }
        })
        return apiImage
      }
    })
}

export default getGifs

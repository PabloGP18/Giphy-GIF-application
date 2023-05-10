const ENDPOINT = 'http://localhost:3050'

export default function addFav({ id, jwt }) {
  return fetch(`${ENDPOINT}/favs/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${jwt}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    })
    .then((res) => {
      const { favs } = res
      return favs
    })
    .catch((err) => {
      if (err.message === 'Favorite already exists') {
        throw new Error('This favorite already exists')
      }
      throw new Error('Unable to add favorite')
    })
}

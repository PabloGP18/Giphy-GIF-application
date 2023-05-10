const ENDPOINT = 'http://localhost:3050'

export default function getFavs({ jwt }) {
  return fetch(`${ENDPOINT}/favs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    })
    .then((res) => {
      const { favs } = res
      console.log(favs)
      return favs
    })
}

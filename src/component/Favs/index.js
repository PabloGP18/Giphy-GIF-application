import React, { useState, useEffect } from 'react'
import useUser from 'hooks/useUser'
import Gif from 'component/Gif/Gif'
import getSingleGif from 'services/getSingleGif'
import { Link } from 'wouter'
export default function Favs() {
  const { favs } = useUser()
  const [loading, setLoading] = useState(false)
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    setLoading(true)

    Promise.all(favs?.map((id) => getSingleGif({ id })))
      .then((gifs) => {
        setGifs(gifs)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [favs])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Link className="Favs">
          {gifs?.map(({ id, title, url }) => (
            <Gif id={id} key={id} title={title} url={url} />
          ))}
        </Link>
      )}
    </>
  )
}

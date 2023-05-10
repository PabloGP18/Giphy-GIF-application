import React from 'react'
import './Gif.css'
import Fav from 'component/Fav'
import { Link } from 'wouter'

const Gif = ({ title, id, url, className }) => {
  return (
    <div className="Gif">
      <div className="Gif-buttons">
        <Fav id={id}></Fav>
      </div>
      <Link to={`/gif/${id}`} className="Gif-link">
        {/* <h4>{title}</h4> */}
        {/* <small>{id}</small> */}
        <img loading="lazy" alt={title} src={url} className={className} />
      </Link>
    </div>
  )
}

// If you only want to check inside the GIF component if the id is the one who changes, you can do it this way like the example below with memo
export default React.memo(Gif, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
})

import React, { useState } from 'react'
import useUser from 'hooks/useUser'
import useLocation from 'wouter/use-location'
import Modal from 'component/Modal'
import Login from 'component/Login'
import './Fav.css'

export default function Fav({ id }) {
  const { isLogged, addFav, favs, delFav } = useUser()
  const [, navigate] = useLocation()
  const [showModal, setShowModal] = useState(false)

  const isFaved = favs?.some((favId) => favId === id)

  const handleClick = () => {
    if (!isLogged) return setShowModal(true)
    addFav({ id })

    if (emoji === '❌') delFav({ id })
    return emoji === '❤️'
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleLogin = () => {
    setShowModal(false)
  }

  const [label, emoji] = isFaved
    ? ['Remove Gif from favorites', '❌']
    : ['Add Gif to favorites', '❤️']

  return (
    <>
      <button className="gf-Fav" onClick={handleClick}>
        <span aria-label={label} role="img">
          {emoji}
        </span>
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          <Login onLogin={handleLogin} />
        </Modal>
      )}
    </>
  )
}

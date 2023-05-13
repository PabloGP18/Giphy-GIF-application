import React from 'react'
import { Link, useRoute } from 'wouter'

import useUser from 'hooks/useUser'

import './index.css'

export default function Header() {
  // const isLogged = false
  const { isLogged, logout } = useUser()
  const [match] = useRoute('/login')

  const handleClick = (event) => {
    event.preventDefault()
    logout()
  }

  const renderLoginButtons = ({ isLogged }) => {
    return isLogged ? (
      <button onClick={handleClick}>Logout</button>
    ) : (
      <div className="header-container">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )
  }

  const content = match ? null : renderLoginButtons({ isLogged })

  return <header className="gf-header">{content}</header>
}

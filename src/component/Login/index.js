import React, { useState, useEffect } from 'react'
import useLocation from 'wouter/use-location'
import useUser from 'hooks/useUser'
import './Login.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, navigate] = useLocation()
  const { login, isLogged, isLoginLoading, hasLoginError } = useUser()

  // effect when you are logged in (is true)=> then go to '/'
  useEffect(() => {
    if (isLogged) {
      navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, navigate, onLogin])

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    // alert(`${username}, ${password}`);
    // navigate('/')
  }

  // if (isLoginLoading) return <p>...loading</p>

  return (
    <>
      {isLoginLoading && <strong>Checking credebtials...</strong>}
      {!isLoginLoading && (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            username:
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>
          <label>
            password
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button className="button-login">Login</button>
        </form>
      )}
      {hasLoginError && <strong>Credentials are invalid</strong>}
    </>
  )
}

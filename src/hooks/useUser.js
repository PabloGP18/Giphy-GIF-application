import { useCallback, useState } from 'react'
import Context from 'context/UserContext'
import { useContext } from 'react'
import loginService from 'services/login'
import addFavService from 'services/addFav'
import deleteFavs from 'services/deleteFav'

export default function useUser() {
  const { jwt, setJWT, favs, setFavs } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  /* passing the username from the login page true this
  function to the service that is connected to the backend*/

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false })
      // setJWT('test')
      loginService({ username, password })
        .then((jwt) => {
          window.sessionStorage.setItem('jwt', jwt)
          setState({ loading: false, error: false })
          setJWT(jwt)
        })
        .catch((error) => {
          window.sessionStorage.removeItem('jwt')
          setState({ loading: false, error: true })
          console.log(error)
        })
    },
    [setJWT]
  )

  const addFav = useCallback(
    ({ id }) => {
      addFavService({ id, jwt })
        .then(setFavs)
        .catch((err) => {
          console.error(err)
        })
    },
    [jwt, setFavs]
  )

  const delFav = useCallback(
    ({ id }) => {
      deleteFavs({ id, jwt })
        .then(setFavs)
        .catch((err) => {
          console.error(err)
        })
    },
    [jwt, setFavs]
  )

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('jwt')
    setJWT(null)
  }, [setJWT])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    addFav,
    favs,
    delFav,
  }
}

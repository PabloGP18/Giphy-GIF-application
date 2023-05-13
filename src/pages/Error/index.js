import SearchForm from 'component/SearchForm'
import { Helmet } from 'react-helmet'
import { Link } from 'wouter'
import useGifs from 'hooks/useGifs'
import Spinner from 'component/Spinner'
import ListOfGifs from 'component/ListOfGifs/ListOfGifs'

export default function ErrorPage() {
  const { loading, gifs } = useGifs({ keyword: 'Errors', limit: 8 })

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>Error 404 | Giphy</title>
            <meta
              name="description"
              content="oh oh... only error gifs on this page"
            />
          </Helmet>
          <header className="o-header">
            <SearchForm />
          </header>
          <div className="App-wrapper">
            <div>
              <span>404</span>
              <span>Sometimes gettings lost isn't that bad</span>
              <ListOfGifs gifs={gifs} />
              {/* <img src={randomErrorGifs()} alt="alt-page-404" /> */}
              <Link to="/">
                <button>Go back home</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

import { lazy, Suspense } from 'react'
import { Link, Route, Switch } from 'wouter'

import Header from 'component/Header'

import logo from './images/logo.png'
// import Home from "./pages/Home";
import Login from './pages/Login'
import Register from 'component/Register/indexWithFormk'
import SearchResults from './pages/SearchResults'
import Detail from './pages/Detail'
import ErrorPage from 'pages/Error'

import StaticContext from './context/StaticContext'
import { GifsContextProvider } from './context/GifsContext'
import { UserContextProvider } from 'context/UserContext'

import './App.css'

const HomePage = lazy(() => import('./pages/Home'))

//* using : (example :id) in path means its dynamical, using ? means its optional (example rating?)

function App() {
  return (
    <UserContextProvider>
      <StaticContext.Provider value={{ name: 'pablo', subscribe: true }}>
        <div className="App">
          <Suspense fallback={null}>
            <header>
              <Header />
              <figure className="App-figure">
                <Link to="/">
                  <img src={logo} alt="Giphy logo" />
                </Link>
              </figure>
            </header>
            <section className="App-content">
              <GifsContextProvider>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route
                    path="/search/:keyword/:rating?/:language?"
                    component={SearchResults}
                  />
                  <Route path="/gif/:id" component={Detail} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/:rest*" component={ErrorPage} />
                </Switch>
              </GifsContextProvider>
            </section>
          </Suspense>
        </div>
      </StaticContext.Provider>
    </UserContextProvider>
  )
}

export default App

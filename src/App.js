import "./App.css";
import logo from "./images/logo.png";
import { Link, Route, Switch } from "wouter";
// import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import SearchResults from "./pages/SearchResults";
import StaticContext from "./context/StaticContext";
import Detail from "./pages/Detail";
import { GifsContextProvider } from "./context/GifsContext";
import ErrorPage from "pages/Error";

const HomePage = lazy(() => import("./pages/Home"));

//* using : (example :id) in path means its dynamical, using ? means its optional (example rating?)

function App() {
  return (
    <StaticContext.Provider value={{ name: "pablo", subscribe: true }}>
      <div className="App">
        <Suspense fallback={null}>
          <header>
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
                <Route path="/:rest*" component={ErrorPage} />
              </Switch>
            </GifsContextProvider>
          </section>
        </Suspense>
      </div>
    </StaticContext.Provider>
  );
}

export default App;

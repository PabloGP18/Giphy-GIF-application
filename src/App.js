import "./App.css";
import logo from "./images/logo.png";
import { Link, Route } from "wouter";
// import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import SearchResults from "./pages/SearchResults";
import StaticContext from "./context/StaticContext";
import Detail from "./pages/Detail";
import { GifsContextProvider } from "./context/GifsContext";

const HomePage = lazy(() => import("./pages/Home"));

function App() {
  return (
    <StaticContext.Provider value={{ name: "pablo", subscribe: true }}>
      <div className="App">
        <Suspense fallback={null}>
          <section className="App-content">
            <Link to="/">
              <img className="App-logo" src={logo} alt="Giphy logo" />
            </Link>
            <GifsContextProvider>
              <Route path="/" component={HomePage} />
              <Route path="/gif/:id" component={Detail} />
              <Route path="/search/:keyword" component={SearchResults} />
              <Route path="/404" component={() => <h1>404 ERROR </h1>} />
            </GifsContextProvider>
          </section>
        </Suspense>
      </div>
    </StaticContext.Provider>
  );
}

export default App;

import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Game from "./containers/Game";
import Home from "./containers/Home";

function App() {
  return (
    <HashRouter>
      <Header />
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:category/:difficulty/:attempts"} element={<Game />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

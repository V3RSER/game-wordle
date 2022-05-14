import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Game from "./containers/Game";
import Home from "./containers/Home";
import Generic from "./containers/Generic";

function App() {
  return (
    <HashRouter>
      <Header />
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:category/:difficulty/:attempts"} element={<Game />} />
          <Route
            path={"/profile"}
            element={<Generic message={"PRÓXIMAMENTE"} />}
          />
          <Route
            path={"*"}
            element={
              <Generic error={"Error 404"} message={"Página no encontrada"} />
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

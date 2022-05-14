import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Game from "./containers/Game";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <Routes>
          <Route path={process.env.PUBLIC_URL} element={<Home />} />
          <Route
            path={`${process.env.PUBLIC_URL}/:category/:difficulty/:attempts`}
            element={<Game />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

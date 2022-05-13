import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./containers/Game";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <div className="cover-container d-flex h-100 mx-auto flex-column">
        <Routes>
          <Route path="/game-wordle/" element={<Home />} />
          <Route
            path="/game-wordle/:category/:difficulty/:attempts"
            element={<Game />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

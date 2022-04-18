import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./containers/Game";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <div className="container">
        <Routes>
          <Route path="/game-wordle/" element={<Home />} />
          <Route path="/game-wordle/:category" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <div className="container">
        <Routes>
          <Route path="/game-wordle/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

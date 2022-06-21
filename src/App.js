import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Search from "./views/Search";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Router>
        <Navbar />
        <div className="bg-slate-600 flex-1 flex md:items-center justify-center p-7">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

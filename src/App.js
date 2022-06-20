import Navbar from "./components/Navbar";
import Home from "./views/Home";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;

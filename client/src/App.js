import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ShoppingBag from "./components/ShoppingBag";
import Table from "./components/Table";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />}/>
        <Route path="/bag" element={<ShoppingBag />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

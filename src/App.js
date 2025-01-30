import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Wallets from "./components/Wallets";
import OwnerTable from "./components/OwnerTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wallets />} />
        <Route path="/balance/:owner" element={<OwnerTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import layouts
import Shop from "./layouts/Shop";
import { Admin } from "./layouts/Admin";

const App = () => {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Admin />} />
          <Route path="*" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

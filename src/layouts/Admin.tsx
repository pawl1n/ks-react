import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import { Dashboard } from "../pages/Dashboard";

export const Admin = () => {
  return (
    <>
      <Header link={"/admin"} />
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
};

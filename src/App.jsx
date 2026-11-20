import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CareGuide from "./pages/CareGuide";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="care-guide" element={<CareGuide />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

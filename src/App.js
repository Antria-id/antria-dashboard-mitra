import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/login/Login";
import DashboardRoute from "./route/dashboard/Dashboard";
import KaryawanRoute from "./route/karyawan/Karyawan";
import PemasukanRoute from "./route/pemasukan/Pemasukan";
import MenuRoute from "./route/menu/Menu";
import EditRoute from "./route/edit/Edit";
import PrivateRoutes from "./utils/PrivateRoutes";
import PageNotFound from "./pages/notfound/PageNotFound";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/data-analytics" element={<DashboardRoute />} exact />
          <Route path="/data-akun" element={<KaryawanRoute />} exact />
          <Route path="/data-pemasukan" element={<PemasukanRoute />} exact />
          <Route path="/data-menu" element={<MenuRoute />} exact />
          <Route path="/edit-page/:id" element={<EditRoute/>} exact />
        </Route>
        {/* Route untuk halaman 404 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

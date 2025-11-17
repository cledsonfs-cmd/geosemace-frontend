import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import GeoSemace from "@/pages/GeoSemace";
import Camadas from "@/pages/Camadas";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
         <Route
          index
          element={
            <ProtectedRoute>
              <GeoSemace />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="camadas/*"
          element={
            <ProtectedRoute>
              <Camadas />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}


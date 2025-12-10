// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Structure from './pages/Structure';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminStructure from './pages/admin/AdminStructure';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminGallery from './pages/admin/AdminGallery';

import ProtectedRoute from './components/admin/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>

      {/* ADMIN LOGIN (tanpa layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN LAYOUT (PROTECTED) */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/structure" element={<AdminStructure />} />
        <Route path="/admin/achievements" element={<AdminAchievements />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
      </Route>
    </Routes>
  );
};

export default App;

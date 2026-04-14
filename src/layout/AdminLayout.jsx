// src/layout/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader'; // 記得建立這個後台專用導覽列
import MessageToast from '../components/MessageToast';
export default function AdminLayout() {
  return (
    <div className="admin-wrapper bg-light min-vh-100">
      <AdminHeader /> 
      <main className="container py-5">
        <MessageToast />
        <Outlet /> 
      </main>
    </div>
  );
}
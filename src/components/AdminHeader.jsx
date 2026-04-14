import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除 Token 並導回首頁
    document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold">後台管理</span>
        <div className="navbar-nav me-auto">
          {/* 這裡放你想切換的連結 */}
          <Link className="nav-link" to="/admin/products">產品列表</Link>
          <Link className="nav-link" to="/admin/orders">訂單管理</Link>
          <Link className="nav-link" to="/admin/coupons">優惠券管理</Link>
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>登出系統</button>
      </div>
    </nav>
  );
}
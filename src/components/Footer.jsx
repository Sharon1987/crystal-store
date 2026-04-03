
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal"; 
export default function Footer() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();
  // 當管理員點擊 Logo 成功登入後執行的動作
  const handleAdminSuccess = () => {
    navigate("/admin/products"); // 這裡是你後台的路由
  };
  const handleLogoClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };
  const handleLoginSuccess = (userRole) => {
    setShowLoginModal(false);
    if (userRole === "admin") {
      // 登入成功後，直接導向後台商品列表
      navigate("/products"); 
    } else {
      // 一般會員可以導向個人中心或首頁
      navigate("/profile");
    }
  };
  return (
    <footer className="pt-5 pb-3 mt-5" style={{background: " #fff7e6"}}>
      <div className="container"  >

        <div className="row text-muted">

          {/* ABOUT US */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">ABOUT US</h6>
            <ul className="list-unstyled">
              <li><Link className="nav-link" to="/aboutbrand">品牌故事</Link></li>
              <li><Link className="nav-link" to="/locations">販售據點</Link></li>
            </ul>
          </div>

          {/* SERVICE */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">SERVICE</h6>
            <ul className="list-unstyled">
              <li> <Link className="nav-link" to="/shoppingInfo">購物須知</Link></li>
              {/* <li>海外專區</li>
              <li>好友推薦</li>
              <li>隱私政策</li>*/}
              <li> <Link className="nav-link" to="/return-exchange">退換貨政策</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">COMPANY</h6>
            
            <ul className="list-unstyled">
              {/* <li>Sharon's Pure Gems</li> */}
              <li> <a href="#!" onClick={(e) => {
                e.preventDefault();
                setShowAdminLogin(true);
              }} style={{
                cursor: "default" }}>
                  <img
                    src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/logo.png`}
                    alt="Logo"
                    width="80"
                    height="80"
                    className="d-inline-block align-text-top me-2"
                  />
                </a> </li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="col-md-3 mb-4 d-flex flex-column align-items-center">
            <h6 className="fw-bold">SOCIALS</h6>
            <div className="d-flex gap-3 fs-4 justify-content-center">
              <i className="bi bi-facebook" title="建置中"></i>
              <a href="https://www.instagram.com/sharons_pure_gems/" target="_blank" rel="noreferrer" className="text-dark">
      <i className="bi bi-instagram"></i>
    </a>
              <i className="bi bi-line" title="建置中" ></i>
            </div>
          </div>
        </div>
        <hr />

        <div className="text-center small text-muted">
          © 2026 Sharon's Pure Gems. All Rights Reserved.
        </div>
 
      </div>
      {/* 登入 Modal */}
      <LoginModal 
        show={showAdminLogin} 
        onHide={() => setShowAdminLogin(false)} 
        isAdminMode={true}//管理員模式
        onLoginSuccess={() => navigate("/admin/products")}
        switchToRegister={() => setShowAdminLogin(false)} 
      />
    </footer>
  );
}
import React,{ useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { fetchCart } from "../store/cartSlice";   // 匯入 Redux Action

import LoginModal from "./LoginModal";  
import RegisterModal from "./RegisterModal";
import { pushMessage } from "../store/messageSlice"; // 匯入訊息 Action

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.totalQty);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 切換：關掉 A 打開 B
  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (!user) {    
      setShowLogin(true);
      dispatch(pushMessage({ text:"請先登入", type: "warning" }));
      return;
    }

    if (cartCount === 0) {
      //alert("您的購物車目前是空的，快去挑選喜歡的水晶吧！");
      dispatch(pushMessage({ text:"您的購物車目前是空的，快去挑選喜歡的水晶吧！", type: "primary" }));
      navigate("/products"); // 引導至商品頁面
      return;
    }
    else { 
      navigate("/cart");
    }
  };

  const handleLogout = () => {
    if (window.confirm("確定要登出嗎？")) {
      logout(); //清除 Context 與 LocalStorage 的資料
      dispatch(fetchCart()); //重新整理購物車 (變回訪客狀態)
      navigate("/"); //導回首頁
    }
  };

  // 取得 Email @ 前的字串作為顯示名稱
  const displayName = user?.email ? user.email.split('@')[0] : "會員";
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  shadow-sm px-4" style={{ background: " #fff7e6" }} >
      <div className="container-fluid" >
        {/* LOGO */}
          <img 
              src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/logo.png`}
              alt="Logo" 
              width="80" 
              height="80" 
              className="d-inline-block align-text-top me-2" 
          />
        <Link className="navbar-brand fw-bold" to="/">Sharon’s Pure Gems</Link>

        {/* 手機版按鈕 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 選單 */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/about">關於我們</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutcrystal">關於水晶</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">商品列表</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart" onClick={handleLoginClick}>
                購物車 🛒
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
                {user ? (
                  // 登入 顯示帳號 + 登出按鈕
                  <div className="d-flex align-items-center gap-3">
                    <span className="fw-bold text-dark">
                      Hi, <span className="text-primary">{displayName}</span>
                    </span>
                    <button 
                      className="btn btn-outline-danger btn-sm" 
                      onClick={handleLogout}
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  // 未登入顯示登入/註冊按鈕
                  <button 
                    className="btn btn-outline-dark btn-sm" 
                    onClick={() => setShowLogin(true)}
                  >
                    登入 / 註冊
                  </button>
                )}
              </li>
          </ul>
        </div>
      </div>
      
      
    
    </nav>
      <LoginModal 
        show={showLogin} 
        onHide={() => setShowLogin(false)} 
        switchToRegister={openRegister} // 切換顯示註冊還是登入的modal
      />
      {/* 註冊 Modal */}
      <RegisterModal 
        show={showRegister} 
        onHide={() => setShowRegister(false)} 
        switchToLogin={openLogin} 
  />
  </>
  );
}

export default Header;
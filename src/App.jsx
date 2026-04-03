import React, { useState,useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// 狀態管理與 Context
import store from './store/index.js'; 
import { fetchCart } from './store/cartSlice';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// 共用樣式與組件
import Header from './components/Header';
import Footer from './components/Footer'; 
import CrystalPageFullInteractive from './components/CrystalPageFullInteractive';
import MessageToast from './components/MessageToast';
import OrderSuccess from './views/front/OrderSuccess';
import CouponModal from "./components/CouponModal";
import { pushMessage } from './store/messageSlice'; // 匯入訊息 Action

//前台路由組 (套用 FrontendLayout) ---
import FrontendLayout from './layout/FrontendLayout';
import Cart from './views/front/Cart';
import NotFound from './views/front/NotFound';
import About from './views/front/About';
import AboutCrystal from './views/front/AboutCrystal';
import ReturnAndExchangePolicy from './views/front/ReturnAndExchangePolicy';
import ShoppingInfo from './views/front/ShoppingInfo';
import Products from './views/front/Products';
import AboutBrand from './views/front/AboutBrand';
import Locations from './views/front/Locations';
//後台路由組 (套用 AdminLayout) ---
import AdminProducts from './views/admin/AdminProducts';
import AdminLayout from './layout/AdminLayout';
import AdminOrders from './views/admin/AdminOrders';
import AdminCoupon from './views/admin/AdminCoupon.jsx';

//env
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

/*路由守衛*/
function ProtectedRoute({ children }) {
  const { user } = useAuth(); 
  const location = useLocation();
  if (!user) {
    alert("請先登入才能進入購物車喔！");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppDataInitializer({ children }) {
  const dispatch = useDispatch();
  const [promoCoupon, setPromoCoupon] = useState(null);

  const STORAGE_KEY = "claimedCoupon";
  const TARGET_CODE = "MOMTHERSDAY2026"; 

  useEffect(() => {
    dispatch(fetchCart());
    
    const checkInitialCoupon = async () => {
      // 檢查是否已經領取過（或關閉過）
      const hasClaimed = localStorage.getItem(STORAGE_KEY);
      if (hasClaimed === "true") return; 

      try {
        const res = await axios.post(`${API_BASE}api/${API_PATH}/coupon`, {
          data: { code: TARGET_CODE }
        });

        if (res.data.success) {
          setPromoCoupon({
            title: "母親節優惠",
            code: "MOMTHERSDAY2026", // 顯示給使用者看的優惠碼
            percent: 20, 
            due_date: "2026/5/31"
          });
        }
      } catch (error) {
        console.log("優惠券無效、已過期或已達使用上限");
      }
    };

    checkInitialCoupon();
  }, [dispatch, API_BASE, API_PATH]); 

  const handleCopy = () => {
    // 確保你有從你的 slice import pushMessage
    dispatch(pushMessage({ text: "優惠碼已複製！", type: "success" }));
    setPromoCoupon(null); // 關閉視窗
    //標記為已處理，下次重新整理就不再顯示
    localStorage.setItem(STORAGE_KEY, "true");
    
  };

  const handleClose = () => {
    setPromoCoupon(null); // 點擊關閉按鈕也要清空狀態
  };

  return (
    <>
      {children}
      {/* 只有在 promoCoupon 有值時才渲染 */}
      {promoCoupon && (
        <CouponModal 
          coupon={promoCoupon} 
          onCopy={handleCopy} 
          onClose={handleClose} 
        />
      )}
    </>
  );
}

function App() {
  return (
    
    <Provider store={store}>
      
      <AppDataInitializer>
       
        <Router>
          
          <AuthProvider>
            
            <Routes>
              
              {/* --- 前台路由 (套用 FrontendLayout) --- */}
              <Route path="/" element={<FrontendLayout />}>
                {/* 預設首頁 */}
                <Route index element={<CrystalPageFullInteractive />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="aboutbrand" element={<AboutBrand />} />
                <Route path="aboutcrystal" element={<AboutCrystal />} />
                <Route path="ShoppingInfo" element={<ShoppingInfo />} />
                <Route path="return-exchange" element={<ReturnAndExchangePolicy />} />
                <Route path="order-success/:orderId" element={<OrderSuccess />} />
                <Route path='locations' element={<Locations />} />
              </Route>

              {/* --- 後台路由 (套用 AdminLayout) --- */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} /> 
                <Route path="coupons" element={<AdminCoupon />} /> 
              </Route>

              {/* 404 頁面 */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </AuthProvider>
        </Router>
      </AppDataInitializer>
    </Provider>
  );
}

export default App;
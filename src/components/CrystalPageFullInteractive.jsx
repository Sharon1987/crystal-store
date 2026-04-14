 
import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CrystalPageAdvanced.css';
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules"; 
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { pushMessage } from "../store/messageSlice"; // 匯入訊息 Action
import { fetchCart } from "../store/cartSlice"; 


//const productList = [1,2,3,4];
const carouselTexts = [
  { text: "每顆水晶，都是你身邊的 溫暖伴侶。", img: "images/carouselpic_1.png" }, 
  { text: "戴上它，讓平凡日子也閃耀小確幸。", img: "images/carouselpic_2.png" },    
  { text: "一條手鍊，一份屬於自己的溫柔陪伴。", img: "images/carouselpic_1.png" }, 
  { text: "小巧光芒，悄悄映襯你的專屬風格。", img: "images/carouselpic_2.png" },    
  { text: "把每一天，化作值得珍惜的溫暖瞬間。", img: "images/carouselpic_1.png" }      
];

const CrystalPageFullInteractive = () => {
  const dispatch = useDispatch(); // 用來發送 Action 給 Redux
  const API_BASE = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;
  const cardsRef = useRef([]);
  const bannerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  console.log * ("showLogin", showLogin);
  //const [page, setPage] = useState(0);

  //const ITEMS_PER_PAGE = 3;
  //const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // const currentItems = products.slice(
  // page * ITEMS_PER_PAGE,
  // page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  // );
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}api/${API_PATH}/products/all`
      );

      const productArray = Object.values(response.data.products);

      setProducts(productArray);

    } catch (error) {
      console.error("獲取資料失敗:", error);
    }
  };

  fetchProducts();
  }, []);
  const addToCart = async (product_id, qty = 1) => {
    //console.log("觸發加入:", product_id)
    try {
      const data = {
        data: { product_id, qty }
      };
      const res = await axios.post(`${API_BASE}api/${API_PATH}/cart`, data);

      if (res.data.success) {
        dispatch(fetchCart()); 
        //alert("成功加入購物車！");
        //alert(res.data.message); 
        dispatch(pushMessage({ text: res.data.message, type: "success" }));
      }
    } catch (error) {
      console.error("加入購物車失敗", error);
      dispatch(pushMessage({ text: "加入購物車失敗", type: "error" }));
    }
  };
useEffect(() => {
    // 手鍊光暈跟隨滑鼠
    const handleMouseMove = (e) => {
      cardsRef.current.forEach(card => {
        if(!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
      if(bannerRef.current){
        const rect = bannerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
        bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    return ()=> window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // 社群輪播自動切換
    const interval = setInterval(()=>{
      const carousel = document.querySelector('#carouselExample');
      if(carousel){
        const nextBtn = carousel.querySelector('.carousel-control-next');
        nextBtn.click();
      }
    }, 4000);
    return ()=> clearInterval(interval);
  }, []);



  
  return (
    <div>
      {/* Banner */}
      <section className="banner-section d-flex align-items-center justify-content-center interactive-card shiny-card" ref={bannerRef}>
        <div className="banner-text animate-fadeIn" ><img src="images/about_us_ssssss.png" alt="閃耀" className="me-2" /> 
          <h1 className="display-4 fw-bold">Sharon’s Pure Gems</h1>
        </div>
      </section>

      {/* 商品列表 */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">我們的手鍊</h2>
        <div className="row g-4">
          {(
            <Swiper modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
            >
           {products.map(product => (
           <SwiperSlide key={product.id}>
           <ProductCard
           product={product}
           onRequireLogin={() => setShowLogin(true)}
           addToCart={addToCart} 
           />
           </SwiperSlide>
        ))}
           </Swiper>
          )}
        </div>
      </section>

      {/* 關於我們 */}
      <section className="container py-5 about-section">
        <h2 className="mb-4 text-center">關於我們</h2>
        <div className="row align-items-center">
          <div className="col-md-6 animate-slideLeft">
            <p>
              每一顆水晶，都是陪在你身邊的 <strong>溫暖伴侶</strong>。</p>
             <p> 我們希望用一條簡單的手鍊，陪你度過生活中的每一刻，<br/>讓平凡的日子也能被溫柔對待。</p>
             <p> 輕巧閃爍的設計，不只是配飾，<br/>更是提醒自己享受當下、珍惜每個瞬間的小溫暖。</p>
              <p>戴上它，你的每一天，<br/>都多了一份專屬光彩，悄悄映襯你的個人風格。</p>
              <p>在這裡，我們相信，生活不需要過於張揚的美好，<br/>有時候，一點剛剛好的光，就能照亮一整天。</p>
          </div>
          <div className="col-md-6 animate-slideRight">
            <img src="images/about_us_s.png" alt="品牌故事" className="img-fluid rounded shadow"/>
          </div>
        </div>
      </section>

      {/* 社群輪播 */}
      <section className="container py-5">
  <h2 className="mb-4 text-center text-secondary mb-title">小確幸瞬間</h2>
  <div id="carouselExample" className="carousel slide interactive-card shiny-card shadow-lg rounded-4 overflow-hidden" data-bs-ride="carousel">
    <div className="carousel-inner">
      {carouselTexts.map((item, idx) => (
        <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
          <div 
            className="carousel-card-container d-flex align-items-center justify-content-start" 
            style={{ 
              backgroundImage: `url(${item.img})`, // 使用物件裡的 img
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px',
              paddingLeft: '10%',
              color: 'black',
              textShadow:'5px 5px 5px 5px #ffffff',
            }}
          >
            {/* 這裡最重要：使用 item.text */}
            <h5 className="text-center">{item.text}</h5> 
            <div className="light-trail"></div>
          </div>
        </div>
      ))}
    </div>
    {/* 控制按鈕 */}
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon opacity-50" aria-hidden="true"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon opacity-50" aria-hidden="true"></span>
    </button>
  </div>
</section>
    </div>
  )
}

export default CrystalPageFullInteractive;
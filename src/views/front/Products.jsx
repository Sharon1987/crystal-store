import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { currency } from "../../utils/filter";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux"; 
import { fetchCart } from "../../store/cartSlice";
import { pushMessage } from "../../store/messageSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


// //上一頁和下一頁
// function SomeComponent() {
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     // 提交成功後跳轉
//     navigate("/success");

//     // 更換當前歷史記錄
//     navigate("/login", { replace: true });

//     // 回上一頁
//     navigate(-1);

//     // 傳遞 state 資料
//     navigate("/result", {
//       state: { message: "操作成功" },
//     });
//   };

//   return <button onClick={handleSubmit}>提交</button>;
// }



function Products() {
  
  const dispatch = useDispatch(); 
  const [products, setProducts] = useState([]);
  const [tempProduct, setTmpProduct] = useState({});
  const [qty, setQty] = useState(1); // 管理數量的狀態
  const [setPagination] = useState({});
  //Modal
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  //初始化Modal
  useEffect(() => {
  if (modalRef.current) {
    // 只有當元素存在時才初始化
    bsModal.current = new Modal(modalRef.current, {
      backdrop: true // 明確指定參數
    });
  }
  
  // 組件卸載時清空 Modal
  return () => {
    if (bsModal.current) {
      bsModal.current.dispose();
    }
  };
}, []);
  

    //取得產品清單
    const getProducts = async (page = 1) => {
      try {
        const response = await axios.get(`${API_BASE}api/${API_PATH}/products/all`);
        //console.log('取得產品清單', response.data.products);
        //console.log('res', response);
        //setProducts(response.data.products);
        console.log(page);
        setProducts(Object.values(response.data.products));
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('取得產品清單失敗', error.response);
      }
    };
    const handleViewMore = async (id) => {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        //   //console.log('取得單一產品資料', response.data);
        //   navigate(`/product/${id}`, { state: { productData: response.data } });      
        setTmpProduct(response.data.product);
        bsModal.current.show();
      
      } catch (error) {
        console.error('取得單一產品資料失敗', error.response);
      }
    };
 
    //加入購物車
  const addCart = async (id, qty = 1) => {
    try {
      const data = { product_id: id, qty: qty };
      const response = await axios.post(`${API_BASE}api/${API_PATH}/cart`, { data });
      dispatch(fetchCart()); //更新 Header 的數量
      if (bsModal.current) {
        bsModal.current.hide();
      }
      console.log('加入購物車成功', response.data);
      dispatch(pushMessage({ text: `已將商品加入購物車`, type: "success" }));
      //alert('加入購物車成功');
    } catch (error) {
      //console.log("偵錯點：", error);
      console.error('加入購物車失敗', error.response);
      alert('加入購物車失敗');
  
    }
  }
    ;
    useEffect(() => {
      getProducts();
    }, []);
  
  
    return (
      <>
        <div className="container mt-4">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-3" key={product.id}>
                <div className="card">
                  <img 
                   src={product.imageUrl}
                   className="card-img-top"
                   alt={product.title}
                    style={{ 
                   height: '280px',   // 固定高度
                   width: '100%',     // 寬度建議設 100% 填滿 Bootstrap 的卡片
                   objectFit: 'cover', // 關鍵：自動裁切並填滿容器，這會切掉你的白邊
                   objectPosition: 'center' // 確保圖片內容從中間對齊裁切
                   }}
                 />
  <div className="card-body" style={{ maxHeight: '400px', minHeight: '300px' }}>
  <h5 className="card-title">{product.title}</h5>
  <p className="card-text"
  style={{
  whiteSpace: 'pre-line',
  display: '-webkit-box',
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '7.5em',
  lineHeight: '1.5em'
  }}>
  {product.description}
  </p>
                    <p className="card-text">
                      <strong>價格:</strong> {currency(product.price)} 元／{product.unit}
                    </p>
                    
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewMore(product.id)}
                    >
                      查看更多
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 單一產品 Modal --- */}
        <div className="modal fade" ref={modalRef} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{tempProduct.title}</h5>
                <button type="button" className="btn-close" onClick={() => bsModal.current.hide()}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <img className="img-fluid" src={tempProduct.imageUrl} alt={tempProduct.title} />
                  </div>
                  <div className="col-sm-6  text-start">
                    <span className="badge bg-primary mb-2">{tempProduct.category}</span>
                    <p>商品描述：<br/>{tempProduct.description}</p>
                    <p>商品內容：<br/>{tempProduct.content}</p>
                    <div className="h5">
                      <del className="h6 text-secondary">原價 {currency(tempProduct.origin_price)} 元 </del>
                      <span className="h5 text-danger font-weight-bold">  限時優惠 {currency(tempProduct.price)} 元</span>
                    </div>
                    {/* 數量選擇欄位 */}
                  <div className="input-group mb-3">
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setQty((prev) => prev + 1)}
                    >
                      +
                    </button>
                    <span className="input-group-text">{tempProduct.unit}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="text-muted me-auto">
                小計 <strong>{currency(tempProduct.price * qty)}</strong> 元
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addCart(tempProduct.id, qty)}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      </>);
  }
;

export default Products;
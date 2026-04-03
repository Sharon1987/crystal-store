import { useState, useEffect } from "react"; 
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom"; // 用來當「快去逛逛」的跳轉
import { currency } from "../../utils/filter";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../store/cartSlice"; // 用來同步 Header 數量
import { pushMessage } from "../../store/messageSlice"; // 用來顯示訂單送出成功或失敗的訊息
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH; 

function Cart() {
  const [cart, setCart] = useState({ carts: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // 控制表單顯示的狀態
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 用來下單成功後跳轉到訂單成功頁面
  const { register, handleSubmit, reset,watch,setValue, formState: { errors } } = useForm({ mode: "onChange",defaultValues: {
    shippingMethod: "宅配", // 預設為宅配
  } });
  const [couponCode, setCouponCode] = useState(""); // 儲存優惠券輸入內容
  // 監控配送方式與超商種類
  const watchShippingMethod = watch("shippingMethod");
  const watchCvsBrand = watch("cvsBrand");
  // 模擬的超商門市資料
  const MOCK_STORES = [
  { id: '977876', name: '十七街門市', address: '新竹市東區金山十七街1號 1 號', brand: '7-11' },
  { id: '920032', name: '千久門市', address: '新竹市東區民主路154號156號', brand: '7-11' },
  { id: '138158', name: '大遠百門市', address: '新竹市東區西門街105號', brand: '7-11' },
  { id: '158406', name: '公學門市', address: '新竹市東區建功一路93號', brand: '7-11' },
  { id: '922577', name: '友達五門市', address: '新竹市東區力行路23號6樓', brand: '7-11' },
  { id: '944326', name: '天湖門市', address: '新竹市東區明湖路180號', brand: '7-11' },
  { id: '921046', name: '鑫昌門市', address: '新竹市東區復興路34號1樓', brand: '7-11' },
  
  { id: '014334', name: '全家新竹向陽店', address: '新竹市東區明湖路646號', brand: 'FamilyMart' },
  { id: '011566', name: '全家新竹新興店', address: '新竹市東區南大路577號', brand: 'FamilyMart' },
  { id: '014144', name: '全家新竹元富店', address: '新竹市香山區元培街337號', brand: 'FamilyMart' },
  { id: '013835', name: '全家新竹大同店', address: '新竹市東區大同路16號', brand: 'FamilyMart' },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // 過濾門市邏輯：根據所選品牌 & 關鍵字
const filteredStores = MOCK_STORES.filter(store => 
  store.brand === (watchCvsBrand === '7-11' ? '7-11' : 'FamilyMart') &&
  (store.name.includes(searchQuery) || store.address.includes(searchQuery))
);

//當使用者點選某個門市
const handleSelectStore = (store) => {
  setValue("storeName", store.name);
  setValue("storeId", store.id);
  setValue("storeAddress", store.address); // 額外紀錄門市地址
  setIsModalOpen(false); // 關閉 Modal
};
  // 取得購物車列表
  const getCart = async () => {
    try {
      const url = `${API_BASE}api/${API_PATH}/cart`;
      const response = await axios.get(url);
      console.log(response.data.data)
      setCart(response.data.data);
      // 同步 Header 的數量
      dispatch(fetchCart());
      
    } catch (error) {
      console.error(error);
    }
  };

  // 更新數量 
  const updateCart = async (cartId, productId, qty) => {
    if (qty < 1) return;
    try {
      const url = `${API_BASE}api/${API_PATH}/cart/${cartId}`;
      const data = { product_id: productId, qty };
      await axios.put(url, { data });
      getCart();
    } catch (error) {
      //alert("更新數量失敗");
      dispatch(pushMessage({ text:error.response?.data?.message ||  "更新數量失敗", type: "danger" }));
    }
  };

  // 刪除單一品項
  const removeCartItem = async (id) => {
    try {
      const url = `${API_BASE}api/${API_PATH}/cart/${id}`;
      await axios.delete(url);
      getCart();
    } catch (error) {
      //alert("刪除失敗");
      dispatch(pushMessage({ text:error.response?.data?.message ||  "刪除失敗", type: "danger" }));
    }
  };

  // 清空購物車
  const deleteAllCart = async () => {
    if (!window.confirm("確定要清空購物車嗎？")) return;
    try {
      const url = `${API_BASE}api/${API_PATH}/carts`;
      await axios.delete(url);
      getCart();
    } catch (error) {
      //alert("清空失敗");
      dispatch(pushMessage({ text:error.response?.data?.message ||  "清空失敗", type: "danger" }));
    }
  };

// 套用優惠券
  const applyCoupon = async () => {
    if (!couponCode) {
      //alert("請輸入優惠券代碼");
      dispatch(pushMessage({ text: "請輸入優惠券代碼", type: "warning" }));
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}api/${API_PATH}/coupon`, {
        data: { code: couponCode },
      });
      if (res.data.success) {
        //alert("優惠券套用成功！");
        dispatch(pushMessage({ text: res.data.message || "優惠券套用成功", type: "success" }));
        getCart(); // 重新取得購物車，更新折扣後的金額
      } else {
        //alert(res.data.message);
        dispatch(pushMessage({ text: res.data.message || "優惠券套用失敗", type: "danger" }));
      }
    } catch (error) {
      //alert("套用失敗，請檢查代碼是否正確");
      dispatch(pushMessage({ text: error.response?.data?.message || "套用失敗，請檢查代碼是否正確", type: "danger" }));
    }
  };

  // 送出訂單 
  const onSubmit = async (data) => {
    //console.log(data)
    if (cart.carts.length === 0) {
      //alert("購物車是空的喔！");
      dispatch(pushMessage({ text:"購物車是空的喔!", type: "warning" }));
      return;
    }
  
    if (data.shippingMethod === "超商取貨") {
    watchCvsBrand && (
  <div className="mt-3">
    <button 
      type="button" 
      className="btn btn-outline-dark mb-3"
      onClick={() => setIsModalOpen(true)}
    >
      🔍 搜尋 {watchCvsBrand} 門市
    </button>

    {/* 顯示已選擇的門市資訊  */}
    {watch("storeName") && (
      <div className="alert alert-secondary p-2 small">
        <strong>已選門市：</strong> {watch("storeName")} ({watch("storeId")})<br/>
        <strong>門市地址：</strong> {watch("storeAddress")}
      </div>
    )}
    
    {/* 隱藏欄位用於表單驗證 */}
        <input type="hidden" {...register("storeName", { required: "請選擇門市" })} />
        <input type="hidden" {...register("storeName", { required: watchShippingMethod === "超商取貨" })} />
        <input type="hidden" {...register("storeId")} />
        <input type="hidden" {...register("storeAddress")} />
        {errors.storeName && <div className="text-danger small">{errors.storeName.message}</div>}
  </div>
      )
    }
      // 整理送出的地址內容
  let finalAddress = "";
  
  if (data.shippingMethod === "超商取貨") {
    // 如果是超商，把門市名稱、店號、地址組合成一個字串
    finalAddress = `【${data.cvsBrand} ${data.storeName}】(店號：${data.storeId}) 門市地址：${data.storeAddress}`;
    console.log("組合後的地址：", finalAddress);
  } else {
    // 如果是宅配，就直接用原本的地址欄位
    finalAddress = data.address;
  }
    const orderData = {
    user: {
      name: data.name,
      email: data.email,
      tel: data.tel,
      address: finalAddress, // 統一存入 address
    },
    message: `配送方式：${data.shippingMethod}。${data.message || ""}`,
  };

    try {
      setIsLoading(true);
      const url = `${API_BASE}api/${API_PATH}/order`;
      const res = await axios.post(url, { data: orderData });
        //alert(res.data.message);
      navigate(`/order-success/${res.data.orderId}`);
      reset(); // 清空表單
      getCart(); // 清空購物車畫面
      dispatch(pushMessage({ text: res.data.message || "訂單已送出", type: "success" }));
      
    } catch (error) {
      dispatch(pushMessage({ text:error.response?.data?.message ||  "送出訂單失敗", type: "danger" }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

    
  // --- 依不同狀況渲染畫面 ---

  // 如果購物車是空的
  if (cart.carts.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5 bg-light rounded-3 shadow-sm">
          <h2 className="mb-4">您的購物車目前是空的</h2>
          <p className="text-muted mb-4">挑選一些閃耀的水晶，讓它陪伴你吧！</p>
          <Link to="/products" className="btn btn-dark btn-lg px-5">
            快去逛逛
          </Link>
        </div>
      </div>
    );
  }

  // 如果購物車有東西  
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">購物車結帳</h1>

      {/* 購物車列表區 */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          <div className="text-end mb-3">
            <button className="btn btn-outline-danger" onClick={deleteAllCart} disabled={cart?.carts?.length === 0}>
              清空購物車
            </button>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>操作</th>
                <th>品名</th>
                <th style={{ width: "150px" }}>數量</th>
                <th className="text-end">小計</th>
              </tr>
            </thead>
            <tbody>
              {cart?.carts?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeCartItem(item.id)}>
                      移除
                    </button>
                  </td>
                  <td>{item.product.title}</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <input 
                        type="number" 
                        className="form-control" 
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateCart(item.id, item.product.id, parseInt(e.target.value))}
                      />
                      <span className="input-group-text">/{item.product.unit}</span>
                    </div>
                  </td>
                  <td className="text-end">{currency(item.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* 修改點：優化折扣顯示邏輯 */}
              <tr>
                <td colSpan="3" className="text-end">總計</td>
                <td className="text-end">{currency(cart.total || 0)}</td>
              </tr>
              {cart.final_total !== cart.total && (
                <tr className="text-success fw-bold">
                  <td colSpan="3" className="text-end">
                    <i className="bi bi-tag-fill me-1"></i> 已套用優惠券
                  </td>
                  <td className="text-end">-{currency(cart.total - cart.final_total)}</td>
                </tr>
              )}
              <tr>
                <td colSpan="3" className="text-end fw-bold">應付總額</td>
                <td className="text-end fw-bold text-danger" style={{ fontSize: '1.25rem' }}>
                  {currency(cart.final_total || 0)}
                </td>
              </tr>
            </tfoot>
            </table>
    <div className="d-flex justify-content-end mb-3">
    <div className="col-md-4"> 
    
    {/*優惠券輸入 */}
    <div className="input-group" style={{ maxWidth: "300px" }}>
      <input 
        type="text" 
        className="form-control" 
        placeholder="請輸入優惠券代碼" 
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button 
        className="btn btn-outline-dark" 
        type="button" 
        onClick={applyCoupon}
      >
        套用優惠券
      </button>
    </div>
</div>
   
    
</div></div> {/* 下一步按鈕 */}
    {!showForm && (
      <div className="text-center">
        <button 
          className="btn btn-dark btn-lg w-80 py-3" 
          onClick={() => setShowForm(true)}
        >
          下一步：填寫收件資料
        </button>
      </div>
    )}
  </div>

      {/* 結帳表單區 */}
      {/* 收件人表單區：點擊按鈕後才顯示 */}
      {showForm && (
          <div className="row justify-content-center mt-5">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center mb-4">收件人資訊</h3>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" type="email" className="form-control" placeholder="請輸入 Email" 
              {...register("email", { 
                required: "Email 是必填項目", 
                pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確" } 
              })} />
            {errors.email && <div className="text-danger small">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">姓名</label>
            <input id="name" type="text" className="form-control" placeholder="請輸入姓名" 
              {...register("name", { required: "姓名是必填項目" })} />
            {errors.name && <div className="text-danger small">{errors.name.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">電話</label>
            <input id="tel" type="tel" className="form-control" placeholder="請輸入電話" 
              {...register("tel", { 
                required: "電話是必填項目", 
                minLength: { value: 8, message: "至少 8 碼" } 
              })} />
            {errors.tel && <div className="text-danger small">{errors.tel.message}</div>}
          </div>

           {/* <div className="mb-3">
            <label htmlFor="address" className="form-label">地址</label>
            <input id="address" type="text" className="form-control" placeholder="請輸入地址" 
              {...register("address", { required: "地址是必填項目" })} />
            {errors.address && <div className="text-danger small">{errors.address.message}</div>}
          </div> 
           */}
            
          {/* 配送方式選擇 */}
<div className="mb-3">
  <label className="form-label">配送方式</label>
  <select 
    className="form-select" 
    {...register("shippingMethod", { required: "請選擇配送方式" })}
  >
    <option value="宅配">宅配</option>
    <option value="超商取貨">超商取貨</option>
  </select>
</div>

{/* --- 超商取貨特有欄位 --- */}
{watchShippingMethod === "超商取貨" && (
  <div className="card bg-light p-3 mb-3">
    <div className="mb-3">
      <label className="form-label">選擇超商</label>
      <select 
        className="form-select" 
        {...register("cvsBrand", { required: "請選擇超商種類" })}
      >
        <option value="">請選擇</option>
        <option value="7-11">7-11</option>
        <option value="全家">全家</option>
      </select>
      {errors.cvsBrand && <div className="text-danger small">{errors.cvsBrand.message}</div>}
    </div>

   {/* 在 watchShippingMethod === "超商取貨" 的區塊內 */}
{watchCvsBrand && (
  <div className="mt-3">
    <button 
      type="button" 
      className="btn btn-outline-dark mb-3"
      onClick={() => setIsModalOpen(true)}
    >
      🔍 搜尋 {watchCvsBrand} 門市
    </button>

    {/* 顯示已選擇的門市資訊 (唯讀) */}
    {watch("storeName") && (
      <div className="alert alert-secondary p-2 small">
        <strong>已選門市：</strong> {watch("storeName")} ({watch("storeId")})<br/>
        <strong>門市地址：</strong> {watch("storeAddress")}
      </div>
    )}
    
    {/* 隱藏欄位用於表單驗證 */}
    <input type="hidden" {...register("storeName", { required: "請選擇門市" })} />
    {errors.storeName && <div className="text-danger small">{errors.storeName.message}</div>}
  </div>
)}
  </div>
)}

{/* --- 宅配特有欄位 --- */}
{watchShippingMethod === "宅配" && (
  <div className="mb-3">
    <label htmlFor="address" className="form-label">收件地址</label>
    <input 
      id="address" 
      type="text" 
      className="form-control" 
      placeholder="請輸入收件地址" 
      {...register("address", { required: "地址是必填項目" })} 
    />
    {errors.address && <div className="text-danger small">{errors.address.message}</div>}
  </div>
)}

          <div className="mb-3">
            <label htmlFor="message" className="form-label">留言 (選填)</label>
            <textarea id="message" className="form-control" rows="3" {...register("message")}></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-danger w-100 py-2" disabled={isLoading || cart?.carts?.length === 0}>
              {isLoading ? "處理中..." : "確認送出訂單"}
            </button>
          </div>
        </form>
      </div>)
      
      }
      {/* 模擬門市搜尋 Modal */}
{isModalOpen && (
  <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">搜尋 {watchCvsBrand} 門市</h5>
          <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
        </div>
        <div className="modal-body">
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="輸入門市名稱或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredStores.length > 0 ? (
              filteredStores.map(store => (
                <button
                  key={store.id}
                  type="button"
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectStore(store)}
                >
                  <div className="fw-bold">{store.name} <span className="badge bg-secondary">{store.id}</span></div>
                  <div className="small text-muted">{store.address}</div>
                </button>
              ))
            ) : (
              <p className="text-center py-3">找不到相關門市</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
    
  );


}

export default Cart;
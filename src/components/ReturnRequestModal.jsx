import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const ReturnRequestModal = ({ isOpen, onClose }) => {
  // 1. 初始化 React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 2. 模擬送出表單
  const onSubmit = (data) => {
    console.log("表單資料：", data);
    // 模擬 Toast 提示
    alert("已送出申請！我們將儘快與您聯繫。");
    reset(); // 重設表單
    onClose(); // 關閉 Modal
  };

  // 如果 Modal 沒開啟則不渲染
  if (!isOpen) return null;

  // --- 樣式設定 ---
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    textAlign: 'left',
  };

  const inputGroupStyle = {
    marginBottom: '16px',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '15px',
    textAlign: 'left',
  };

  const errorTextStyle = {
    color: '#d9534f',
    fontSize: '12px',
    marginTop: '4px',
    textAlign: 'left',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      {/* 點擊內容區不要關閉 Modal */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px', textAlign: 'left' }}>
          退換貨申請表單
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 顧客姓名 */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>顧客姓名</label>
            <input
              style={{ ...inputStyle, borderColor: errors.name ? '#d9534f' : '#ccc' }}
              {...register("name", { required: "請填寫顧客姓名" })}
              placeholder="請輸入完整姓名"
            />
            {errors.name && <p style={errorTextStyle}>{errors.name.message}</p>}
          </div>

          {/* 連絡電話 */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>連絡電話</label>
            <input
              style={{ ...inputStyle, borderColor: errors.phone ? '#d9534f' : '#ccc' }}
              {...register("phone", { 
                required: "請填寫連絡電話",
                pattern: { value: /^[0-9+-\s()]*$/, message: "請輸入有效的電話號碼" }
              })}
              placeholder="請輸入連絡電話"
            />
            {errors.phone && <p style={errorTextStyle}>{errors.phone.message}</p>}
          </div>

          {/* 訂單編號 */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>訂單編號</label>
            <input
              style={{ ...inputStyle, borderColor: errors.orderId ? '#d9534f' : '#ccc' }}
              {...register("orderId", { required: "請填寫訂單編號" })}
              placeholder="例如：#2026010101"
            />
            {errors.orderId && <p style={errorTextStyle}>{errors.orderId.message}</p>}
          </div>

          {/* 商品名稱 */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>商品名稱</label>
            <input
              style={{ ...inputStyle, borderColor: errors.productName ? '#d9534f' : '#ccc' }}
              {...register("productName", { required: "請填寫欲退換貨之商品名稱" })}
              placeholder="請輸入商品名稱與規格"
            />
            {errors.productName && <p style={errorTextStyle}>{errors.productName.message}</p>}
          </div>

          {/* 退換貨理由 */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>退換貨理由</label>
            <textarea
              style={{ ...inputStyle, height: '100px', resize: 'none', borderColor: errors.reason ? '#d9534f' : '#ccc' }}
              {...register("reason", { required: "請簡述退換貨原因" })}
              placeholder="請詳細說明商品狀況..."
            />
            {errors.reason && <p style={errorTextStyle}>{errors.reason.message}</p>}
          </div>

          {/* 按鈕區塊 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ ...buttonStyle, backgroundColor: '#eee', color: '#666' }}
            >
              取消
            </button>
            <button 
              type="submit" 
              style={{ ...buttonStyle, backgroundColor: '#8b5e3c', color: '#fff' }}
            >
              送出申請
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReturnRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReturnRequestModal;
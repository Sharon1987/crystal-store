import React, { useState } from 'react';
import ReturnRequestModal from '../../components/ReturnRequestModal';

function ReturnAndExchangePolicy() {
 const [isModalOpen, setIsModalOpen] = useState(false);

  // 樣式設定
  const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'left',
    color: '#444',
  };

  const sectionStyle = { marginBottom: '32px', textAlign: 'left' };
  //const titleStyle = { fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '8px', textAlign: 'left' };
  const itemTitleStyle = { fontSize: '16px', fontWeight: 'bold', margin: '16px 0 4px 0', color: '#555', textAlign: 'left' };
  const contentStyle = { fontSize: '15px', lineHeight: '1.8', margin: '0 0 8px 0', textAlign: 'left' };

  // 按鈕樣式
  const btnStyle = {
    backgroundColor: '#8b5e3c',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'inline-block',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'left' }}>
        退換貨須知 / Return Policy
      </h1>

      <div style={sectionStyle}>
        <p style={contentStyle}>我們希望每一件商品都能被好好喜歡，若有需要調整，也提供退換貨服務。</p>

        <p style={itemTitleStyle}>✔ 申請方式</p>
        <p style={contentStyle}>請先點擊下方按鈕填寫「退換貨申請表單」，並依指示寄回商品。（未填寫表單直接寄回，將無法受理）</p>

        {/* 觸發 Modal 的按鈕 - 放置在申請方式下方 */}
        <button 
          onClick={() => setIsModalOpen(true)}
          style={btnStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#6f4a2f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#8b5e3c'}
        >
          立即填寫退換貨申請表單
        </button>
      </div>

      <div style={sectionStyle}>
        <p style={itemTitleStyle}>✔ 申請期限</p>
        <p style={contentStyle}>商品到貨後 <strong>7 日內</strong> 可申請退換貨。</p>

        <p style={itemTitleStyle}>✔ 退換貨條件</p>
        <p style={contentStyle}>・商品需為全新未配戴狀態</p>
        <p style={contentStyle}>・包裝完整（含配件、贈品）</p>
        <p style={contentStyle}>・無明顯使用痕跡或損壞</p>

        <p style={{ ...itemTitleStyle, color: '#d9534f' }}>✖ 無法退換貨情況</p>
        <p style={contentStyle}>・已配戴或使用過、人為損壞或刮傷、超過 7 日鑑賞期、客製化商品（除瑕疵外）。</p>
      </div>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'left' }}>
        <p style={{ fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
          ✧ 小提醒：每一件飾品在出貨前都會仔細檢查，也希望在您手中，能被溫柔對待。
        </p>
      </footer>

      {/* 渲染Modal元件 */}
      <ReturnRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  
  );
}

export default ReturnAndExchangePolicy;
import React from 'react';

const ShoppingInfo = () => {
  // 定義樣式
  const leftAlignStyle = { textAlign: 'left', width: '100%' };
  const sectionStyle = { marginBottom: '32px', textAlign: 'left' };
  const titleStyle = { fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#333' };
  const listStyle = { paddingLeft: '20px', margin: '0', listStyleType: 'disc' };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', color: '#444' }}>
      
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', ...leftAlignStyle }}>
        購物須知</h1>

      <p style={{ marginBottom: '40px', lineHeight: '1.8', ...leftAlignStyle }}>
        歡迎來到本店，感謝你選擇這份來自天然水晶的溫柔能量。<br />
        每一件商品皆為精心挑選與手工製作，期望在日常生活中陪伴你，成為一份安定與療癒的存在。
      </p>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>關於天然水晶</h2>
        <p style={{ lineHeight: '1.8' }}>
          由於水晶屬於天然礦石，每顆珠子的紋理、色澤與內含物皆略有不同，可能會有冰裂、棉絮或細微礦缺，皆屬自然現象，並非瑕疵。手工製作商品亦可能存在些微手作痕跡，完美主義者請審慎考慮後再下單。
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>訂單與出貨</h2>
        <ul style={listStyle}>
          <li style={{ marginBottom: '8px' }}>訂單成立後約 1–3 個工作天內出貨（不含例假日）</li>
          <li style={{ marginBottom: '8px' }}>客製商品依製作天數另行通知</li>
          <li>出貨後將提供物流單號供查詢</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>付款與配送</h2>
        <ul style={listStyle}>
          <li style={{ marginBottom: '8px' }}>提供信用卡、轉帳及超商取貨付款</li>
          <li style={{ marginBottom: '8px' }}>配送方式：宅配 / 超商取貨</li>
          <li>實際到貨時間依物流狀況而定</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>退換貨說明</h2>
        <ul style={listStyle}>
          <li style={{ marginBottom: '8px' }}>享有 7 天鑑賞期（非試用期）</li>
          <li style={{ marginBottom: '8px' }}>退貨商品需保持完整包裝與未使用狀態</li>
          <li>客製化商品恕不接受退換貨</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>注意事項</h2>
        <ul style={listStyle}>
          <li style={{ marginBottom: '8px' }}>商品顏色可能因螢幕顯示略有差異</li>
          <li style={{ marginBottom: '8px' }}>請填寫正確收件資訊，以避免配送延誤</li>
          <li>超商未取貨將列入黑名單並限制下單</li>
        </ul>
      </div>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee', ...leftAlignStyle }}>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '14px' }}>
          若有任何疑問或需要協助，歡迎隨時與我們聯繫。<br />
          願這份來自水晶的微光，靜靜陪伴你的每一天。
        </p>
      </footer>
    </div>
  );
};
export default ShoppingInfo;
import { Link, useParams } from 'react-router-dom';

function OrderSuccess() {
  const { orderId } = useParams(); // 從網址取得 :orderId

  return (
    <div className="container py-5 text-center"  style={{ background: '#f8f8f8' }}>
      <div className="card shadow-sm border-0 p-5"  style={{ background: '#f8f8f8' }}>
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
        </div>
        <h2 className="fw-bold mb-3">感謝您的訂購！</h2>
        <p className="text-muted mb-4">我們已收到您的訂單，將會盡快為您處理。</p>
        
        <div className="bg-white p-3 rounded mb-4 border">
          <p className="mb-1 small text-muted">您的訂單編號</p>
          <h4 className="text-dark fw-bold">{orderId}</h4>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <Link to="/products" className="btn btn-dark px-4 py-2">
            繼續購物
          </Link>
          <Link to="/" className="btn btn-outline-dark px-4 py-2">
            回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
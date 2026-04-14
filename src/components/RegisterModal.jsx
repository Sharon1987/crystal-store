import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterModal = ({ show, onHide, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. 基本驗證：檢查密碼一致性
    if (formData.password !== formData.confirmPassword) {
      setError('兩次輸入的密碼不一致！');
      return;
    }

    setIsLoading(true);
    try {
      // --- 此處應替換為實際的註冊 API ---
      // const res = await axios.post(`${API_BASE}api/register`, formData);
      
      // 模擬 API 延遲
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('註冊成功！現在請進行登入。');
      onHide();
      switchToLogin(); // 註冊成功後切換到登入視窗
    } catch (err) {
      setError(err.response?.data?.message || '註冊失敗，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onHide}></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header" style={{ background: '#e6f7ff' }}>
              <h5 className="modal-title fw-bold">加入會員</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleRegister}>
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                
                <div className="mb-3">
                  <label className="form-label small text-muted">姓名</label>
                  <input type="text" id="name" className="form-control" placeholder="您的姓名" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small text-muted">電子郵件</label>
                  <input type="email" id="email" className="form-control" placeholder="example@mail.com" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small text-muted">密碼</label>
                  <input type="password" id="password" className="form-control" placeholder="至少 6 位字元" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small text-muted">確認密碼</label>
                  <input type="password" id="confirmPassword" className="form-control" placeholder="再次輸入密碼" onChange={handleChange} required />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? <span className="spinner-border spinner-border-sm"></span> : '送出註冊'}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer bg-light border-0 py-2">
              <p className="small text-muted mb-0">已經有帳號了？ <button className="btn btn-link btn-sm p-0 text-dark fw-bold text-decoration-none" onClick={switchToLogin}>立即登入</button></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func.isRequired
};

export default RegisterModal;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext'; // 匯入 AuthContext
import { fetchCart } from '../store/cartSlice';   // 匯入 Redux Action
import { pushMessage } from '../store/messageSlice'; // 匯入訊息 Action
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH; 

const LoginModal = ({ show, onHide, switchToRegister ,switchToLogin, onLoginSuccess, isAdminMode = false}) => {
  const dispatch = useDispatch();
  const { login } = useAuth(); // 取得 AuthContext 的登入函式

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 處理登入邏輯
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 登入 API
      const res = await axios.post(`${API_BASE}/admin/signin`, {
        username: email, 
        password: password
      });

      // 取得 token 與到期日
      const { token, expired } = res.data;

      // 存 Token到 Cookie，並設定過期時間
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;

      // 更新 Context 狀態
      login({ email: email, token: token }); 
      dispatch(pushMessage({ text:"登入成功！", type: "success" }));
      // 觸發 Redux 更新購物車
      dispatch(fetchCart());
      onHide(); 
      //alert('登入成功！');
      
      if (onLoginSuccess) {
        onLoginSuccess(); 
      }
    } catch (err) {
      //console.error('登入失敗:', err);
      // API 回傳的錯誤訊息
      const message = err.response?.data?.message || '帳號或密碼錯誤，請再試一次。';
      //setError(message);
      dispatch(pushMessage({ text: message, type: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;
  return (
    <>
      {/* 遮罩背景 (Backdrop) */}
      <div className="modal-backdrop fade show" onClick={onHide}></div>

      {/* Modal 實體 */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg border-0">
            
            {/* Modal Header */}
           {/* Modal Header - 根據 isAdminMode 切換管理者登入或是會員登入 */}
            <div className="modal-header" style={{ background: '#fff7e6' }}>
              <h5 className="modal-title fw-bold">
                {isAdminMode ? '管理者登入' : '會員登入'}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onHide}
                disabled={isLoading}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <form onSubmit={handleLogin}>
                
                {/* 錯誤訊息提示 */}
                {error && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {error}
                  </div>
                )}

                {/* 電子郵件輸入框 */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label small text-muted">電子郵件 (Email)</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* 密碼輸入框 */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label small text-muted">密碼 (Password)</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* 登入按鈕 */}
                <div className="d-grid gap-2 pt-2">
                  <button 
                    type="submit" 
                    className="btn btn-dark d-flex align-items-center justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        正在驗證...
                      </>
                    ) : (
                      '登入'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Modal Footer - 管理員模式隱藏整個 Footer */}
            {!isAdminMode && (
              <div className="modal-footer bg-light border-0 py-2">
                <button 
                  className="btn btn-link btn-sm p-0 text-dark fw-bold text-decoration-none" 
                  onClick={switchToRegister}
                >
                  立即註冊
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
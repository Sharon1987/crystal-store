import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from 'bootstrap';
import { useDispatch } from "react-redux";
import { pushMessage } from "../../store/messageSlice"; // 匯入訊息 Action
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_COUPON = {
  title: "",
  is_enabled: 0,
  percent: 100,
  due_date: Math.floor(Date.now() / 1000), // 預設今天
  code: "",
};

function AdminCoupon() {
  const [coupons, setCoupons] = useState([]);
  const [tempCoupon, setTempCoupon] = useState(INITIAL_COUPON);
  const [isNew, setIsNew] = useState(false); // 判斷是新增還是編輯

  const couponModalRef = useRef(null);
  const delCouponModalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    couponModalRef.current = new bootstrap.Modal("#couponModal");
    delCouponModalRef.current = new bootstrap.Modal("#delCouponModal");
    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    try {
      const res = await axios.get(`${API_BASE}api/${API_PATH}/admin/coupons?page=${page}`);
      setCoupons(res.data.coupons);
    } catch (error) {
      //alert("取得優惠券失敗");
      console.log(error.response);
      dispatch(pushMessage({ text:"取得優惠券失敗", type: "danger" }));
    }
  };

  const openModal = (isNew, item) => {
    setIsNew(isNew);
    if (isNew) {
      setTempCoupon(INITIAL_COUPON);
    } else {
      setTempCoupon({ ...item });
    }
    couponModalRef.current.show();
  };

  const openDelModal = (item) => {
    setTempCoupon(item);
    delCouponModalRef.current.show();
  };

  const updateCoupon = async () => {
    let url = `${API_BASE}api/${API_PATH}/admin/coupon`;
    let method = 'post';

    if (!isNew) {
      url = `${API_BASE}api/${API_PATH}/admin/coupon/${tempCoupon.id}`;
      method = 'put';
    }

    try {
      await axios[method](url, { data: tempCoupon });
      //alert(isNew ? "新增成功" : "更新成功");
      dispatch(pushMessage({ text: isNew ? "新增成功" : "更新成功", type: "success" }));
      couponModalRef.current.hide();
      getCoupons();
    } catch (error) {
      //alert("操作失敗");
      console.log(error.response);
      dispatch(pushMessage({ text:"操作失敗", type: "danger" })); 
    }
  };

  const deleteCoupon = async () => {
    try {
      await axios.delete(`${API_BASE}api/${API_PATH}/admin/coupon/${tempCoupon.id}`);
      //alert("刪除成功");
      dispatch(pushMessage({ text:"刪除成功", type: "success" }));
      delCouponModalRef.current.hide();
      getCoupons();
    } catch (error) {
      //alert("刪除失敗");
      console.log(error.response);
      dispatch(pushMessage({ text:"刪除失敗", type: "danger" })); 
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-4">
        <h2>優惠券管理</h2>
        <button className="btn btn-primary" onClick={() => openModal(true)}>建立新優惠券</button>
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>優惠碼</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.percent}%</td>
              <td>{new Date(item.due_date * 1000).toLocaleDateString()}</td>
              <td>{item.code}</td>
              <td>
                {item.is_enabled ? <span className="text-success">啟用</span> : <span className="text-muted">未啟用</span>}
              </td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(false, item)}>編輯</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => openDelModal(item)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coupon Modal */}
      <div className="modal fade" id="couponModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">{isNew ? '新增優惠券' : '編輯優惠券'}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">標題</label>
                <input type="text" className="form-control" id="title" placeholder="請輸入標題"
                  value={tempCoupon.title} onChange={(e) => setTempCoupon({ ...tempCoupon, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="coupon_code" className="form-label">優惠碼</label>
                <input type="text" className="form-control" id="coupon_code" placeholder="請輸入優惠碼"
                  value={tempCoupon.code} onChange={(e) => setTempCoupon({ ...tempCoupon, code: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="due_date" className="form-label">到期日</label>
                <input type="date" className="form-control" id="due_date"
                  value={new Date(tempCoupon.due_date * 1000).toISOString().split('T')[0]}
                  onChange={(e) => setTempCoupon({ ...tempCoupon, due_date: Math.floor(new Date(e.target.value).getTime() / 1000) })} />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">折扣百分比 (%)</label>
                <input type="number" className="form-control" id="price" placeholder="請輸入折扣百分比"
                  value={tempCoupon.percent} onChange={(e) => setTempCoupon({ ...tempCoupon, percent: Number(e.target.value) })} />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="is_enabled"
                    checked={!!tempCoupon.is_enabled} onChange={(e) => setTempCoupon({ ...tempCoupon, is_enabled: e.target.checked ? 1 : 0 })} />
                  <label className="form-check-label" htmlFor="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" className="btn btn-primary" onClick={updateCoupon}>確認</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="delCouponModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">刪除優惠券</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              是否刪除 <strong className="text-danger">{tempCoupon.title}</strong> (刪除後將無法恢復)。
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" className="btn btn-danger" onClick={deleteCoupon}>確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoupon;
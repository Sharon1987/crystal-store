import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from 'bootstrap';
import Pagination from "../../components/Pagination";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../store/messageSlice"; // 匯入訊息 Action
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const orderModalRef = useRef(null);
  const delOrderModalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    orderModalRef.current = new bootstrap.Modal("#orderModal");
    delOrderModalRef.current = new bootstrap.Modal("#delOrderModal");
    getOrders();
  }, []);

  // 取得訂單列表
  const getOrders = async (page = 1) => {
    try {
      const res = await axios.get(`${API_BASE}api/${API_PATH}/admin/orders?page=${page}`);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      //alert("取得訂單失敗");
      dispatch(pushMessage({ text:"取得訂單失敗", type: "danger" }));
    }
  };

  // 修改訂單（主要是改付款狀態或內容）
  const updateOrder = async (order) => {
    try {
      await axios.put(`${API_BASE}api/${API_PATH}/admin/order/${order.id}`, {
        data: order
      });
      //alert("更新訂單成功");
      dispatch(pushMessage({ text:"更新訂單成功", type: "success" }));
      orderModalRef.current.hide();
      getOrders();
    } catch (error) {
      //alert("更新失敗");
      dispatch(pushMessage({ text:"更新失敗", type: "danger" }));
    }
  };

  // 刪除單一訂單
  const deleteOrder = async () => {
    try {
      await axios.delete(`${API_BASE}api/${API_PATH}/admin/order/${tempOrder.id}`);
      //alert("刪除成功");
      dispatch(pushMessage({ text:"刪除成功", type: "success" }));
      delOrderModalRef.current.hide();
      getOrders();
    } catch (error) {
      //alert("刪除失敗");
      dispatch(pushMessage({ text:"刪除失敗", type: "danger" })); 
    }
  };

  const openOrderModal = (order) => {
    setTempOrder({ ...order });
    orderModalRef.current.show();
  };

  const openDelModal = (order) => {
    setTempOrder(order);
    delOrderModalRef.current.show();
  };

  return (
    <div className="container">
      <h2>訂單管理</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>下單時間</th>
            <th>Email</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id} className={!item.is_paid ? 'text-secondary' : ''}>
              <td>{new Date(item.create_at * 1000).toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 使用 24 小時制
  })}</td>
              <td>{item.user.email}</td>
              <td>{item.total}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.is_paid}
                    onChange={() => updateOrder({ ...item, is_paid: !item.is_paid })}
                  />
                  {item.is_paid ? <span className="text-success">已付款</span> : "未付款"}
                </div>
              </td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => openOrderModal(item)}>檢視</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => openDelModal(item)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
      <div className="d-flex justify-content-center mt-5">
        <Pagination 
          pagination={pagination} 
          onChangePage={getOrders} 
        />
      </div>
     

      {/* 刪除 Modal */}
      <div id="delOrderModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">刪除訂單</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              是否刪除訂單編號：<strong className="text-danger">{tempOrder.id}</strong> (刪除後將無法恢復)。
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" className="btn btn-danger" onClick={deleteOrder}>確認刪除</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 檢視/編輯 Modal (簡版) */}
      <div id="orderModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">訂單詳情</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {tempOrder.user && (
                <div className="row">
                  <div className="col-12">
                    <h5>客戶資料</h5>
                    <p>姓名：{tempOrder.user.name}</p>
                    <p>電話：{tempOrder.user.tel}</p>
                    <p>地址：{tempOrder.user.address}</p>
                    <hr />
                    <h5>選購商品</h5>
                    <ul className="list-unstyled">
                      {Object.values(tempOrder.products).map((p) => (
                        <li key={p.id}>
                          {p.product.title} / {p.qty} {p.product.unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
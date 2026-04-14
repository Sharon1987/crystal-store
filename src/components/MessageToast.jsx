import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMessage } from "../store/messageSlice";
import { useEffect } from "react";

function MessageToast() {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();
  // 設定自動消失邏輯
  useEffect(() => {
    // 如果目前有訊息在畫面上
    if (messages.length > 0) {
      // 取得最舊的那則訊息 ID (即陣列的第一筆)
      const lastMessageId = messages[messages.length - 1].id;

      // 設定 1 秒後自動移除該訊息
      const timer = setTimeout(() => {
        dispatch(removeMessage(lastMessageId));
      }, 1000); 

      // 清除定時器 
      return () => clearTimeout(timer);
    }
  }, [messages, dispatch]);
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1500 }}>
      {messages.map((msg) => (
        <div key={msg.id} className={`toast show align-items-center text-white bg-${msg.type} border-0`} role="alert">
          <div className="d-flex">
            <div className="toast-body">{msg.text}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => dispatch(removeMessage(msg.id))}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageToast;
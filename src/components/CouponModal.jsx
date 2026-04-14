/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useRef } from 'react';
import * as bootstrap from 'bootstrap';
//import { useDispatch } from 'react-redux';
//import { pushMessage } from '../store/messageSlice';  
import 'bootstrap/dist/css/bootstrap.min.css';

function CouponModal({ coupon, onCopy }) {
  const modalRef = useRef(null);
  const bsModal = useRef(null);
  //const dispatch = useDispatch();

  useEffect(() => {
  // 確保 DOM 已經存在
  if (modalRef.current) {
    if (!bsModal.current) {
      bsModal.current = new bootstrap.Modal(modalRef.current, {
        backdrop: 'static', 
        keyboard: false
      });
    }

    if (coupon) {
      setTimeout(() => {
        bsModal.current.show();
      }, 100);
    }
  }
}, [coupon]);

  const handleCopy = () => {
    if (coupon?.code) {
      navigator.clipboard.writeText(coupon.code);
      if (onCopy) onCopy(); // 觸發父層的 Toast
      //dispatch(pushMessage({ text: "優惠碼已複製！", type: "success" }));
      bsModal.current.hide(); // 複製後自動關閉 Modal
    }
  };

 return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
          {coupon && (
            <>
              <div className="modal-header border-0 justify-content-end pb-0">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center p-4 pt-0">
                <div className="mb-3">
                  <span className="badge rounded-pill bg-danger px-3 py-2">SPECIAL GIFT</span>
                </div>
                <h2 className="fw-bold mb-2">{coupon.title}</h2>
                <div className="display-4 fw-bold text-dark mb-3">
                  {coupon.percent}<small className="h4 text-muted">% OFF</small>
                </div>
                <p className="text-muted small mb-4">有效期至：{coupon.due_date}</p>
                
                <div className="bg-light p-3 rounded-3 d-flex align-items-center justify-content-between border border-dashed">
                  <code className="h5 mb-0 text-dark fw-bold ms-2">{coupon.code}</code>
                  <button className="btn btn-dark btn-sm px-4 rounded-pill" onClick={handleCopy}>
                    複製領取
                  </button>
                </div>
              </div>
              <div className="modal-footer border-0"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default CouponModal;

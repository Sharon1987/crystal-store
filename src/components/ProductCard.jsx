import React, { useState } from "react";
import PropTypes from "prop-types";
//import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { pushMessage } from "../store/messageSlice"; // 匯入訊息 Action
const ProductCard = ({ product, addToCart }) => {
  const [isLoading, setIsLoading] = useState(false); // 新增讀取狀態
  const dispatch = useDispatch();
  const handleAddToCart = async () => {

    //加入購物車
    setIsLoading(true);
    try {
      //console.log("正在加入商品 ID:", product.id);
      await addToCart(product.id, 1);
      //console.log("加入成功！Redux觸發更新");
      dispatch(pushMessage({ text: "已加入購物車！", type: "success" }));
    } catch (error) {
      //console.error("加入失敗:", error);
      console.error("加入失敗:", error.response);
      dispatch(pushMessage({ text: "加入購物車失敗，請稍後再試！", type: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      {/* 商品圖片 */}
      <div className="overflow-hidden" style={{ height: "280px" }}>
        <img
          src={product.imageUrl || product.img}
          alt={product.title || product.name}
          className="card-img-top product-img h-100 object-fit-cover"
        />
      </div>

      {/* 商品內容 */}
      <div className="card-body text-center d-flex flex-column">
        <h6 className="card-title mb-2 text-truncate">
          {product.title || product.name}
        </h6>

        <p className="text-muted small mb-3">
          NT$ {product.price}
        </p>

        {/* 加入購物車按鈕 */}
        <button
          className="btn btn-dark mt-auto add-cart-btn d-flex align-items-center justify-content-center"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              處理中...
            </>
          ) : (
            "加入購物車"
          )}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { pushMessage } from "../../store/messageSlice"; // 匯入訊息 Action
import ProductModal from "../../components/ProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";
import Pagination from "../../components/Pagination";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH; 

const INITIAL_TEMPLATE_DATA = {
  id: "", title: "", category: "", origin_price: "", price: "",
  unit: "", description: "", content: "", is_enabled: false,
  imageUrl: "", imagesUrl: [],
};

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState('');
  const [pagination, setPagination] = useState({});

  const productModalRef = useRef(null);
  const delProductModalRef = useRef(null);
  const dispatch = useDispatch();

  // 1. 初始化 Modal
  useEffect(() => {
    productModalRef.current = new bootstrap.Modal("#productModal");
    delProductModalRef.current = new bootstrap.Modal("#delProductModal");
  }, []);

  // 2. 權限檢查
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    if (!token) {
      //alert("請先登入管理員帳號");
      dispatch(pushMessage({ text: "請先登入管理員帳號", type: "danger" }));  
      navigate("/");
      return;
    }

    axios.defaults.headers.common['Authorization'] = token;
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      await axios.post(`${API_BASE}api/user/check`);
      getProducts();
    } catch (error) {
      //alert("驗證過期，請重新登入");
      dispatch(pushMessage({ text: "驗證過期，請重新登入", type: "danger" }));  
      navigate("/");
    }
  };

  // --- 產品邏輯函式 ---

  const getProducts = async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE}api/${API_PATH}/admin/products?page=${page}`);
      setProducts(Object.values(response.data.products));
      setPagination(response.data.pagination);
    } catch (error) {
      //  console.error('取得產品清單失敗', error);
      dispatch(pushMessage({ text: "取得產品清單失敗", type: "danger" }));
    }
  };

  const openModal = (type, product) => {
    setModalType(type);
    if (type === 'create') {
      setTempProduct(INITIAL_TEMPLATE_DATA);
    } else {
      setTempProduct({ ...product });
    }
    productModalRef.current.show();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTempProduct({
      ...tempProduct,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
    });
  };

  const handleModalImageChange = (index, value) => {
    setTempProduct((prevData) => {
      const newImages = prevData.imagesUrl ? [...prevData.imagesUrl] : [];
      newImages[index] = value;
      return { ...prevData, imagesUrl: newImages };
    });
  };

  const addProduct = async () => {
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, { data: tempProduct });
      //alert('新增商品成功');
      dispatch(pushMessage({ text: "新增商品成功", type: "success" }));
      getProducts();
      closeModal();
    } catch (error) {
      //alert('新增商品失敗');
      dispatch(pushMessage({ text: "新增商品失敗", type: "danger" }));  
    }
  };

  const editProduct = async (id) => {
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/admin/product/${id}`, { data: tempProduct });
      //alert('編輯商品成功');
      dispatch(pushMessage({ text: "編輯商品成功", type: "success" })); 
      getProducts();
      closeModal();
    } catch (error) {
      //alert(`編輯失敗：${error.response?.data?.message.join(', ')}`);
      dispatch(pushMessage({ text: `編輯失敗：${error.response?.data?.message.join(', ')}`, type: "danger" })); 
    }
  };

  const handleAddImage = () => {
    setTempProduct((prev) => ({
      ...prev,
      imagesUrl: prev.imagesUrl ? [...prev.imagesUrl, ""] : [""],
    }));
  };

  const handleRemoveImage = () => {
    setTempProduct((prev) => {
      const newImages = prev.imagesUrl ? [...prev.imagesUrl] : [];
      newImages.pop();
      return { ...prev, imagesUrl: newImages };
    });
  };

  const openDelModal = (product) => {
    setTempProduct(product);
    delProductModalRef.current.show();
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${tempProduct.id}`);
      getProducts();
      //alert("刪除成功");
      dispatch(pushMessage({ text: "刪除成功", type: "success" }));
      delProductModalRef.current.hide();
    } catch (error) {
      //  alert("刪除失敗");
      dispatch(pushMessage({ text: "刪除失敗", type: "danger" }));
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>產品列表 (後台管理)</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openModal("create", INITIAL_TEMPLATE_DATA)}
        >
          建立新的產品
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>分類</th>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>{item.origin_price}</td>
              <td>{item.price}</td>
              <td className={item.is_enabled ? "text-success" : ""}>
                {item.is_enabled ? "啟用" : "未啟用"}
              </td>
              <td>
                <div className='btn-group' role='group'>
                  <button type='button' className='btn btn-outline-primary btn-sm'
                    onClick={() => openModal("edit", item)}>編輯</button>
                  <button type='button' className='btn btn-outline-danger btn-sm'
                    onClick={() => openDelModal(item)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pagination={pagination} onChangePage={getProducts} />

      <ProductModal
        modalType={modalType}
        tempProduct={tempProduct}
        handleModalInputChange={handleModalInputChange}
        handleModalImageChange={handleModalImageChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
        addProduct={addProduct}
        editProduct={editProduct}
        closeModal={closeModal}
        productModalRef={productModalRef}
      />
      <DeleteProductModal
        DeleteProductModal={delProductModalRef}
        tempProduct={tempProduct}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

export default AdminProducts;
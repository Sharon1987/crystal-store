// src/layout/FrontendLayout.jsx
import { Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MessageToast from '../components/MessageToast';

export default function FrontendLayout() {
  return (
    <>
      <Header /> 
      <MessageToast />
      <main className="py-4">
        {/* 所有的前台頁面內容都會渲染在這裡 */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}
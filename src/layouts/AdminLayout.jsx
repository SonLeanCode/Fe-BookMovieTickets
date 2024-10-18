import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import HeaderAdmin from '../components/Admin/HeaderAdmin';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sử dụng useCallback để ghi nhớ hàm toggleSidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-black">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1">
        <HeaderAdmin isSidebarOpen={isSidebarOpen} />
        <div className="p-6 pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

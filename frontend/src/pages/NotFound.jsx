import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">V-GOV</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-xl">📊</span>
                Tổng quan
              </Link>
            </li>
            <li>
              <Link to="/projects" className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-xl">📁</span>
                Dự án
              </Link>
            </li>
            <li>
              <Link to="/team" className="flex items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="mr-3 text-xl">👥</span>
                Nhóm
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <p className="text-2xl font-semibold text-gray-600 mt-4">Không tìm thấy trang</p>
          <p className="text-gray-500 mt-2">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
          <Link 
            to="/home" 
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
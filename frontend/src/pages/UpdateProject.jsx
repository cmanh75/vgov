import React from 'react';

const UpdateProject = ({
  project,
  handleChange,
  error,
  success,
  isEdit,
  onCancel,
  handleUpdate,
  handleCreate,
}) => (
  <div className="edit-project-container">
    <div className="edit-project-card">
      <div className="edit-project-header">
        <h1 className="edit-project-title">
          {isEdit ? 'Chỉnh Sửa Dự Án' : 'Tạo Dự Án'}
        </h1>
        <p className="edit-project-subtitle">
          {isEdit ? 'Cập nhật thông tin dự án' : 'Nhập thông tin dự án mới'}
        </p>
      </div>

      <form onSubmit={isEdit ? handleUpdate : handleCreate} className="edit-project-form">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            {success}
          </div>
        )}

        <div className="form-section">
          <h2 className="section-title">
            <i className="fas fa-info-circle"></i>
            Thông Tin Cơ Bản
          </h2>
          <div className="form-grid">
            {!isEdit && (
              <div className="form-group">
                <label htmlFor="id">Mã Dự Án</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={project.id}
                  onChange={handleChange}
                  placeholder="Nhập mã dự án"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Tên Dự Án</label>
              <input
                type="text"
                id="name"
                name="name"
                value={project.name}
                onChange={handleChange}
                placeholder="Nhập tên dự án"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailPm">Email Quản Lý</label>
              <input
                type="email"
                id="emailPm"
                name="emailPm"
                value={project.emailPm}
                onChange={handleChange}
                placeholder="Nhập email quản lý"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <i className="fas fa-clock"></i>
            Thời Gian
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="startDate">Ngày Bắt Đầu</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Ngày Kết Thúc</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <i className="fas fa-cog"></i>
            Trạng Thái
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="status">Trạng Thái Dự Án</label>
              <select
                id="status"
                name="status"
                value={project.status || 'Active'}
                onChange={handleChange}
                required
              >
                <option value="Active">Đang Hoạt Động</option>
                <option value="In-Progress">Đang Chờ</option>
                <option value="Hold">Tạm Dừng</option>
                <option value="Presale">Bảo Quản</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Loại Dự Án</label>
              <input
                type="text"
                id="type"
                name="type"
                value={project.type}
                onChange={handleChange}
                placeholder="Nhập loại dự án (ví dụ: Active, Hold, Completed...)"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <i className="fas fa-align-left"></i>
            Mô Tả
          </h2>
          <div className="form-group">
            <label htmlFor="description">Mô Tả Dự Án</label>
            <textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Nhập mô tả dự án"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            >
              {isEdit ? 'Lưu Thay Đổi' : 'Tạo Dự Án'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default UpdateProject;
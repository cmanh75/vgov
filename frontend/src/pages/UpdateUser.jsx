import React from 'react';

const UpdateUser = ({
  user,
  handleChange,
  handleSubmit,
  error,
  isEdit = false,
  allProject,
  onCancel,
}) => ( 
    <div className="create-user-container">
        <div className="create-user-card">
            <div className="create-user-header">
                <h1>{isEdit ? 'Chỉnh Sửa Người Dùng' : 'Tạo Người Dùng Mới'}</h1>
                <p>{isEdit ? 'Cập nhật thông tin người dùng' : 'Điền thông tin để tạo tài khoản người dùng mới'}</p>
            </div>

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="create-user-form">
                {!isEdit && (
                    <div className="form-group">
                        <label htmlFor="userId">Mã Người Dùng</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={user.userId}
                            onChange={handleChange}
                            placeholder="Nhập mã người dùng"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="name">Họ và Tên</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Địa Chỉ Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mật Khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="role">Vai Trò</label>
                        <select
                            id="role"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn Vai Trò</option>
                            <option value="admin">Quản Trị Viên</option>
                            <option value="user">Người Dùng</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Giới Tính</label>
                        <select
                            id="gender"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn Giới Tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">Ngày Sinh</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={user.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectId">Gán Dự Án</label>
                    <select
                        id="projectId"
                        name="projectId"
                        value={user.projectId}
                        onChange={handleChange}
                    >
                        <option value="">Chọn Dự Án</option>
                        {allProject.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Hủy
                    </button>
                    <button type="submit" className="btn-submit">
                        {isEdit ? 'Lưu Thay Đổi' : 'Tạo Người Dùng'}
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default UpdateUser;
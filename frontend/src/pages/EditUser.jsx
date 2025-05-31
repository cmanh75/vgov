import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../api/userApi';
import './css/EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    gender: 'MALE',
    role: 'USER',
    projectId: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id, token);
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          dob: res.data.dob ? res.data.dob.slice(0, 10) : '',
          gender: res.data.gender || 'MALE',
          role: res.data.role || 'USER',
          projectId: res.data.projectId || '',
          status: res.data.status || 'active'
        });
      } catch {
        setError('Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Tên không được để trống';
    if (!form.email) errs.email = 'Email không được để trống';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    try {
      await updateUser(id, form, token);
      navigate('/users');
    } catch {
      setError('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) return <div className="edituser-loading">Đang tải...</div>;
  if (error) return <div className="edituser-error">{error}</div>;

  return (
    <div className="edituser-wrapper">
      <form className="edituser-form" onSubmit={handleSubmit}>
        <h2 className="edituser-title">Chỉnh sửa người dùng</h2>
        <div className="edituser-field">
          <label>Tên</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {fieldErrors.name && <div className="edituser-error">{fieldErrors.name}</div>}
        </div>
        <div className="edituser-field">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {fieldErrors.email && <div className="edituser-error">{fieldErrors.email}</div>}
        </div>
        <div className="edituser-field">
          <label>Ngày sinh</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </div>
        <div className="edituser-field">
          <label>Giới tính</label>
          <div className="edituser-radio-group">
            <label>
              <input type="radio" name="gender" value="MALE" checked={form.gender === 'MALE'} onChange={handleChange} />
              Nam
            </label>
            <label>
              <input type="radio" name="gender" value="FEMALE" checked={form.gender === 'FEMALE'} onChange={handleChange} />
              Nữ
            </label>
          </div>
        </div>
        <div className="edituser-field">
          <label>Vai trò</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ADMIN">ADMIN</option>
            <option value="DEV">DEV</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div className="edituser-field">
          <label>Project ID</label>
          <input name="projectId" value={form.projectId} onChange={handleChange} />
        </div>
        <div className="edituser-field">
          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
        <div className="edituser-actions">
          <button type="submit" className="edituser-save">Lưu</button>
          <button type="button" className="edituser-cancel" onClick={() => navigate('/users')}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

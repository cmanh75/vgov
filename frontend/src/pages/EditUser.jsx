import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../api/userApi';
import './css/EditUser.css';
import UpdateUser from './UpdateUser';
import { getAllProjects } from '../api/projectApi';
import { uploadImage, getImageById, deleteImage } from '../api/imageApi';
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    gender: 'MALE',
    role: '',
    projectId: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [allProject, setAllProject] = useState([]);
  const token = localStorage.getItem('token');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(token);
            if (response && response.data) {
                setAllProject(response.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách dự án:', error);
            setError('Không thể tải danh sách dự án');
        }
    };

    fetchProjects();
}, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id, token);
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          dob: res.data.dob ? res.data.dob.slice(0, 10) : '',
          gender: res.data.gender || 'MALE',
          role: res.data.role || '',
          projectId: res.data.projectId || '',
          status: res.data.status || 'active'
        });
        const image = await getImageById(id, token);
        if (image && image.data) {
          setAvatarFile(image.data);
        }
      } catch {
        setError('Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const onCancel = () => {
    navigate('/users');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
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
      console.log(avatarFile);
      if (avatarFile) {
        await uploadImage(id, avatarFile, token);
      }
      else {
        await deleteImage(id, token);
      }
      navigate('/users');
    } catch {
      setError('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) return <div className="edituser-loading">Đang tải...</div>;
  if (error) return <div className="edituser-error">{error}</div>;

  return (
    <UpdateUser
      user={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      isEdit={true}
      allProject={allProject}
      onCancel={onCancel}
      avatarFile={avatarFile}
      handleAvatarChange={handleAvatarChange}
    />
  );
};

export default EditUser;

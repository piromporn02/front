import axios from 'axios';
import { useState } from 'react';

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // ตรวจสอบการกรอกข้อมูล
      if (!input.firstname || !input.lastname || !input.email || !input.password || !input.confirmPassword) {
        return alert('โปรดกรอกข้อมูลให้ครบทุกช่อง');
      }
      if (input.password !== input.confirmPassword) {
        return alert('รหัสผ่านไม่ตรงกัน');
      }
      
      const response = await axios.post('http://localhost:8889/auth/register', input);
      console.log(response);
      if (response.status === 200) {
        alert('ลงทะเบียนสำเร็จ');
        setInput({ // ล้างฟอร์มหลังจากสำเร็จ
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5">
      <div className="text-3xl mb-5">แบบฟอร์มลงทะเบียน</div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อ</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="firstname"
            value={input.firstname}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">นามสกุล</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">อีเมล</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">รหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ยืนยันรหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">
            ส่ง
          </button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">
            รีเซ็ต
          </button>
        </div>
      </form>
    </div>
  );
}

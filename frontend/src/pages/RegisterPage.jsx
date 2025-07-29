import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";

import ReCAPTCHA from "react-google-recaptcha";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const RECAPTCHA_SITE_KEY = "6LcbD5IrAAAAAPX5M_8OhjdRBfht_ZIfok4-hBaG"; // thay bằng reCAPTCHA site key thật

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  // const [address, setAddress] = useState("");
  // const [dob, setDob] = useState("");
  // const [gender, setGender] = useState("");
  // const roleid = 1;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Vui lòng xác minh reCAPTCHA");
      return;
    }
    try {
      const response = await fetch("http://localhost:9999/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:name,
          password:password,
          // fullname,
          email:email,
          phone:phone,
          // address,
          // dob,
          // gender,
          // roleid:roleid,
          recaptchaToken,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Đăng kí thành công!");
        navigate("/login");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // ✅ Gửi dữ liệu user Google lên backend để xử lý đăng nhập/đăng ký
    const response = await fetch("http://localhost:9999/api/auth/oauth-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber || "", // hoặc "" nếu không có
        provider: "google",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Đăng nhập bằng Google thành công!");
      // ✅ Lưu token nếu server trả về
      
       const role = data.user.role || "patient";
      if (role === "patient") {
        navigate("/");
      } else {
        navigate("/");
      }
    } else {
      alert(data.message || "Đăng nhập thất bại");
    }
  } catch (err) {
    console.error("Google Login Error:", err);
    alert("Lỗi khi đăng nhập bằng Google");
  }
  
};


  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        {/* Phần bên trái - Hình ảnh mô tả */}
        <div className="imageContainer">
          <div className="imagePlaceholder">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/08763c148032171.62ce0e981e54f.jpg"
              alt="Hình ảnh minh họa"
              className="registerImage"
            />
          </div>
        </div>
        {/* Phần bên phải - Form đăng ký */}
        <div className="registerFormContainer">
          <h2 className="registerTitle">ĐĂNG KÝ</h2>
          <form onSubmit={handleSubmit} className="registerForm">
            <div className="formGroup">
              <label htmlFor="name" className="label">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="label">
                Mật Khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              {/* <label htmlFor="fullname" className="label">
                Họ và Tên
              </label> */}
              {/* <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="input"
                required
              /> */}
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="phone" className="label">
                Số Điện Thoại
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
            <div className="formGroup">
              {/* <label htmlFor="dob" className="label">
                Ngày Sinh
              </label> */}
              {/* <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input"
                required
              /> */}
            </div>
            <div className="formGroup">
              {/* <label htmlFor="gender" className="label">
                Giới Tính
              </label> */}
              {/* <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select> */}
            </div>
            <button type="submit" className="registerButton">
              Đăng Ký
            </button>
          </form>
          <div className="loginLink">
            Bạn Đã Có Tài Khoản? <a href="/login">Đăng Nhập</a>
          </div>
          <div className="socialLogin">
            <p>Hoặc đăng nhập với:</p>
            {/* Nút Google */}
  <button onClick={handleGoogleLogin} className="socialBtn google">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
      alt="Google"
      style={{ width: "70px", marginRight: "20px", marginLeft: "50px" }}
    />
  </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

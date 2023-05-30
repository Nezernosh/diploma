import React, { useState } from "react";
import defaultUserImg from "./user-icon.png"; // replace with the actual path of your user image

const existingUsers = {
  "admin": "admin",
  "pavel": "12345",
};

const Account = () => {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
  const [form, setForm] = useState({ email: "", nickname: "", password: "" });

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = e => {
    e.preventDefault();
    // here you can call API to register user
    existingUsers[form.nickname] = form.password;
    setForm({ email: "", nickname: "", password: "" });
  };

  const login = e => {
    e.preventDefault();
    if (existingUsers[form.nickname] === form.password) {
      setAuth({ isLoggedIn: true, user: form.nickname });
      setForm({ email: "", nickname: "", password: "" });
    } else {
      alert("Wrong nickname or password");
    }
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  return auth.isLoggedIn ? (
    <div>
      <header>
        <img src={defaultUserImg} alt="user" />
        <h3 onClick={logout}>{auth.user}</h3>
      </header>
    </div>
  ) : (
    <div>
      <h2>Register</h2>
      <form onSubmit={register}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
        <input name="nickname" placeholder="Nickname" value={form.nickname} onChange={handleInputChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleInputChange} maxLength="16" required />
        <button type="submit">Register</button>
      </form>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input name="nickname" placeholder="Nickname" value={form.nickname} onChange={handleInputChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleInputChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Account;

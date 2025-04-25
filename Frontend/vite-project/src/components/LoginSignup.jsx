import React, { useState } from "react";

const LoginSignup = () => {
  const [formType, setFormType] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${formType === "signup" ? "Signing Up" : "Logging In"}...`);
  };

  return (
    <div className="min-h-screen bg-[#f6f0ec] text-[#3a2e2a] font-sans">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Civilian Interface</h1>
        <div className="flex gap-2 text-sm">
          <button className="border px-3 py-1 rounded">Admin</button>
          <button className="border px-3 py-1 rounded">Official</button>
        </div>
      </div>

      <p className="text-center text-sm mt-4 px-4">
        Bringing government services closer to you. Apply, track, and connect with officials easily.<br />
        No more long queues or paperwork. A faster way to get things done.
      </p>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 p-6">
        {/* Sign Up */}
        <div className="bg-white shadow-md p-6 rounded-md border">
          <h2 className="text-xl font-bold mb-4">SIGN UP</h2>
          <label className="block mb-2">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-4" required />
          
          <label className="block mb-2">e-Mail ID</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <label className="block mb-2">Mobile Number</label>
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <label className="block mb-2">Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <label className="block mb-2">OTP</label>
          <input name="otp" value={formData.otp} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <button type="submit" onClick={() => setFormType("signup")} className="bg-[#c1694f] text-white py-2 px-4 rounded w-full">
            Sign Up
          </button>
          <p className="text-sm mt-2">Already an user? <span onClick={() => setFormType("login")} className="underline text-blue-600 cursor-pointer">please sign in</span></p>
        </div>

        {/* Sign In */}
        <div className="bg-white shadow-md p-6 rounded-md border">
          <h2 className="text-xl font-bold mb-4">SIGN IN</h2>
          <label className="block mb-2">Username</label>
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <label className="block mb-2">e-Mail ID</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <label className="block mb-2">Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} className="border p-2 w-full mb-4" required />

          <p className="text-sm mb-2">Forgot Password? <span className="text-blue-600 underline cursor-pointer">Click here</span></p>

          <button type="submit" onClick={() => setFormType("login")} className="bg-[#c1694f] text-white py-2 px-4 rounded w-full">
            Sign In
          </button>
          <p className="text-sm mt-2">Don’t have an account? <span onClick={() => setFormType("signup")} className="underline text-blue-600 cursor-pointer">Create here</span></p>
        </div>
      </form>

      <footer className="text-center text-sm mt-12 border-t p-4">
        <strong>Contact Details</strong>: 011-24301812 &nbsp; | &nbsp; <strong>e-Mail</strong>: connect@mygov.nic.in
      </footer>
    </div>
  );
};

export default LoginSignup;

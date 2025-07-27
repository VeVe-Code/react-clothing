import axios from "axios";
import React, { useState, useContext } from "react";
import InputError from "../components/inputerror";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Register() {
  const { getuser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState(null);
  const Navigate = useNavigate();

  const handlesubmit = async (token) => {
    localStorage.setItem("token", token);
    await getuser(token);
    Navigate("/");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users", form);
      if (res.status === 201) {
        const token = res.data.token;
        await handlesubmit(token);
      }
    } catch (e) {
      setErrors(e.response?.data?.errors || {});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-300 rounded-lg w-full max-w-lg md:w-[50%] px-6 py-10 shadow-sm">
        <div className="flex items-end gap-2 mb-8 justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Register</h1>
          <div className="w-[10px] h-[10px] bg-blue-800 rounded-full"></div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={register}>
          {["name", "email", "password", "phone", "address"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="font-medium text-sm text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={field === "password" ? "password" : "text"}
                placeholder={`Enter your ${field}`}
              />
              <InputError errorMessage={errors?.[field]} />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-blue-800 text-white font-bold text-lg rounded-full hover:bg-blue-900 transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-700 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 underline font-semibold">
              Login here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

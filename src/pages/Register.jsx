import axios from "axios";
import React, { useState, useContext } from "react";
import InputError from "../components/inputerror";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

function Register() {
  const { user, getuser } = useContext(AuthContext); // Clean useContext
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState(null);
  const Navigate = useNavigate();

  // ✅ This now handles setting token and getting user
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
        await handlesubmit(token); // ✅ Use it here
      }
    } catch (e) {
      setErrors(e.response?.data?.errors || {});
    }
  };

  return (
    <div className="my-10 flex items-center">
      <div className="border-[1px] border-black/20 rounded-lg w-[40%] mx-auto py-[40px] px-[40px]">
        <div className="flex items-end gap-2 mb-8">
          <h1 className="text-[50px] leading-[0.8] text-primary font-bold">Register</h1>
          <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={register}>
          {["name", "email", "password", "phone", "address"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="font-semibold text-sm">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                type={field === "password" ? "password" : "text"}
                placeholder={`Enter your ${field}`}
              />
              <InputError errorMessage={errors?.[field]} />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-bold text-xl rounded-full bg-primary block"
          >
            Register
          </button>

          <p className="text-sm text-center font-semibold">
            Already have an account? Login{" "}
            <a className="text-primary underline" href="/login.html">
              here.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';

let loginSchme = z.object ({
  email: z.string().email("This field must be a valid email").min(20, { message: "This field must be at least 20 characters" }).max(50),
  password: z.string().min(10).max(30),
})
function Login() {
  const { getuser } = useContext(AuthContext);
  const { register, watch, handleSubmit, formState} = useForm({resolver : zodResolver(loginSchme)});
   console.log(formState)
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const FormSubmit = async (data) => {
 
    try {
      const res = await axios.post('http://localhost:8000/api/login', data);
      console.log(res);
      if (res.data.message === "Password doesn't correct") {
        setErrors({ password: res.data.message });
      }
      if (res.data.message === 'login success') {
        const token = res.data.token;
        localStorage.setItem('token', token);
        await getuser(token);
        navigate('/');
      }
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(FormSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Email: {watch('email')}
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3" 
              {...register('email')}
            />
            {(errors?.["email"] || formState.errors.email)&& (
              <p className="text-red-500 text-xs">
                {errors?.["email"] ?? formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
            

              className="border rounded w-full py-2 px-3"
              {...register('password'
              )}
            />
            {(errors?.["password"]  || formState.errors.password) && (
              <p className="text-red-500 text-xs">
               {errors?.['password '] ?? formState.errors.password.message }
              </p>
            )}
          </div>
          {errors?.general && (
            <p className="text-red-500 text-xs mb-4">
              {typeof errors.general === 'object'
                ? JSON.stringify(errors.general)
                : errors.general}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 w-full"
          >
            Login
          </button>
          <Link
            to="/register"
            className="text-blue-500 hover:underline mt-4 block text-center"
          >
            Don't have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

import { useState, useEffect } from "react";
import loginImage from "../../assets/login/img.webp";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "../../redux/features/auth/authApi.js";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      const userData = {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
        status: result.status,
      };
  
      dispatch(setCredentials({ user: userData, token: result.token }));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <img src={loginImage} alt="Login" className="max-w-full h-auto md:max-w-md" />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-2 border-blue-500 rounded-2xl p-6 md:p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 flex justify-center space-x-2 text-sm">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            <span className="text-gray-500"> | </span>
            <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

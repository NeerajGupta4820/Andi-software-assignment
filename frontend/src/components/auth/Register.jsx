import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from "../../assets/signup/img.webp";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "../../redux/features/auth/authApi"; 

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = formData;
      if (!name || !email || !password) {
        toast("⚠️ Name, email, and password are mandatory", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });
        return;
      }

      const response = await register(formData).unwrap();
      
      toast.success("SignUp Successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
      console.log(response)
      navigate("/login"); 
    } catch (error) {
      console.error("SignUp Error:", error);
      toast.error(`❌ SignUp failed: ${error.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBarA: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 py-18">
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={signupimg}
          alt="Register"
          className="max-w-full h-auto md:max-w-md"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-2 border-blue-500 rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-5">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-orange-500 mt-5 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="mt-6 flex justify-center space-x-2 text-sm">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
              <span className="text-gray-500"> | </span>
              <Link to="/login" className="text-blue-500 hover:underline">
                SignIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../main";

const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated} = useContext(context)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    doctorDepartment: "",
    docAvatar: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      firstname,
      lastname,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      confirmPassword,
      doctorDepartment,
      docAvatar,
    } = formData;

    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone) newErrors.phone = "Phone is required";
    if (!nic) newErrors.nic = "NIC is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!doctorDepartment)
      newErrors.doctorDepartment = "Doctor department is required";
    if (!docAvatar) newErrors.docAvatar = "Avatar URL is required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
     

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if(isAuthenticated){
      navigate('/')
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
       credentials: 'include'
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Signup successful:", result);
        setFormData("");
        toast.success(result.message);
        localStorage.setItem('patienttoken', result.token);
        setIsAuthenticated(true)
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 min-h-screen px-2 bg-white">
      <div className="w-full max-w-3xl px-6 py-8 bg-white rounded-lg ">
        <h3 className="text-2xl text-center font-bold mb-6">
          Create an Account!
        </h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstname"
              >
                Firstname
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.firstname && "border-red-500"
                }`}
                id="firstname"
                type="text"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstname}
                </p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastname"
              >
                Lastname
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.lastname && "border-red-500"
                }`}
                id="lastname"
                type="text"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs italic">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.email && "border-red-500"
              }`}
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.phone && "border-red-500"
                }`}
                id="phone"
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nic"
              >
                NIC
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.nic && "border-red-500"
                }`}
                id="nic"
                type="text"
                placeholder="NIC"
                value={formData.nic}
                onChange={handleChange}
              />
              {errors.nic && (
                <p className="text-red-500 text-xs italic">{errors.nic}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.dob && "border-red-500"
                }`}
                id="dob"
                type="date"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs italic">{errors.dob}</p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.gender && "border-red-500"
                }`}
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">{errors.gender}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.password && "border-red-500"
                }`}
                id="password"
                type="password"
                placeholder="******************"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword && "border-red-500"
                }`}
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="doctorDepartment"
              >
                Doctor Department
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.doctorDepartment && "border-red-500"
                }`}
                id="doctorDepartment"
                type="text"
                placeholder="Doctor Department"
                value={formData.doctorDepartment}
                onChange={handleChange}
              />
              {errors.doctorDepartment && (
                <p className="text-red-500 text-xs italic">
                  {errors.doctorDepartment}
                </p>
              )}
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="docAvatar"
              >
                Avatar URL
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                  errors.docAvatar && "border-red-500"
                }`}
                id="docAvatar"
                type="text"
                placeholder="Avatar URL"
                value={formData.docAvatar}
                onChange={handleChange}
              />
              {errors.docAvatar && (
                <p className="text-red-500 text-xs italic">
                  {errors.docAvatar}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 w-full uppercase text-white text-xs font-semibold tracking-px bg-cyan-600 rounded-md relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition ease-in-out duration-500"></div>
              <span className="relative z-10">Register</span>
            </button>
        
          </div>
          <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="/login"
                >
                  Do you have an account?<span>Login!</span>
                </a>
              </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

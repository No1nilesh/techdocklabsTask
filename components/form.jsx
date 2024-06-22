"use client";
import { useState, useEffect } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import EyeBtn from "./eye-btn";
import { sendEmailOtp } from "@utils/sendEmailOtp";
import generateOtp from "@utils/generateOtp";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  // state for show Password
  const [showPass, setShowPass] = useState(true);
  // state for show Confirm password
  const [showCpass, setShowCpass] = useState(true);

  const [error, setError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // this will be stored in mondgodb database or in memory storage like redis
  const saveOtp = (email, otp) => {
    localStorage.setItem("UserOtp", JSON.stringify({ email: email, otp: otp }));
  };

  // invoke generateOtp func then sends the otp then save the otp.
  const handleEmailOtp = (email) => {
    const otp = generateOtp();
    sendEmailOtp(email, otp);
    saveOtp(email, otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: data.email.trim(),
      password: data.password.trim(),
      cpassword: data.cpassword.trim(),
    };

    if (formData.password !== formData.cpassword)
      return setError("password didn't match");
    try {
      // Convert data to a JSON string and store it in localStorage
      // it should be store in a database but for the task localstorage
      localStorage.setItem("formData", JSON.stringify(formData));
      setData({
        email: "",
        password: "",
        cpassword: "",
      });
      handleEmailOtp(data.email);
      router.push(`/verify-otp?email=${data.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* Email */}
      <div className="flex flex-col relative">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={data.email}
          placeholder="example@gmail.com"
          className="border w-full py-3 pl-8 rounded-md bg-[#ebebeb] outline-none text-sm"
          required
        />
        <CiMail className="absolute top-10 left-2" />
      </div>

      {/* Password */}
      <div className="flex flex-col relative">
        <label htmlFor="password">Password</label>
        <input
          type={showPass ? "password" : "text"}
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className=" border w-full py-3 pl-8 rounded-md bg-[#ebebeb] outline-none text-sm"
          minLength={6}
          required
        />
        <CiLock className="absolute top-10 left-2" />
        {/* Eye button */}
        <EyeBtn setShowPass={setShowPass} className="absolute right-2 top-10" />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col relative">
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type={showCpass ? "password" : "text"}
          id="cpassword"
          name="cpassword"
          value={data.cpassword}
          minLength={6}
          onChange={handleChange}
          className="border w-full py-3 pl-8 rounded-md bg-[#ebebeb] outline-none text-sm"
          required
        />
        <CiLock className="absolute top-10 left-2" />
        {/* Eye button */}
        <EyeBtn
          setShowPass={setShowCpass}
          className="absolute right-2 top-10"
        />
      </div>

      <span className="text-red-600">{error}</span>
      {/* submit button */}
      <button
        className="text-white bg-[#ff8705] p-2 rounded-md mt-2 disabled:bg-[#ff8605ee]"
        disabled={!data.email || !data.password || !data.cpassword}
      >
        Create Account
      </button>
    </form>
  );
}

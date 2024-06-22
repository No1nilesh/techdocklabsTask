"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import generateOtp from "@utils/generateOtp";
import { sendEmailOtp } from "@utils/sendEmailOtp";
export default function VerifyOtp() {
  const router = useRouter();
  const params = useSearchParams();
  const emailId = params.get("email");
  const [isDisabled, setDisabled] = useState(false);
  const [otpData, setOtpData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [error, setError] = useState("");
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(errorTimeout);
  }, [error]);

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOtpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (otp) => {
    const userOtp = JSON.parse(localStorage.getItem("UserOtp"));
    if (otp == userOtp.otp) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        !otpData.input1 ||
        !otpData.input2 ||
        !otpData.input3 ||
        !otpData.input4
      )
        return setError("Please Fill OTP first");

      const otp =
        otpData.input1 + otpData.input2 + otpData.input3 + otpData.input4;

      const isValid = validate(otp);

      if (!isValid) return setError("Invalid Otp");

      router.push("/setup-profile");
    } catch (error) {
      console.log(error);
    }
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

  const handleResend = () => {
    handleEmailOtp(emailId);
    setDisabled(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisabled(false);
    }, 30000);

    let intervalId;

    if (isDisabled) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (!isDisabled) {
      setRemainingTime(30);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [isDisabled]);

  return (
    <div className="max-w-lg flex flex-col gap-12">
      <header className="mb-4">
        <h1 className="text-4xl font-bold">Otp Verification</h1>
        <span className="text-gray-400">
          Verification code sent to your e-mail please enter below to complete
        </span>
      </header>
      <span className="text-lg font-semibold">OTP Code</span>
      <div className="flex justify-between">
        <input
          className="p-4 w-16 outline-none bg-[#f7f7f9] rounded-lg text-center"
          onInput={handleInput}
          name="input1"
          value={otpData.input1}
          onChange={handleChange}
          type="number"
          maxLength={1}
        />
        <input
          className="p-4 w-16 outline-none bg-[#f7f7f9] rounded-lg text-center"
          onInput={handleInput}
          name="input2"
          value={otpData.input2}
          onChange={handleChange}
          type="number"
          maxLength={1}
        />
        <input
          className="p-4 w-16 outline-none bg-[#f7f7f9] rounded-lg text-center"
          onInput={handleInput}
          name="input3"
          value={otpData.input3}
          onChange={handleChange}
          type="number"
          maxLength={1}
        />
        <input
          className="p-4 w-16 outline-none bg-[#f7f7f9] rounded-lg text-center"
          name="input4"
          value={otpData.input4}
          onChange={handleChange}
          onInput={handleInput}
          type="number"
          maxLength={1}
        />
      </div>
      <span className="text-red-500">{error}</span>
      <button
        onClick={handleSubmit}
        className="text-white bg-[#ff8705] p-3 rounded-md mt-2 w-full"
      >
        Verify
      </button>
      <span className="flex justify-between">
        <p>
          Didn't receive OTP ?{" "}
          <button
            onClick={handleResend}
            className="text-orange-400 cursor-pointer disabled:text-orange-200"
            disabled={isDisabled}
          >
            {" "}
            Resend OTP
          </button>
        </p>
        <div className="timer text-gray-800">{`00:${remainingTime}`}</div>
      </span>
    </div>
  );
}

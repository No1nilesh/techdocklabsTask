"use client";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

export default function EyeBtn({ className, setShowPass }) {
  const [eyeState, setEyeState] = useState(true);
  const handleClick = () => {
    setEyeState((prev) => !prev);
    setShowPass((prev) => !prev);
  };

  return (
    <div className={`${className} cursor-pointer`} onClick={handleClick}>
      {eyeState ? <IoMdEye /> : <IoMdEyeOff />}
    </div>
  );
}

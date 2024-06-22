import React from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
export default function SocialBtn() {
  return (
    <div className="flex justify-center gap-2 mt-2">
      <span className="border-2 border-orange-400 px-6 py-2 rounded-md cursor-pointer">
        <FaFacebookF className="size-7 text-blue-600" />
      </span>
      <span className="border-2 border-orange-400 px-6 py-2 rounded-md cursor-pointer">
        <FaGoogle className="size-7 text-green-600" />
      </span>
      <span className="border-2 border-orange-400 px-6 py-2 rounded-md cursor-pointer">
        <FaApple className="size-7 text-orange-400" />
      </span>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useState } from "react";
import { IoPerson, IoCamera } from "react-icons/io5";
const ImageUploadPreview = ({ imageData, setImageData }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImageData(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <label htmlFor="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="image-upload"
        className="hidden"
      />
      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center  relative -z-10 drop-shadow-md cursor-pointer">
        <div className="absolute cursor-pointer top-12 -right-2 z-30 rounded-full bg-white size-8 grid place-content-center drop-shadow-md">
          <IoCamera className="size-6" />
        </div>
        {image ? (
          <Image
            src={image}
            alt="Preview"
            width={50}
            height={50}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <IoPerson className="size-14 text-white" />
        )}
      </div>
    </label>
  );
};

export default ImageUploadPreview;

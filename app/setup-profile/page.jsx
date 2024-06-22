"use client";
import ImageUploadPreview from "@components/ImageUploadPriview";
import { IoPersonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SetUpProfile = () => {
  const router = useRouter();
  const [yearData, setYearsData] = useState([]);
  const [age, setAge] = useState(null);
  const [monthData] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [dateData, setDateData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [data, setData] = useState({
    bio: "",
    fname: "",
    lname: "",
    mobile: "",
    gender: "Male",
    date: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      new Array(currentYear - 1900 + 1),
      (_, index) => 1900 + index
    );
    setYearsData(years);
  }, []);

  useEffect(() => {
    const calculateMaxDays = () => {
      if (!data.month || !data.year) return 31; // Default to 31 days if month or year not selected

      const selectedYear = parseInt(data.year, 10);

      switch (data.month) {
        case "Feb":
          return selectedYear % 4 === 0 &&
            (selectedYear % 100 !== 0 || selectedYear % 400 === 0)
            ? 29
            : 28;
        case "Apr":
        case "Jun":
        case "Sep":
        case "Nov":
          return 30;
        default:
          return 31;
      }
    };

    const dates = Array.from(
      new Array(calculateMaxDays() + 1),
      (_, index) => index
    );

    setDateData(dates);
  }, [data.month, data.year]);

  useEffect(() => {
    const calculateAge = () => {
      if (!data.date || !data.month || !data.year) return null;

      const birthDate = new Date(
        `${data.year}-${monthData.indexOf(data.month) + 1}-${data.date}`
      );
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    setAge(calculateAge());
  }, [data.date, data.month, data.year, monthData]);

  const handleChange = (e) => {
    console.log(data);
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !data.bio ||
      !data.date ||
      !data.fname ||
      !data.lname ||
      !data.gender ||
      !data.mobile ||
      !data.month ||
      !data.year
    ) {
      return;
    }
    try {
      localStorage.setItem(
        "profileData",
        JSON.stringify({
          bio: data.bio.trim(),
          fname: data.fname.trim(),
          lname: data.lname.trim(),
          gender: data.gender,
          mobile: data.mobile.trim(),
          date: data.date,
          month: data.month,
          year: data.year,
          image: imageData,
        })
      );

      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg">
      <header className="mb-4">
        <h1 className="text-4xl font-bold">Set Up Profile</h1>
        <span className="text-gray-400">
          Verification code sent to your e-mail. Please enter below to complete.
        </span>
      </header>

      <form
        className="flex flex-col gap-4"
        // method="POST"
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="bio-container flex gap-8 mt-4 items-center">
          <ImageUploadPreview
            imageData={imageData}
            setImageData={setImageData}
          />

          <div className="flex flex-col w-full">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              onChange={handleChange}
              value={data.bio}
              placeholder="Write something about yourself"
              className="border-b w-full py-2 outline-none text-sm"
              required
            />
          </div>
        </div>

        <label htmlFor="fname">Your Name</label>
        <div className="flex flex-col relative">
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={handleChange}
            value={data.fname}
            placeholder="First Name"
            className="border-none w-full py-3 pl-8 rounded-md bg-[#ebebeb] outline-none text-sm"
            required
          />
          <IoPersonOutline className="absolute top-3 left-2" />
        </div>

        <div className="flex flex-col relative">
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={handleChange}
            value={data.lname}
            placeholder="Last Name"
            className="border-none w-full py-3 pl-8 rounded-md bg-[#ebebeb] outline-none text-sm"
            required
          />
          <IoPersonOutline className="absolute top-3 left-2" />
        </div>

        <div className="flex flex-col relative">
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={data.mobile}
            className="border-none w-full py-3 pl-9 rounded-md bg-[#ebebeb] outline-none text-sm"
            pattern="[0-9]{10}" // Example pattern for US phone numbers
            required
            maxLength={10}
          />
          {/* <IoPersonOutline className="absolute top-3 left-2" /> */}
          <div className="absolute top-3 left-1 border-r text-sm">+91</div>
        </div>

        <label htmlFor="gender">Gender</label>
        <div id="gender" className="flex gap-4">
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="gender"
              id="male"
              type="radio"
              onChange={handleChange}
              value={"Male"}
              checked={data.gender === "Male"}
            />
            <div className="w-6 h-6 border-2 border-[#ff8705] rounded-full peer-checked:bg-[#ff8705] peer-checked:border-[#ff8705] transition duration-300 ease-in-out"></div>
            <span className="ml-2">Male</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="gender"
              id="female"
              type="radio"
              onChange={handleChange}
              value={"Female"}
              checked={data.gender === "Female"}
            />
            <div className="w-6 h-6 border-2 border-[#ff8705] rounded-full peer-checked:bg-[#ff8705] peer-checked:border-[#ff8705] transition duration-300 ease-in-out"></div>
            <span className="ml-2">Female</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="gender"
              id="others"
              type="radio"
              onChange={handleChange}
              value={"Others"}
              checked={data.gender === "Others"}
            />
            <div className="w-6 h-6 border-2 border-[#ff8705] rounded-full peer-checked:bg-[#ff8705] peer-checked:border-[#ff8705] transition duration-300 ease-in-out"></div>
            <span className="ml-2">Others</span>
          </label>
        </div>

        <label htmlFor="dob">Date of Birth</label>
        <div id="dob" className="flex justify-between">
          <div className="flex flex-col items-center">
            <select
              className="border bg-[#ebebeb] p-2 w-20 rounded-md outline-none"
              id="year"
              name="year"
              onChange={handleChange}
              value={data.year}
              required
            >
              <option value="">Select Year</option>
              {yearData.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <label htmlFor="year">Year</label>
          </div>

          <div className="flex flex-col items-center">
            <select
              className="border bg-[#ebebeb] p-2 w-20 rounded-md outline-none"
              id="month"
              name="month"
              onChange={handleChange}
              value={data.month}
              required
            >
              <option value="">Select Month</option>
              {monthData.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <label htmlFor="month">Month</label>
          </div>

          <div className="flex flex-col items-center">
            <select
              className="border bg-[#ebebeb] p-2 w-20 rounded-md outline-none"
              id="date"
              name="date"
              onChange={handleChange}
              value={data.date}
              required
            >
              <option value="">Select Month</option>
              {dateData.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <label htmlFor="date">Date</label>
          </div>

          <div className="border text-white relative bg-[#ff8705] p-2 w-16 h-10 rounded-md outline-none after:content-['Age'] after:absolute after:-top-8 after:left-5 grid place-content-center">
            {age}
          </div>
        </div>

        <button
          className="text-white bg-[#ff8705] p-3 rounded-md mt-2 w-full"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SetUpProfile;

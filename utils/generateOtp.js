const crypto = require("crypto");
export default function generateOtp(length = 4) {
  try {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp +=
        digits[Math.floor((crypto.randomBytes(1)[0] / 256) * digits.length)];
    }
    return otp;
  } catch (error) {
    console.log(error);
  }
}

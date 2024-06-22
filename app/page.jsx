import Link from "next/link";
import Form from "@components/form";
import SocialBtn from "@components/social-btn";
export default function Home() {
  return (
    <div className="max-w-lg">
      <header className="mb-4">
        <h1 className="text-4xl font-bold">Create account</h1>
        <span className="text-gray-400">Please login to continue</span>
      </header>
      <Form />
      <div className="flex flex-row items-center justify-center gap-2">
        <hr className="w-full bg-black " /> Or{" "}
        <hr className="w-full bg-black" />
      </div>
      <p>
        By clicking continue to create account you agree to Events zar's{" "}
        <b> User Agreement, Privacy Policy,</b> and <b> Cookie Policy</b>
      </p>
      <SocialBtn />
      <div className="text-center mt-3">
        Already have an account?
        <Link href={"/login"} className="text-orange-400">
          {" "}
          Log In
        </Link>
      </div>
    </div>
  );
}

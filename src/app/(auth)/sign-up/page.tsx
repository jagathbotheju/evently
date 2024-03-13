import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col p-4 shadow-lg w-[35%]">
        <h1 className="font-bold text-3xl my-10 text-center">Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

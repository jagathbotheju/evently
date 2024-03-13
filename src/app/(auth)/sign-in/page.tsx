import SigninForm from "@/components/SigninForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col p-4 shadow-lg w-[35%]">
        <h1 className="font-bold text-3xl my-10 text-center">Sign In</h1>
        <SigninForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  );
};

export default SigninPage;

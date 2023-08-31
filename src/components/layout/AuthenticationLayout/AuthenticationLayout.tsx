import AuthenticationHeader from "./AuthenticationHeader/AuthenticationHeader";

const AuthenticationLayout = ({ children }: any) => {
  return (
    <div className="w-full h-screen bg-[#f5f5f5] flex-col justify-center items-center ">
      <AuthenticationHeader></AuthenticationHeader>
      <div className="h-4/5 justify-center items-center">{children}</div>
    </div>
  );
};

export default AuthenticationLayout;

import AuthenticationHeader from "./AuthenticationHeader/AuthenticationHeader";
import { useNavigate } from "react-router-dom";

const AuthenticationLayout = ({ children }: any) => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed top-0 bg-slate-400/80 w-full h-full flex items-center justify-center"
      onClick={(e) => {
        navigate("/");
      }}
    >
      <div
        className="modal h-4/5 justify-center items-center "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;

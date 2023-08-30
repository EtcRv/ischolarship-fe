import { useNavigate } from "react-router-dom";

const DefaultLayoutHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full border-grey-200 px-4 lg:px-6 py-2.5 border-b-2">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a className="flex items-center" href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            IScholarship
          </span>
        </a>

        <div className="flex justify-center font-sans">
          <button
            className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200 mx-2 hover:text-green-400"
            onClick={() => navigate("/login")}
          >
            LOG IN
          </button>
          <button
            className="rounded-lg border-[1px] bg-green-400 text-white px-[20px] py-2 pointer border-grey-200 mx-2 hover:bg-green-500"
            onClick={() => navigate("/register")}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutHeader;

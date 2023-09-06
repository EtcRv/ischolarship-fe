import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { userAvatar } from "src/assets";
import { updateLoginStatus, updateUser } from "src/store/userSlice";

const DefaultLayoutHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const logout = () => {
    dispatch(updateLoginStatus());
    dispatch(
      updateUser({
        user: {},
      }),
    );
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-white w-full border-grey-200 px-4 lg:px-6 py-2.5 border-b-2 h-16 ">
      <div className="flex h-full flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a className="flex items-center" href="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            IScholarship
          </span>
        </a>
        {!isLogin && (
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
        )}
        {isLogin && (
          <div className="flex justify-center font-sans ">
            <button
              className="relative inline-flex mx-6"
              onClick={() => navigate("/recommend")}
            >
              <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-500 p-1 text-center align-baseline text-xs font-bold leading-none text-white">
                99+
              </div>
              <BsBell className="w-7 h-7" />
            </button>
            <button
              className="relative inline-flex mx-6"
              onClick={() => navigate("/shortlisted")}
            >
              <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-500 p-1 text-center align-baseline text-xs font-bold leading-none text-white">
                99+
              </div>
              <AiOutlineStar className="w-7 h-7" />
            </button>
            <div className="flex mx-6 relative group/userbar">
              <button
                className="w-7 h-7 mr-2"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={userAvatar}
                  className="w-full h-full rounded-full"
                ></img>
              </button>
              <IoMdArrowDropdown className="w-7 h-7" />
              <div className="absolute top-[28px] z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 group-hover/userbar:block">
                <ul className=" text-sm text-gray-700 w-full">
                  <button
                    className="flex w-full px-4 py-2 hover:bg-gray-100 border-b-[2px] border-gray-200 items-center"
                    onClick={() => navigate("/profile")}
                  >
                    <AiOutlineUser className="mr-2" />
                    Profile
                  </button>
                  <button
                    className="flex w-full px-4 py-2 hover:bg-gray-100 items-center"
                    onClick={logout}
                  >
                    <BiLogOut className="mr-2" />
                    Sign out
                  </button>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHeader;

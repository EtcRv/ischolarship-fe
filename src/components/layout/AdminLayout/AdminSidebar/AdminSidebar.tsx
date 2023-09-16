import { HiX } from "react-icons/hi";
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
import DashIcon from "./DashIcon";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, addToken } from "src/store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const routes = [
  {
    name: "View Crawling",
    layout: "/admin",
    path: "viewlog",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "Database",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "database",
  },
  {
    name: "Courses",
    layout: "/admin",
    path: "courses",
    icon: <MdPerson className="h-6 w-6" />,
  },
];

const AdminSidebar = (open: any, onClose: any) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const user = useSelector((state: any) => state.user.user);
  const token = useSelector((state: any) => state.user.token);
  const navigate = useNavigate();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: any) => {
    return location.pathname.includes(routeName);
  };
  const logout = () => {
    dispatch(
      updateUser({
        user: {},
      }),
    );
    dispatch(
      addToken({
        token: "",
      }),
    );

    navigate("/");
  };

  useEffect(() => {
    if (!isLogin) navigate("/login");

    // if (user.user_type !== "admin") navigate("/");
  }, []);

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 text-[26px] font-bold uppercase text-stone-600">
          Admin
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        {routes.map((route, idx) => {
          return (
            <Link key={idx} to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={idx}
                >
                  <span
                    className={`${
                      activeRoute(route.path) === true
                        ? "font-bold text-blue-500 "
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${
                      activeRoute(route.path) === true
                        ? "font-bold text-stone-700 "
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p>
                </li>
                {activeRoute(route.path) ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-blue-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
          );
        })}
      </ul>
      <button
        className="inline-block rounded bg-blue-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
};

export default AdminSidebar;

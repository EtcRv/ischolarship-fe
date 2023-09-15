import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAvatar } from "src/assets";
import {
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineLike,
} from "react-icons/ai";
import { useSelector } from "react-redux";

type userSideBarType = {
  name: string;
  icon: any;
  url: string;
};

const userSideBar: Array<userSideBarType> = [
  {
    name: "Profile",
    icon: <AiOutlineUser />,
    url: "/profile",
  },
  {
    name: "Recommend",
    icon: <AiOutlineLike />,
    url: "/recommend",
  },
  {
    name: "Shortlisted",
    icon: <AiOutlineStar />,
    url: "/shortlisted",
  },
  {
    name: "Settings",
    icon: <AiOutlineSetting />,
    url: "/settings",
  },
];

const ProfilePageSideBar = () => {
  const url = window.location.href.split("/");
  const current_function = url[url.length - 1];
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(userAvatar);
  const userName = useSelector((state: any) => state.user.user.user_name);

  const handleChange = (e: any) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-full h-fit border-2 border-slate-200 bg-white">
      <div className="p-6 text-center">
        <div className="mx-auto mb-3">
          <label className=" w-48 h-48 " htmlFor="changeImage">
            <img
              src={avatar}
              className="rounded-full w-48 h-48 mx-auto"
              alt=""
            ></img>
            <input
              type="file"
              onChange={handleChange}
              accept="image/png, image/gif, image/jpeg"
              id="changeImage"
              hidden
            />
          </label>
        </div>
        <div className="font-bold font-serif text-lg">{userName}</div>
      </div>
      <div>
        <ul className="list-none mx-4">
          {userSideBar.map((sidebar, idx) => {
            return (
              <button
                key={idx}
                className={`flex justify-start items-center py-2 cursor-pointer w-full font-sans group/sidebar ${
                  idx < userSideBar.length - 1
                    ? "border-b-[1px] border-slate-300"
                    : ""
                } `}
                onClick={() => navigate(sidebar.url)}
              >
                <div className="mx-2 text-xl">{sidebar.icon}</div>
                <span
                  className={`group-hover/sidebar:text-orange-300 ${
                    sidebar.url.includes(current_function)
                      ? "text-orange-300"
                      : ""
                  }`}
                >
                  {sidebar.name}
                </span>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePageSideBar;

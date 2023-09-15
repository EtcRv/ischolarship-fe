import { useState } from "react";
import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";

const SettingPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [sendMail, setSendMail] = useState(true);

  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="w-72 mx-4">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">Settings</div>
            <div className="text-base">Change your setting</div>
          </div>
          <div className="flex-col p-6 text-start items-center">
            <div className="flex-col w-full">
              <h2 className="mb-4 text-[25px] font-sans font-bold">
                Change your password
              </h2>
              <div className="flex flex-col w-9/12  my-6">
                <label className="font-bold pb-2 flex">Current password:</label>
                <input
                  type="text"
                  className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col w-9/12  my-6">
                <label className="font-bold pb-2 flex">New password:</label>
                <input
                  type="text"
                  className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col w-9/12  my-6">
                <label className="font-bold pb-2 flex">
                  Re-enter new password:
                </label>
                <input
                  type="text"
                  className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
                  placeholder="Re-enter New Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.currentTarget.value)}
                />
              </div>
              <div className="flex w-9/12 justify-end">
                <button
                  className="w-20 mx-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px]  border-grey-200 hover:bg-green-500"
                  onClick={() => {
                    console.log("Hello");
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex-col w-full">
              <h2 className="mb-4 text-[25px] font-sans font-bold">
                Other settings
              </h2>
              <div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer my-2">
                    <input
                      checked={sendMail}
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onClick={() => {
                        setSendMail(!sendMail);
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Gửi mail khi có học bổng phù hợp!
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SettingPage;

import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "../../components/userPageSideBar/ProfilePageSideBar";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";

const ProfilePage = () => {
  const [gender, setGender] = useState("Not-Set");
  const [dob, setDob] = useState(new Date());
  const [nationality, setNationality] = useState("Not-Set");
  const [location, setLocation] = useState("Not-Set");
  const [phone, setPhone] = useState("Not-Set");
  const [email, setEmail] = useState("dungbacninh12@gmail.com");
  const [pageStatus, setPageStatus] = useState("profile");

  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="w-72 border-2 border-slate-200 flex flex-col mx-4">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">
              Basic Information
            </div>
            <div className="text-base">Add information about yourself</div>
          </div>
          {pageStatus === "profile" && (
            <Profile
              gender={gender}
              dob={dob}
              nationality={nationality}
              location={location}
              phone={phone}
              email={email}
              changePageStatus={setPageStatus}
            ></Profile>
          )}
          {pageStatus === "profile-edit" && (
            <UpdateProfile
              gender={gender}
              dob={dob}
              nationality={nationality}
              location={location}
              phone={phone}
              email={email}
              changePageStatus={setPageStatus}
              updateGender={setGender}
              updateDob={setDob}
              updateNationality={setNationality}
              updateLocation={setLocation}
              updatePhone={setPhone}
              updateEmail={setEmail}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;

import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "../../components/userPageSideBar/ProfilePageSideBar";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import { useSelector } from "react-redux";
import Archievement from "./components/Archievement";
import AchievementServices from "src/services/AchievementServices/AchievementServices";
import { IoAddCircleOutline } from "react-icons/io5";
import ArchievementForm from "./components/ArchievementForm";
import UserServices from "src/services/UserServices/UserServices";

type Archievement = {
  id: string;
  title: string;
  role: string;
  description: string;
};

const ProfilePage = () => {
  const userInfor = useSelector((state: any) => state.user.user);
  const token = useSelector((state: any) => state.user.token);
  const [gender, setGender] = useState(userInfor.gender);
  const [dob, setDob] = useState(new Date(userInfor.dob));
  const [nationality, setNationality] = useState(userInfor.nationality);
  const [education_level, setEducationLevel] = useState(
    userInfor.education_level,
  );
  const [phone, setPhone] = useState(userInfor.phone);
  const [email, setEmail] = useState(userInfor.email);
  const [pageStatus, setPageStatus] = useState("profile");
  const [allArchievement, setAllArchievement] = useState<Array<Archievement>>(
    [],
  );
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const exampleArchievement = {
    id: 1,
    title: "Freelancer Android Mobile App Developer",
    role: "Freelancer",
    description: "HELOOOO this is description",
  };

  const getArchivementData = async () => {
    try {
      const response = await AchievementServices.getAllAchievement(token);
      console.log("response: ", response);
      setAllArchievement(response.data.data);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await UserServices.getUserInfo(token);
      console.log("response: ", response);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    getArchivementData();
    getUserProfile();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="min-w-[288px] border-2 border-slate-200 flex flex-col mx-4 h-fit">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">
              Basic Information
            </div>
            <div className="text-base">Add information about yourself</div>
          </div>
          <div className="my-4">
            {pageStatus === "profile" && (
              <Profile
                gender={gender}
                dob={dob}
                nationality={nationality}
                education_level={education_level}
                phone={phone}
                email={email}
                changePageStatus={setPageStatus}
              ></Profile>
            )}
            {pageStatus === "profile-edit" && (
              <UpdateProfile
                token={token}
                gender={gender}
                dob={dob}
                nationality={nationality}
                education_level={education_level}
                phone={phone}
                email={email}
                changePageStatus={setPageStatus}
                updateGender={setGender}
                updateDob={setDob}
                updateNationality={setNationality}
                updateLevel={setEducationLevel}
                updatePhone={setPhone}
                updateEmail={setEmail}
              />
            )}
          </div>
          <div className="mt-[20px] flex-col text-start my-8">
            <div className="mx-[80px] flex justify-between">
              <h2 className=" text-xl font-bold">Thành tựu cá nhân</h2>
              <button onClick={() => setIsEdit(!isEdit)}>
                <IoAddCircleOutline className="text-xl text-red-600" />
              </button>
            </div>
            {isEdit && (
              <div className="flex justify-center w-full">
                <ArchievementForm
                  data={{
                    id: "",
                    title: title,
                    role: role,
                    description: description,
                  }}
                  changeEdit={(value: boolean) => setIsEdit(value)}
                  changeTitle={(value: string) => setTitle(value)}
                  changeRole={(value: string) => setRole(value)}
                  changeDescription={(value: string) => setDescription(value)}
                  changeAllArchievement={(value: Archievement) => {
                    setAllArchievement([...allArchievement, value]);
                    console.log("allArchievement: ", allArchievement);
                  }}
                ></ArchievementForm>
              </div>
            )}
            {allArchievement.map((archievement: Archievement, idx: number) => (
              <div className="flex-col mx-[60px] my-2" key={idx}>
                <Archievement data={archievement} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;

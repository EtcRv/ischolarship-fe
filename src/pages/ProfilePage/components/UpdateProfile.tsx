import { BsGenderAmbiguous, BsFlag, BsPhone } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { updateUser } from "src/store/userSlice";
import UserServices from "src/services/UserServices/UserServices";

enum Gender {
  Male = "Male",
  Female = "Female",
  NotSet = "Not-Set",
}

const UpdateProfile = (props: any) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState(props.gender);
  const [dob, setDob] = useState(props.dob);
  const [nationality, setNationality] = useState(props.nationality);
  const [education_level, setEducationLevel] = useState(props.education_level);
  const [phone, setPhone] = useState(props.phone);
  const [email, setEmail] = useState(props.email);
  return (
    <div className="flex-col p-6 text-start items-center">
      <h2 className="ml-[80px] text-xl font-bold">
        Sửa thông tin cá nhân của bạn
      </h2>

      <div className="flex w-full justify-around">
        <div className="flex-col">
          <div className="flex-col my-6">
            <div className="flex">
              <BsGenderAmbiguous className="my-auto mx-2" />
              <span className="font-bold">Gender:</span>
            </div>
            <div className="flex justify-evenly my-2 ">
              <div className="flex">
                <input
                  checked={gender === Gender.Male}
                  value={Gender.Male}
                  id="default-radio-1"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                  onChange={(e) => setGender(e.currentTarget.value)}
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex ">
                <input
                  checked={gender === Gender.Female}
                  value={Gender.Female}
                  id="default-radio-2"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  onChange={(e) => setGender(e.currentTarget.value)}
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Female
                </label>
              </div>
              <div className="flex ">
                <input
                  checked={gender === Gender.NotSet}
                  value={Gender.NotSet}
                  id="default-radio-3"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  onChange={(e) => setGender(e.currentTarget.value)}
                />
                <label
                  htmlFor="default-radio-3"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  Not-Set
                </label>
              </div>
            </div>
          </div>
          <div className="flex my-6">
            <MdCalendarToday className="my-auto mx-2" />
            <span className="font-bold flex">
              Date of birth:{" "}
              <div className="font-normal mx-2 ">
                <DatePicker
                  selected={dob}
                  onChange={(date) => {
                    if (date !== null) setDob(date);
                  }}
                  placeholderText="Select a date"
                  className="cursor-pointer"
                />
              </div>
            </span>
          </div>
          <div className="flex my-6">
            <BsFlag className="my-auto mx-2" />
            <span className="font-bold">Nationality: </span>
            <div className="font-normal mx-2">
              <CountryDropdown
                value={nationality}
                onChange={(val) => setNationality(val)}
              />
            </div>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex my-6">
            <FaGraduationCap className="my-auto mx-2" />
            <span className="font-bold">
              Education Level:{" "}
              <input
                type="text"
                value={education_level}
                placeholder="Your phone number"
                className="font-normal"
                onChange={(e) => setEducationLevel(e.currentTarget.value)}
              />
            </span>
          </div>

          <div className="flex my-6">
            <BsPhone className="my-auto mx-2" />
            <span className="font-bold">
              Contact number:{" "}
              <input
                type="text"
                value={phone === "Not-Set" ? "" : phone}
                placeholder="Your phone number"
                className="font-normal"
                onChange={(e) => setPhone(e.currentTarget.value)}
              />
            </span>
          </div>
          <div className="flex my-6">
            <AiOutlineMail className="my-auto mx-2" />
            <span className="font-bold">
              Email: <span className="font-normal">{email}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end my-2">
        <button
          className="w-20 mx-2 rounded bg-white text-green-400 p-2.5 items-center pointer border-[1px] border-green-400"
          onClick={() => {
            setGender(props.gender);
            setDob(props.dob);
            setNationality(props.nationality);
            setEducationLevel(props.education_level);
            setPhone(props.phone);
            setEmail(props.email);
            props.changePageStatus("profile");
          }}
        >
          Cancel
        </button>
        <button
          className="w-20 mx-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px]  border-grey-200 hover:bg-green-500"
          onClick={async () => {
            props.updateGender(gender);
            props.updateDob(dob);
            props.updateNationality(nationality);
            props.updateLevel(education_level);
            props.updatePhone(phone);
            props.updateEmail(email);
            dispatch(
              updateUser({
                user: {
                  gender,
                  dob,
                  nationality,
                  education_level,
                  phone,
                  email,
                },
              }),
            );
            const res = await UserServices.updateUserInfo(props.token, {
              education_level: education_level,
              nationality: nationality,
              sex: gender,
              date_of_birth: dob,
              phone: phone,
            });
            props.changePageStatus("profile");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;

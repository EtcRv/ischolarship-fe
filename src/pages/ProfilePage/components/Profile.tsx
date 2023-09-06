import { BsGenderAmbiguous, BsFlag, BsPhone } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Profile = (props: any) => {
  return (
    <div className="flex-col p-6 text-start items-center">
      <div className="flex w-full justify-around">
        <div className="flex-col">
          <div className="flex my-6">
            <BsGenderAmbiguous className="my-auto mx-2" />
            <span className="font-bold">
              Gender: <span className="font-normal mx-2">{props.gender}</span>
            </span>
          </div>
          <div className="flex my-6">
            <MdCalendarToday className="my-auto mx-2" />
            <span className="font-bold flex">
              Date of birth:{" "}
              <span className="font-normal mx-2 pointer-events-none">
                <DatePicker
                  selected={props.dob}
                  onChange={() => console.log("Hello")}
                />
              </span>
            </span>
          </div>
          <div className="flex my-6">
            <BsFlag className="my-auto mx-2" />
            <span className="font-bold">
              Nationality:{" "}
              <span className="font-normal mx-2">{props.nationality}</span>{" "}
            </span>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex my-6">
            <CiLocationOn className="my-auto mx-2" />
            <span className="font-bold">
              Current location:
              <span className="font-normal mx-2">{props.location}</span>
            </span>
          </div>
          <div className="flex my-6">
            <BsPhone className="my-auto mx-2" />
            <span className="font-bold">
              Contact number:{" "}
              <span className="font-normal mx-2">{props.phone}</span>
            </span>
          </div>
          <div className="flex my-6">
            <AiOutlineMail className="my-auto mx-2" />
            <span className="font-bold">
              Email: <span className="font-normal mx-2">{props.email}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-2">
        <button
          className=" w-20 mx-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px]  border-grey-200 hover:bg-green-500"
          onClick={() => props.changePageStatus("profile-edit")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;

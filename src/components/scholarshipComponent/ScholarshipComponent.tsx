import { Scholarship } from "src/models";
import { FaGraduationCap } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { BsFlag } from "react-icons/bs";
import { BiEdit, BiBookOpen } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";
import { scholarship1 } from "src/assets";

const ScholarshipComponent = (props: any) => {
  const data: Scholarship = props.data;
  const isShorlisted = props.isShorlisted;
  const navigate = useNavigate();

  const checkTime = () => {
    let time = data.deadline.trim().split("/");
    const month = time[1];
    time[1] = time[0];
    time[0] = month;
    const newTime = time.join(" ");
    if (newTime.length > 10) return false;
    if (Date.now() - Date.parse(newTime) > 0) return true;
    return false;
  };

  return (
    <div className="flex-col px-6 py-4 w-full">
      <div className="flex w-full justify-between">
        <div className="w-32 h-32">
          <img
            className="w-full h-full m-auto"
            src={data.image || scholarship1}
          ></img>
        </div>
        <div className="flex-col mx-4 w-2/3">
          <span className="text-lg text-green-500">{data.title}</span>
          <div className="flex-col">
            <div className="flex my-[3px]">
              <span className="flex w-1/2">
                <FaGraduationCap className="mx-2 my-auto" />
                {data.education_level}
              </span>
              <span className="flex w-1/2">
                <BsFlag className="mx-2 my-auto" /> {data.type}
              </span>
            </div>
            <span className="flex my-[3px]">
              <GrOrganization className="mx-2 my-auto" /> {data.organization}
            </span>
            <span className="flex my-[3px]">
              <BiBookOpen className="mx-2 my-auto min-w-[16px] " />{" "}
              {data.majors}
            </span>
          </div>
        </div>
        {!checkTime() && (
          <div className="border-[1px] rounded border-amber-400 h-fit p-2.5">
            <span className="break-normal">Hết hạn</span>
          </div>
        )}
        {checkTime() && (
          <div className="border-[1px] rounded border-green-400 h-fit p-2.5">
            <span className="break-normal">Còn hạn</span>
          </div>
        )}
      </div>
      <div className="flex w-full justify-between">
        {!isShorlisted && (
          <button className="flex mt-2 rounded bg-orange-400 text-white p-2 items-center pointer border-grey-200 hover:bg-orange-500">
            <AiOutlineStar className="mr-2" />
            Shortlist
          </button>
        )}

        {isShorlisted && (
          <button
            className="flex mt-2 rounded bg-white text-gray-400 p-2 items-center pointer border-[1px] border-gray-400 hover:border-black hover:text-black"
            onClick={() => props.removeScholarship(data._id)}
          >
            <IoMdRemove className="mr-2" />
            Unshortlisted
          </button>
        )}
        <button
          className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-grey-200 hover:bg-green-500"
          onClick={() => navigate(`/scholarship/${data._id}`)}
        >
          <BiEdit className="mr-2" />
          View & Apply
        </button>
      </div>
    </div>
  );
};

export default ScholarshipComponent;

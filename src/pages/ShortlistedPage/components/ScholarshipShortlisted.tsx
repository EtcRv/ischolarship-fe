import { Scholarship } from "src/models";
import { FaGraduationCap } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { BsFlag } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiEdit } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { IoMdRemove } from "react-icons/io";

const ScholarshipShortlisted = (props: any) => {
  const data: Scholarship = props.data;
  return (
    <div className="flex-col px-6 py-4 w-full">
      <div className="flex w-full justify-between">
        <div className="w-32 h-32">
          <img className="w-full h-full m-auto" src={data.image}></img>
        </div>
        <div className="flex-col mx-4 w-2/3">
          <span className="text-lg text-green-500">{data.name}</span>
          <div className="flex-col">
            <div className="flex my-[3px]">
              <span className="flex w-1/2">
                <FaGraduationCap className="mx-2 my-auto" />
                {data.level}
              </span>
              <span className="flex w-1/2">
                <MdAttachMoney className="mx-2 my-auto" /> {data.type}
              </span>
            </div>
            <span className="flex my-[3px]">
              <GrOrganization className="mx-2 my-auto" /> {data.organization}
            </span>
            <span className="flex my-[3px]">
              <BsFlag className="mx-2 my-auto" /> {data.applyLocation}
            </span>
            <span className="flex my-[3px]">
              <CiLocationOn className="mx-2 my-auto" /> {data.location}
            </span>
          </div>
        </div>
        <div className="border-[1px] rounded border-amber-400 h-fit p-2.5">
          <span className="break-normal">Express in 4 days</span>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button className="flex mt-2 rounded bg-white text-gray-400 p-2 items-center pointer border-[1px] border-gray-400 hover:border-black hover:text-black">
          <IoMdRemove className="mr-2" />
          Unshortlisted
        </button>
        <button className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-green-500">
          <BiEdit className="mr-2" />
          View & Apply
        </button>
      </div>
    </div>
  );
};

export default ScholarshipShortlisted;

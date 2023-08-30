import { Scholarship } from "src/models";
import { FaGraduationCap } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { BsFlag } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiEdit } from "react-icons/bi";
const ScholarshipComponent = (props: any) => {
  const data: Scholarship = props.data;
  return (
    <div className="flex px-6 py-4 border-2 border-grey-200 drop-shadow-md shadow-stone-100">
      <div className="">
        <img src={data.image}></img>
      </div>
      <div className="flex-col">
        <span>{data.name}</span>
        <div className="flex-col">
          <div className="flex">
            <span className="flex">
              <FaGraduationCap className="mx-2" />
              {data.level}
            </span>
            <span className="flex">
              {" "}
              <MdAttachMoney className="mx-2" /> {data.type}
            </span>
          </div>
          <span className="flex">
            <GrOrganization className="mx-2" /> {data.organization}
          </span>
          <span className="flex">
            <BsFlag className="mx-2" /> {data.applyLocation}
          </span>
          <span className="flex">
            <CiLocationOn className="mx-2" /> {data.location}
          </span>
        </div>
      </div>
      <div className="flex-col">
        <div className="border-[1px] rounded border-amber-400 p-2.5">
          <span className="">Express in 4 days</span>
        </div>
        <button className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-grey-200 hover:bg-green-500">
          <BiEdit className="mx-2" />
          View & Apply
        </button>
      </div>
    </div>
  );
};

export default ScholarshipComponent;

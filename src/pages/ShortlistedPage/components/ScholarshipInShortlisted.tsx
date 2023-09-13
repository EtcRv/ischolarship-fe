import { Scholarship } from "src/models";
import { FaGraduationCap } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { BsFlag } from "react-icons/bs";
import { BiEdit, BiBookOpen } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";
import { scholarship1 } from "src/assets";
import { useEffect, useState } from "react";
import ScholarshipUserServices from "src/services/ScholarshipUserServices/ScholarshipUserServices";

const allStatus = [
  {
    name: "Shortlist",
    value: 1,
  },
  {
    name: "Applied",
    value: 2,
  },
  {
    name: "Received",
    value: 3,
  },
  {
    name: "Denied",
    value: 4,
  },
  {
    name: "Disinterested",
    value: 5,
  },
];

const ScholarshipInShortlisted = (props: any) => {
  const data: Scholarship = props.data;
  const [isShorlisted, setIsShorlisted] = useState(props.isShorlisted);
  const navigate = useNavigate();

  const [education_level, setEducationLevel] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getEducationLevelFromData();
    getTypeFromData();
  }, []);

  const getEducationLevelFromData = () => {
    let edu_levels = data.education_level.trim().split(",");
    for (let i = 0; i < edu_levels.length; i++) {
      if (edu_levels[i] === "1") {
        edu_levels[i] = "Trung cấp";
      } else if (edu_levels[i] === "2") {
        edu_levels[i] = "Cao đẳng";
      } else if (edu_levels[i] === "3") {
        edu_levels[i] = "Đại học";
      } else if (edu_levels[i] === "4") {
        edu_levels[i] = "Thạc sĩ";
      } else if (edu_levels[i] === "5") {
        edu_levels[i] = "Tiến sĩ";
      }
    }
    setEducationLevel(edu_levels.join(", "));
  };

  const getTypeFromData = () => {
    if (Number(data.type) === 1) {
      setType("Học bổng hỗ trợ khó khăn");
    } else if (Number(data.type) === 2) {
      setType("Học bổng đại học/ du học");
    } else if (Number(data.type) === 3) {
      setType("Học bổng tổ chức/ doanh nghiệp");
    }
  };

  const checkTime = () => {
    let dl = data.deadline;
    let time = dl.trim().split("/");
    const timeDeadline = new Date(
      Number(time[2]),
      Number(time[1]) - 1,
      Number(time[0]),
    );

    var currentDate = new Date();

    if (currentDate > timeDeadline) return false;
    return true;
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
                {education_level}
              </span>
              <span className="flex w-1/2">
                <BsFlag className="mx-2 my-auto" /> {type}
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
        <select
          id="scholarshipstatus"
          className="flex mt-2 rounded bg-white text-gray-400 p-2 items-center pointer border-[1px] border-gray-400 hover:border-black hover:text-black"
          value={isShorlisted}
          onChange={async (e) => {
            const statusValue = e.currentTarget.value;
            setIsShorlisted(Number(statusValue));
            if (Number(statusValue) === 5) {
              const deleteRes =
                await ScholarshipUserServices.deleteFromShortlist(
                  props.token,
                  data._id,
                );
              const discardRes =
                await ScholarshipUserServices.discardFromShortlist(
                  props.token,
                  data._id,
                  {
                    label: 0,
                    status: 5,
                  },
                );
              props.removeScholarship(data._id);
            } else {
              const updateRes =
                await ScholarshipUserServices.updateScholarshipInShortlist(
                  props.token,
                  data._id,
                  {
                    label: 1,
                    status: Number(statusValue),
                  },
                );
            }
          }}
        >
          {allStatus.map((status: any, idx: number) => (
            <option
              value={status.value}
              key={idx}
              selected={isShorlisted === status.value}
            >
              {status.name}
            </option>
          ))}
        </select>

        {/* {isShorlisted && (
          <button
            className="flex mt-2 rounded bg-white text-gray-400 p-2 items-center pointer border-[1px] border-gray-400 hover:border-black hover:text-black"
            onClick={() => props.removeScholarship(data._id)}
          >
            <IoMdRemove className="mr-2" />
            Unshortlisted
          </button>
        )} */}
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

export default ScholarshipInShortlisted;

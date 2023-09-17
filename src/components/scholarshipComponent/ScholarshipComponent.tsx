import { Scholarship } from "src/models";
import { FaGraduationCap } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { BsFlag } from "react-icons/bs";
import { BiEdit, BiBookOpen } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { scholarship1 } from "src/assets";
import { useEffect, useState } from "react";
import ScholarshipUserServices from "src/services/ScholarshipUserServices/ScholarshipUserServices";
import { useSelector } from "react-redux";

const typeData = [
  "Học bổng hỗ trợ khó khăn",
  "Học bổng đại học/ du học",
  "Học bổng doanh nghiệp",
];
const educationLevelData = [
  "Tất cả các ngành hoặc không có thông tin cụ thể",
  "Trung cấp",
  "Cao đẳng",
  "Đại học",
  "Thạc sĩ",
  "Tiến sĩ",
  "Sau tiến sĩ",
];

const majorsData = [
  "Không có thông tin hoặc là tất cả các ngành",
  "Kiến trúc và xây dựng",
  "Kinh doanh và thương mại",
  "Công nghệ thông tin",
  " Luật - nhân văn",
  "Báo chí - Khoa học xã hội",
  "Y tế",
  "Khoa học cơ bản",
  "Sư phạm",
  "Kỹ thuật - công nghiệp",
];

const ScholarshipComponent = (props: any) => {
  const data: Scholarship = props.data;
  const isLogin = useSelector((state: any) => state.user.isLogin);
  const [isShorlisted, setIsShorlisted] = useState(props.isShorlisted);
  const navigate = useNavigate();

  const [education_level, setEducationLevel] = useState("");
  const [type, setType] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    getEducationLevelFromData();
    getTypeFromData();
    getMajorFromData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEducationLevelFromData = () => {
    let edu_levels = data.education_level.trim().split(",");
    for (let i = 0; i < edu_levels.length; i++) {
      edu_levels[i] = educationLevelData[parseInt(edu_levels[i])];
    }
    setEducationLevel(edu_levels.join(", "));
  };

  const getTypeFromData = () => {
    if (parseInt(data.type) === 1) {
      setType("Học bổng hỗ trợ khó khăn");
    } else if (parseInt(data.type) === 2) {
      setType("Học bổng đại học/ du học");
    } else if (parseInt(data.type) === 3) {
      setType("Học bổng tổ chức/ doanh nghiệp");
    }
  };

  const getMajorFromData = () => {
    let majorData = data.majors.trim().split(",");
    for (let i = 0; i < majorData.length; i++) {
      majorData[i] = majorsData[parseInt(majorData[i])];
    }
    setMajor(majorData.join(", "));
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
            alt=""
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
              <BiBookOpen className="mx-2 my-auto min-w-[16px] " /> {major}
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
          <button
            className="flex mt-2 rounded bg-orange-400 text-white p-2 items-center pointer border-grey-200 hover:bg-orange-500"
            onClick={async () => {
              if (isLogin) {
                await ScholarshipUserServices.addToShortlist(
                  props.token,
                  data._id,
                  { label: 1, status: 1 },
                );
                setIsShorlisted(true);
              } else {
                navigate("/login");
              }
            }}
          >
            <AiOutlineStar className="mr-2" />
            Quan tâm
          </button>
        )}

        {isShorlisted && (
          <button
            className="flex mt-2 rounded bg-white text-gray-400 p-2 items-center pointer border-[1px] border-gray-400 hover:border-black hover:text-black"
            onClick={() => navigate("/shortlisted")}
          >
            Chuyển tới danh sách quan tâm
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

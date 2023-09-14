import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import { scholarship1 } from "src/assets";
import { Scholarship, ScholarshipType, DegreeType } from "src/models";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";
import { BiArrowBack } from "react-icons/bi";

const emptyScholarshipDetail: Scholarship = {
  _id: "",
  title: "",
  organization: "",
  deadline: "",
  type: "",
  education_level: "",
  majors: "",
  link: "",
  requirements: "",
  "benefits/value": "",
  html_file: "",
};

const ScholarshipDetailPage = () => {
  const navigate = useNavigate();

  const [scholarshipDetail, setScholarshipDetail] = useState<Scholarship>(
    emptyScholarshipDetail,
  );

  const arrUrl = window.location.href.split("/");
  const scholarshipId = arrUrl[arrUrl.length - 1];

  const getScholarshipData = async (id: string) => {
    const res = await ScholarshipServices.getScholarshipInformation(id);
    console.log("res.data: ", res.data);
    let scholarshipData = res.data;
    scholarshipData.education_level =
      getEducationLevelFromData(scholarshipData);
    scholarshipData.type = getTypeFromData(scholarshipData);
    setScholarshipDetail(scholarshipData);
  };

  const getEducationLevelFromData = (data: any) => {
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
    return edu_levels.join(", ");
  };

  const getTypeFromData = (data: any) => {
    if (Number(data.type) === 1) {
      return "Học bổng hỗ trợ khó khăn";
    } else if (Number(data.type) === 2) {
      return "Học bổng đại học/ du học";
    } else if (Number(data.type) === 3) {
      return "Học bổng tổ chức/ doanh nghiệp";
    }
  };

  useEffect(() => {
    getScholarshipData(scholarshipId);
  }, []);

  return (
    <DefaultLayout>
      <button className="flex px-40 mt-8" onClick={() => navigate("/")}>
        <BiArrowBack className="text-2xl mx-2" />
        <span className="">Quay lại</span>
      </button>
      <div className="flex px-20 justify-evenly my-10">
        <div className="flex-col bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100 p-2.5 w-[450px] h-fit">
          <img
            src={scholarshipDetail.image || scholarship1}
            className="mx-auto my-2"
          ></img>
          <div className="flex mx-auto text-[25px] text-green-400 my-2 justify-center">
            <span>{scholarshipDetail.type.toUpperCase()}</span>
          </div>
          {/* <div className="flex w-full">
            <span className="font-bold w-32">Loại học bổng:</span>
            <span>{scholarshipDetail.type}</span>
          </div> */}
          <div className="flex w-full my-2">
            <span className="font-bold min-w-[128px]">Giá trị:</span>
            <span>{scholarshipDetail["benefits/value"]}</span>
          </div>
          <div className="flex w-full my-2">
            <span className="font-bold min-w-[128px]">Trình độ:</span>
            <span>{scholarshipDetail.education_level}</span>
          </div>
          <div className="flex w-full my-2">
            <span className="font-bold min-w-[128px]">Hạn đăng ký:</span>
            <span>{scholarshipDetail.deadline}</span>
          </div>

          <div className="w-full justify-end flex my-4">
            <button
              className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-grey-200 hover:bg-green-500"
              onClick={() => (window.location.href = scholarshipDetail.link)}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
        <div className="w-7/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0 py-6 border-slate-200">
            <div className="font-bold text-lg text-green-500 ">
              {scholarshipDetail.title}
            </div>
          </div>
          {/* <div className="whitespace-pre-line text-start px-10">
            {dummyScholarshipDetail.description}
          </div> */}
          <div
            className="text-start px-10"
            dangerouslySetInnerHTML={{ __html: scholarshipDetail.html_file }}
          ></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ScholarshipDetailPage;

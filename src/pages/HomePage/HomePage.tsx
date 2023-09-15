import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import { DegreeType, ScholarshipType, Scholarship } from "src/models";
import ListScholarship from "./components/ListScholarship";
import { scholarship1 } from "src/assets";
import { useEffect, useState } from "react";
import FilterComponent from "./components/FilterComponent";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";
import NotiEnableRecommend from "src/components/notiEnableRecommend/NotiEnableRecommend";
import { Outlet, useSearchParams } from "react-router-dom";
import ScholarshipUserServices from "src/services/ScholarshipUserServices/ScholarshipUserServices";
import BtnSearch from "./components/BtnSearch";
import { Spin } from "antd";

const HomePage = () => {
  const [scholarshipData, setScholarshipData] = useState<Array<Scholarship>>(
    [],
  );
  const [scholarshipDataAll, setScholarshipDataAll] = useState<
    Array<Scholarship>
  >([]);
  const [showingData, setShowingData] =
    useState<Array<Scholarship>>(scholarshipData);

  const [recommendData, setRecommendData] = useState<Array<Scholarship>>([]);
  const [scholarshipDataType, setScholarshipDataType] = useState("scholarship");
  const [allPage, setAllPage] = useState<Array<number>>([]);
  const [currentNum, setCurrentNum] = useState(1);

  const isLogin = useSelector((state: any) => state.user.isLogin);
  const isRecommend = useSelector((state: any) => state.setting.isRecommend);

  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(
    useSelector((state: any) => state.user.token) || "",
  );
  const [shortlisted, setShortlisted] = useState([]);

  const getAllScholarshipData = async () => {
    try {
      const response = await ScholarshipServices.getAllScholar();
      setScholarshipDataAll(response.data.scholarship);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getScholarshipData = async (pageNumber: number) => {
    try {
      const response =
        await ScholarshipServices.getAllScholarByPage(pageNumber);
      setScholarshipData(response.data.scholarship);
      setShowingData(response.data.scholarship);
      console.log("response.data.scholarship: ", response.data.scholarship);
      let newAllPageNumber = [];
      for (var i = 1; i <= response.data.total_page; i++) {
        newAllPageNumber.push(i);
      }
      setAllPage(newAllPageNumber);
      setCurrentNum(pageNumber);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const getShortlistedData = async () => {
    try {
      const res = await ScholarshipUserServices.getAllShortlist(token);
      setShortlisted(res.data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    getScholarshipData(1);
    getAllScholarshipData();
    if (isLogin) {
      getShortlistedData();
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="flex px-20 justify-between my-10">
        <FilterComponent
          setShowingData={setShowingData}
          scholarshipDataAll={scholarshipDataAll}
        />
        <div className="w-4/5 h-full py-4 px-6 ">
          <BtnSearch
            setShowingData={setShowingData}
            scholarshipDataAll={scholarshipDataAll}
          />

          <div className="mt-4 flex-col">
            {isLogin && (
              <div className="flex w-full border-grey-200 border-b-[2px]">
                <button
                  className={` p-2.5 ${
                    scholarshipDataType === "scholarship"
                      ? "border-black border-b-[2px]"
                      : ""
                  }`}
                  onClick={() => {
                    setShowingData(scholarshipData);
                    setScholarshipDataType("scholarship");
                  }}
                >
                  Tất cả học bổng
                </button>
                <button
                  className={` p-2.5 ${
                    scholarshipDataType === "recommend"
                      ? "border-black border-b-[2px]"
                      : ""
                  }`}
                  onClick={() => {
                    setShowingData(recommendData);
                    setScholarshipDataType("recommend");
                  }}
                >
                  Học bổng gợi ý
                </button>
              </div>
            )}

            {scholarshipData.length === 0 && (
              <div className="flex justify-center my-8">
                <Spin tip="Loading" size="large" />
              </div>
            )}

            {(isRecommend || scholarshipDataType === "scholarship") && (
              <ListScholarship
                scholarships={showingData}
                shortlisted={shortlisted}
              ></ListScholarship>
            )}
            {!isRecommend && scholarshipDataType === "recommend" && (
              <div className="flex w-full justify-center mt-8">
                <NotiEnableRecommend />
              </div>
            )}
            {(isRecommend && scholarshipDataType === "recommend") ||
              (scholarshipDataType === "scholarship" &&
                searchParams.size === 0 && (
                  <div className="w-full justify-end flex">
                    <button
                      className={`mx-2 ${currentNum === 1 ? "hidden" : ""}`}
                      onClick={() => {
                        getScholarshipData(currentNum - 1);
                      }}
                    >
                      <GrFormPrevious />
                    </button>
                    {allPage.map((num: number, idx: number) => {
                      return (
                        <button
                          className={`mx-2 ${
                            currentNum === num
                              ? "underline underline-offset-1 text-blue-400"
                              : ""
                          }`}
                          key={idx}
                          onClick={() => getScholarshipData(num)}
                        >
                          {num}
                        </button>
                      );
                    })}
                    <button
                      className={`mx-2 ${
                        currentNum === allPage[allPage.length - 1]
                          ? "hidden"
                          : ""
                      }`}
                      onClick={() => {
                        getScholarshipData(currentNum + 1);
                      }}
                    >
                      <GrFormNext />
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Outlet />
    </DefaultLayout>
  );
};

export default HomePage;

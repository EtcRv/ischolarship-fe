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

  const getAllScholarshipData = async () => {
    const response = await ScholarshipServices.getAllScholar();
    setScholarshipDataAll(response.data.scholarship);
  };
  console.log(showingData);
  const getScholarshipData = async (pageNumber: number) => {
    const response = await ScholarshipServices.getAllScholarByPage(pageNumber);
    setScholarshipData(response.data.scholarship);
    setShowingData(response.data.scholarship);

    let newAllPageNumber = [];
    for (var i = 1; i <= response.data.total_page; i++) {
      newAllPageNumber.push(i);
    }
    setAllPage(newAllPageNumber);
    setCurrentNum(pageNumber);
  };

  useEffect(() => {
    getScholarshipData(1);
    getAllScholarshipData();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex px-20 justify-between my-10">
        <FilterComponent
          setShowingData={setShowingData}
          scholarshipDataAll={scholarshipDataAll}
        />
        <div className="w-4/5 h-full py-4 px-6 ">
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search Scholarship..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>

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

            {(isRecommend || scholarshipDataType === "scholarship") && (
              <ListScholarship scholarships={showingData}></ListScholarship>
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

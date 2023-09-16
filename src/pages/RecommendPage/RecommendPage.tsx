import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";
import { Scholarship } from "src/models";
import { useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SelectedFilter from "./components/SelectedFilter";
import { useDispatch, useSelector } from "react-redux";
import NotiEnableRecommend from "src/components/notiEnableRecommend/NotiEnableRecommend";
import ScholarshipComponent from "src/components/scholarshipComponent/ScholarshipComponent";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";
import { Spin } from "antd";
import { updateRecommendStatus } from "src/store/settingSlice";

type ValueFilterType = {
  type: string;
  value: number;
};

const allTypeValues = [
  {
    type: "Học bổng hỗ trợ khó khăn",
    value: 1,
  },
  {
    type: "Học bổng đại học/ du học",
    value: 2,
  },
  {
    type: "Học bổng tổ chức/ doanh nghiệp",
    value: 3,
  },
];

const allEducationLevelValues = [
  {
    type: "Tất cả các ngành hoặc không có thông tin cụ thể",
    value: 0,
  },
  {
    type: "Trung cấp",
    value: 1,
  },
  {
    type: "Cao đẳng",
    value: 2,
  },
  {
    type: "Đại học",
    value: 3,
  },
  {
    type: "Thạc sĩ",
    value: 4,
  },
  {
    type: "Tiến sĩ",
    value: 5,
  },
  {
    type: "Sau tiến sĩ",
    value: 6,
  },
];

const allMajorsValues = [
  {
    type: "Không có thông tin hoặc là tất cả các ngành",
    value: 0,
  },
  {
    type: "Kiến trúc và xây dựng",
    value: 1,
  },
  {
    type: "Kinh doanh và thương mại",
    value: 2,
  },
  {
    type: "Công nghệ thông tin",
    value: 3,
  },
  {
    type: " Luật - nhân văn",
    value: 4,
  },
  {
    type: "Báo chí - Khoa học xã hội",
    value: 5,
  },
  {
    type: "Y tế",
    value: 6,
  },
  {
    type: "Khoa học cơ bản",
    value: 7,
  },
  {
    type: "Sư phạm",
    value: 8,
  },
  {
    type: "Kỹ thuật - công nghiệp",
    value: 9,
  },
];

const RecommendPage = () => {
  const [isGetting, setIsGetting] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Array<ValueFilterType>>([]);
  const [educationFilter, setEducationLevel] = useState<Array<ValueFilterType>>(
    [],
  );
  const [majorFilter, setMajorLevel] = useState<Array<ValueFilterType>>([]);
  const [showAddNewType, setShowAddNewType] = useState(false);
  const [showAddNewEducation, setShowAddNewEducation] = useState(false);
  const [showAddNewMajor, setShowAddNewMajor] = useState(false);
  const [listRecommend, setListRecommend] = useState<Array<Scholarship>>([]);
  const [recommendMode, setRecommendMode] = useState(
    useSelector((state: any) => state.setting.isRecommend),
  );
  const dispatch = useDispatch();

  const getRecommendScholarship = async () => {
    setListRecommend([]);
    let typeValue;
    let educationValue;
    let majorValue;
    if (typeFilter.length > 0) {
      typeValue = typeFilter[0].value;
    }

    if (educationFilter.length > 0) {
      educationValue = educationFilter[0].value;
    }

    if (majorFilter.length > 0) {
      majorValue = majorFilter[0].value;
    }
    try {
      setIsGetting(true);
      const response = await ScholarshipServices.getRecommendation({
        type: typeValue,
        education_level: "" + educationValue,
        majors: "" + majorValue,
      });
      console.log("response: ", response);
      setListRecommend(response.data);
      setIsGetting(false);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="w-72 mx-4">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">Recommend</div>
            <div className="text-base">
              Scholarship recommended for you by system
            </div>
          </div>
          <div className="flex text-start mx-10 my-2">
            <label className="relative inline-flex items-center cursor-pointer my-2">
              <input
                checked={recommendMode}
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={() => {
                  setRecommendMode(!recommendMode);
                  dispatch(updateRecommendStatus());
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Tự động tìm kiếm học bổng!
              </span>
            </label>
          </div>
          <div className="flex-col p-6 text-start items-center">
            {!recommendMode && (
              <div className="flex w-full justify-center">
                <NotiEnableRecommend></NotiEnableRecommend>
              </div>
            )}
            <div className="flex w-full justify-end">
              {!showFilter && recommendMode && (
                <button
                  className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-green-500"
                  onClick={() => setShowFilter(true)}
                >
                  Filter
                </button>
              )}
              {showFilter && recommendMode && (
                <button
                  className="flex mt-2 rounded bg-red-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-red-500"
                  onClick={() => setShowFilter(false)}
                >
                  Close filter
                </button>
              )}
            </div>
            {showFilter && recommendMode && (
              <div className="w-full flex-col my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100 p-2.5">
                <span className="text-gray-500 my-2">* Indicates required</span>
                <div className="flex-col my-2">
                  <h2 className="mb-2">Scholarship Type*</h2>
                  <div className="flex flex-wrap">
                    {typeFilter.length > 0 &&
                      typeFilter.map((type: any, idx: number) => {
                        return (
                          <div
                            className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                            key={idx}
                          >
                            <span>{type.type}</span>
                            <button
                              onClick={() => {
                                const newArr = typeFilter.filter(
                                  (typeF: any) => {
                                    if (typeF.type !== type.type) return typeF;
                                    return null;
                                  },
                                );
                                console.log("newArr: ", newArr);
                                setTypeFilter(newArr);
                              }}
                            >
                              <IoMdRemoveCircleOutline className="ml-2" />
                            </button>
                          </div>
                        );
                      })}
                    {typeFilter.length === 0 && !showAddNewType && (
                      <button
                        className="text-blue-500 bg-white rounded-full flex p-1.5 m-2 items-center border-[1px] border-blue-500"
                        onClick={() => {
                          setShowAddNewType(true);
                        }}
                      >
                        <AiOutlinePlus className="mr-2" />
                        <span>Add type</span>
                      </button>
                    )}
                  </div>
                  {showAddNewType && (
                    <div className="w-1/2">
                      <SelectedFilter
                        emptyValue="Select Job"
                        allValue={allTypeValues}
                        setElement={setTypeFilter}
                        currentElements={typeFilter}
                        close={setShowAddNewType}
                      ></SelectedFilter>
                    </div>
                  )}
                </div>

                <div className="flex-col my-2">
                  <h2 className="mb-2">Scholarship Education Level*</h2>
                  <div className="flex flex-wrap">
                    {educationFilter.length > 0 &&
                      educationFilter.map((edu: any, idx: number) => {
                        return (
                          <div
                            className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                            key={idx}
                          >
                            <span>{edu.type}</span>
                            <button
                              onClick={() => {
                                const newArr = educationFilter.filter(
                                  (eduF: any) => {
                                    if (eduF.type !== edu.type) return eduF;
                                    return null;
                                  },
                                );
                                setEducationLevel(newArr);
                              }}
                            >
                              <IoMdRemoveCircleOutline className="ml-2" />
                            </button>
                          </div>
                        );
                      })}
                    {educationFilter.length === 0 && !showAddNewEducation && (
                      <button
                        className="text-blue-500 bg-white rounded-full flex p-1.5 m-2 items-center border-[1px] border-blue-500"
                        onClick={() => {
                          setShowAddNewEducation(true);
                        }}
                      >
                        <AiOutlinePlus className="mr-2" />
                        <span>Add level</span>
                      </button>
                    )}
                  </div>
                  {showAddNewEducation && (
                    <div className="w-1/2">
                      <SelectedFilter
                        emptyValue="Select Job"
                        allValue={allEducationLevelValues}
                        setElement={setEducationLevel}
                        currentElements={educationFilter}
                        close={setShowAddNewEducation}
                      ></SelectedFilter>
                    </div>
                  )}
                </div>

                <div className="flex-col my-2">
                  <h2 className="mb-2">Scholarship Major*</h2>
                  <div className="flex flex-wrap">
                    {majorFilter.length > 0 &&
                      majorFilter.map((edu: any, idx: number) => {
                        return (
                          <div
                            className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                            key={idx}
                          >
                            <span>{edu.type}</span>
                            <button
                              onClick={() => {
                                const newArr = majorFilter.filter(
                                  (eduF: any) => {
                                    if (eduF.type !== edu.type) return eduF;
                                    return null;
                                  },
                                );
                                setMajorLevel(newArr);
                              }}
                            >
                              <IoMdRemoveCircleOutline className="ml-2" />
                            </button>
                          </div>
                        );
                      })}
                    {majorFilter.length === 0 && !showAddNewMajor && (
                      <button
                        className="text-blue-500 bg-white rounded-full flex p-1.5 m-2 items-center border-[1px] border-blue-500"
                        onClick={() => {
                          setShowAddNewMajor(true);
                        }}
                      >
                        <AiOutlinePlus className="mr-2" />
                        <span>Add Major</span>
                      </button>
                    )}
                  </div>
                  {showAddNewMajor && (
                    <div className="w-1/2">
                      <SelectedFilter
                        emptyValue="Select Major"
                        allValue={allMajorsValues}
                        setElement={setMajorLevel}
                        currentElements={majorFilter}
                        close={setShowAddNewMajor}
                      ></SelectedFilter>
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    className="flex mt-4 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-green-500"
                    onClick={() => {
                      getRecommendScholarship();
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
          {isGetting && (
            <div className="flex p-6 justify-center items-center">
              <Spin tip="Loading" size="large" />
            </div>
          )}
          <div className="flex-col p-6 text-start items-center">
            {listRecommend.map((scholarship: Scholarship, idx: any) => {
              return (
                <div
                  className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
                  key={idx}
                >
                  <ScholarshipComponent
                    data={scholarship}
                    isShorlisted={false}
                    removeScholarship={(id: string) => {}}
                    token={""}
                  ></ScholarshipComponent>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RecommendPage;

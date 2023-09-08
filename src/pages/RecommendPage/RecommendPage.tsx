import { scholarship1 } from "src/assets";
import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";
import { DegreeType, Scholarship, ScholarshipType } from "src/models";
import ScholarshipRecommend from "./components/ScholarshipRecommend";
import { useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SelectedFilter from "./components/SelectedFilter";

const sampleRecommend: Array<Scholarship> = [
  {
    id: "1",
    name: "Test Scholarship 1",
    image: scholarship1,
    organization: "HUST",
    location: "Viet Nam",
    applyLocation: "Hust Student",
    ranking: 1,
    deadline: "nope",
    type: ScholarshipType.FULL,
    value: "Big Value",
    level: DegreeType.UNIVERSITY,
    field: "",
    link: "",
    requirement: {
      score: {
        CPA: 4.0,
      },
      competitions: true,
      experience: true,
      activities: "Test activities",
    },
    description: "Test Description about Scholarship",
  },
  {
    id: "2",
    name: "Test Scholarship 2",
    image: scholarship1,
    organization: "HUST HUST",
    location: "Viet Nam",
    applyLocation: "Huster",
    ranking: 1,
    deadline: "nope",
    type: ScholarshipType.ACADEMIC,
    value: "Big Value",
    level: DegreeType.UNIVERSITY,
    field: "",
    link: "",
    requirement: {
      score: {
        CPA: 4.0,
      },
      competitions: true,
      experience: true,
      activities: "Test activities",
    },
    description: "Test Description about Scholarship",
  },
  {
    id: "3",
    name: "Test Scholarship 3",
    image: scholarship1,
    organization: "HUST HUST",
    location: "Viet Nam",
    applyLocation: "Huster",
    ranking: 1,
    deadline: "nope",
    type: ScholarshipType.ACADEMIC,
    value: "Big Value",
    level: DegreeType.UNIVERSITY,
    field: "",
    link: "",
    requirement: {
      score: {
        CPA: 4.0,
      },
      competitions: true,
      experience: true,
      activities: "Test activities",
    },
    description: "Test Description about Scholarship",
  },
];

const allJobFilterElements = [
  "AI Intern",
  "AI Engineer",
  "asdasda",
  "asdwqqwd",
  "ascasdqwdq",
  "uihqwdhqdnsa",
  "sagdiqwhdiqndw",
  "sbasbcihqiwnq",
];

const RecommendPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(["AI Intern", "AI Engineer"]);
  const [showAddNewJob, setShowAddNewJob] = useState(false);

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
          <div className="flex-col p-6 text-start items-center">
            <div className="flex w-full justify-end">
              {!showFilter && (
                <button
                  className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-green-500"
                  onClick={() => setShowFilter(true)}
                >
                  Filter
                </button>
              )}
              {showFilter && (
                <button
                  className="flex mt-2 rounded bg-red-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-red-500"
                  onClick={() => setShowFilter(false)}
                >
                  Close filter
                </button>
              )}
            </div>
            {showFilter && (
              <div className="w-full flex-col my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100 p-2.5">
                <span className="text-gray-500 my-2">* Indicates required</span>
                <div className="flex-col my-2">
                  <h2 className="mb-2">Job titles*</h2>
                  <div className="flex flex-wrap">
                    {jobFilter.length > 0 &&
                      jobFilter.map((job: string, idx: number) => {
                        return (
                          <div
                            className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                            key={idx}
                          >
                            <span>{job}</span>
                            <button
                              onClick={() => {
                                const newArr = jobFilter.filter(
                                  (jobF: string) => {
                                    if (jobF !== job) return jobF;
                                  },
                                );
                                setJobFilter(newArr);
                              }}
                            >
                              <IoMdRemoveCircleOutline className="ml-2" />
                            </button>
                          </div>
                        );
                      })}
                    {!showAddNewJob && (
                      <button
                        className="text-blue-500 bg-white rounded-full flex p-1.5 m-2 items-center border-[1px] border-blue-500"
                        onClick={() => {
                          setShowAddNewJob(true);
                        }}
                      >
                        <AiOutlinePlus className="mr-2" />
                        <span>Add title</span>
                      </button>
                    )}
                  </div>
                  {showAddNewJob && (
                    <div className="w-1/2">
                      <SelectedFilter
                        emptyValue="Select Job"
                        allValue={allJobFilterElements}
                        setElement={setJobFilter}
                        currentElements={jobFilter}
                        close={setShowAddNewJob}
                      ></SelectedFilter>
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-end">
                  <button
                    className="flex mt-4 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-green-500"
                    onClick={() => setShowFilter(true)}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
            {/* {sampleRecommend.map((scholarship: Scholarship, idx: any) => {
              return (
                <div
                  className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
                  key={idx}
                >
                  <ScholarshipRecommend
                    data={scholarship}
                  ></ScholarshipRecommend>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RecommendPage;

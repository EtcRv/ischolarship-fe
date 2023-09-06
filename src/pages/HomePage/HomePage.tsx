import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import { DegreeType, ScholarshipType, Scholarship } from "src/models";
import ListScholarship from "./components/ListScholarship";
import { scholarship1 } from "src/assets";
import { useState } from "react";
import FilterComponent from "./components/FilterComponent";

const sampleSchoolScholarshipData: Array<Scholarship> = [
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
  {
    id: "4",
    name: "Test Scholarship 4",
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

const sampleCorporateScholarshipData: Array<Scholarship> = [
  {
    id: "1",
    name: "Test Corporate Scholarship 1",
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
    name: "Test Corporate Scholarship 2",
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
    name: "Test Corporate Scholarship 3",
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
    id: "4",
    name: "Test Corporate Scholarship 4",
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

const HomePage = () => {
  const [scholarshipData, setScholarshipData] = useState<Array<Scholarship>>(
    sampleSchoolScholarshipData,
  );
  const [scholarshipDataType, setScholarshipDataType] = useState("school");
  return (
    <DefaultLayout>
      <div className="flex px-20 justify-between my-10">
        <FilterComponent />
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
            <h2 className="mb-4 text-[25px] font-sans">
              Prominent scholarship
            </h2>
            <div className="flex w-full border-grey-200 border-b-[2px]">
              <button
                className={` p-2.5 ${
                  scholarshipDataType === "school"
                    ? "border-black border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  setScholarshipData(sampleSchoolScholarshipData);
                  setScholarshipDataType("school");
                }}
              >
                University scholarship
              </button>
              <button
                className={` p-2.5 ${
                  scholarshipDataType === "corporate"
                    ? "border-black border-b-[2px]"
                    : ""
                }`}
                onClick={() => {
                  setScholarshipData(sampleCorporateScholarshipData);
                  setScholarshipDataType("corporate");
                }}
              >
                Corporate scholarship
              </button>
            </div>
            <ListScholarship scholarships={scholarshipData}></ListScholarship>
            <div className="w-full justify-end flex">
              <button className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-grey-200 hover:bg-green-500">
                View all !
              </button>
            </div>
          </div>

          <div className="mt-4 flex-col"></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;

import { scholarship1 } from "src/assets";
import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";
import { DegreeType, Scholarship, ScholarshipType } from "src/models";
import ScholarshipRecommend from "./components/ScholarshipRecommend";

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

const RecommendPage = () => {
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
            {sampleRecommend.map((scholarship: Scholarship, idx: any) => {
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
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RecommendPage;

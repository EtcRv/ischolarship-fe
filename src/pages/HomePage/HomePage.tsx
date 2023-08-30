import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import { DegreeType, ScholarshipType, Scholarship } from "src/models";
import ListScholarship from "./components/ListScholarship";
import { scholarship1 } from "src/assets";

const sampleScholarshipData: Array<Scholarship> = [
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
];

const HomePage = () => {
  return (
    <DefaultLayout>
      <div className="flex px-20 justify-between my-10">
        <div className="bg-white max-w-md flex-col rounded py-4 px-6">
          <span className="text-black text-start text-base">Filter</span>
          <div className="flex-col my-4">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nationality
            </label>
            <select
              id="countries"
              className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Select country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="flex-col my-4">
            <label
              htmlFor="degree"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              I'm looking for{" "}
            </label>
            <select
              id="degree"
              className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Select degree</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
            Search
          </button>
        </div>
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
                placeholder="Search Mockups, Logos..."
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

          <div className="mt-4">
            <ListScholarship
              scholarships={sampleScholarshipData}
            ></ListScholarship>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;

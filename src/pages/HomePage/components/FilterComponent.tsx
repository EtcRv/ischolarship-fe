import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";

const FilterComponent = ({ setShowingData, scholarshipDataAll }: any) => {
  const [allType, setAllType] = useState([]);
  const [allEducationLevel, setAllEducationLevel] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState(searchParams.get("type") || "");
  console.log(type);
  const [educationLevel, setEducationLevel] = useState("");
  const FilterData = (key: string, value: any) => {
    // console.log(scholarshipDataAll[0][key]);
    return scholarshipDataAll?.filter((element: any) => {
      return element[key] == value;
    });
  };
  const handleFilter = () => {
    setSearchParams((searchParams) => {
      if (type) {
        searchParams.set("type", type);
        const showData = FilterData("type", type);
        setShowingData(showData);
      }
      if (educationLevel) searchParams.set("education_level", educationLevel);
      return searchParams;
    });
  };

  const getAllTypeData = async () => {
    const res = await ScholarshipServices.getAllScholarshipType();
    setAllType(res.data.data);
  };

  const getAllEducationLevel = async () => {
    const res = await ScholarshipServices.getAllScholarshipEducationLevel();
    setAllEducationLevel(res.data.data);
  };

  useEffect(() => {
    getAllTypeData();
    getAllEducationLevel();
  }, []);

  return (
    <div className="bg-white h-fit max-w-md flex-col rounded py-4 px-6">
      <span className="text-black text-start text-base">Filter</span>
      <div className="flex-col my-4">
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Loại Học Bổng
        </label>
        <select
          id="type"
          className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          defaultValue=""
          onChange={(e) => setType(e.currentTarget.value)}
        >
          <option value="">
            {searchParams.get("type")
              ? searchParams.get("type")?.toString()
              : "Chọn loại học bổng"}
          </option>
          {allType.map((type: string, idx: number) => (
            <option value={type} key={idx}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-col my-4">
        <label
          htmlFor="level"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Trình độ học vấn
        </label>
        <select
          id="level"
          className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          defaultValue=""
          onChange={(e) => setEducationLevel(e.currentTarget.value)}
        >
          <option value="">
            {searchParams.get("education_level")
              ? searchParams.get("education_level")?.toString()
              : "Chọn trình độ"}
          </option>
          {allEducationLevel.map((level: string, idx: number) => (
            <option value={level} key={idx}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        onClick={handleFilter}
      >
        Search
      </button>
    </div>
  );
};

export default FilterComponent;

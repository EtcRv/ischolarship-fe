import { useEffect, useState } from "react";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";

const FilterComponent = () => {
  const [allType, setAllType] = useState([]);
  const [allEducationLevel, setAllEducationLevel] = useState([]);

  const [type, setType] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

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
          <option value="">Chọn loại học bổng</option>
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
          <option value="">Chọn trình độ</option>
          {allEducationLevel.map((level: string, idx: number) => (
            <option value={level} key={idx}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
        Search
      </button>
    </div>
  );
};

export default FilterComponent;

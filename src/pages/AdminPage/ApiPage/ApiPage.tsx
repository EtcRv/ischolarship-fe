import { Space, Table, Tag, Button, Modal, Select, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Scholarship } from "src/models";
import ScholarshipServices from "src/services/ScholarshipServices/ScholarshipServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectedFilter from "src/pages/RecommendPage/components/SelectedFilter";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import SuccessMessage from "src/components/successMessage/SuccessMessage";
import axios from "axios";

interface DataType {
  _id: string;
  title: string;
  organization: string;
  deadline: string;
  type: string;
  "benefits/value": string;
  education_level: string;
  majors: string;
  link: string;
  requirements: string;
}

const typeData = [
  "Học bổng hỗ trợ khó khăn",
  "Học bổng đại học/ du học",
  "Học bổng doanh nghiệp",
];
const educationLevelData = [
  "Tất cả các ngành hoặc không có thông tin cụ thể",
  "Trung cấp",
  "Cao đẳng",
  "Đại học",
  "Thạc sĩ",
  "Tiến sĩ",
  "Sau tiến sĩ",
];

const majorsData = [
  "Không có thông tin hoặc là tất cả các ngành",
  "Kiến trúc và xây dựng",
  "Kinh doanh và thương mại",
  "Công nghệ thông tin",
  "Luật - nhân văn",
  "Báo chí - Khoa học xã hội",
  "Y tế",
  "Khoa học cơ bản",
  "Sư phạm",
  "Kỹ thuật - công nghiệp",
];

const ApiPage = () => {
  // const columns: ColumnsType<DataType> = [
  //   {
  //     title: "Title",
  //     dataIndex: "title",
  //     key: "title",
  //   },
  //   {
  //     title: "Organization",
  //     dataIndex: "organization",
  //     key: "organization",
  //   },
  //   {
  //     title: "Deadline",
  //     dataIndex: "deadline",
  //     key: "deadline",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //     key: "type",
  //     render: (text) => {
  //       if (text === 1) {
  //         return <p>Học bổng hỗ trợ khó khăn</p>;
  //       } else if (text === 2) {
  //         return <p>Học bổng doanh nghiệp</p>;
  //       } else if (text === 3) {
  //         return <p>Học bổng đại học/du học</p>;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: "Benefits/value",
  //     dataIndex: "benefits/value",
  //     key: "benefits/value",
  //   },
  //   {
  //     title: "Education Level",
  //     dataIndex: "education_level",
  //     key: "education_level",
  //     render: (text) => {
  //       let edu_levels = text.trim().split(",");
  //       for (let i = 0; i < edu_levels.length; i++) {
  //         edu_levels[i] = educationLevelData[parseInt(edu_levels[i])];
  //       }
  //       return <p>{edu_levels.join(", ")}</p>;
  //     },
  //   },
  //   {
  //     title: "Majors",
  //     dataIndex: "majors",
  //     key: "majors",
  //     render: (text) => {
  //       let majors = text.trim().split(",");
  //       for (let i = 0; i < majors.length; i++) {
  //         majors[i] = majorsData[parseInt(majors[i])];
  //       }
  //       return <p>{majors.join(", ")}</p>;
  //     },
  //   },
  //   {
  //     title: "Link",
  //     dataIndex: "link",
  //     key: "link",
  //   },
  //   {
  //     title: "Requirements",
  //     dataIndex: "requirements",
  //     key: "requirements",
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => {
  //       return (
  //         <Space size="middle">
  //           <div className="flex-col">
  //             <button
  //               className="bg-cyan-400 p-2 rounded my-4"
  //               onClick={() => {}}
  //             >
  //               Save
  //             </button>
  //             <button
  //               className="bg-cyan-400 p-2 rounded my-4"
  //               onClick={() => {}}
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </Space>
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      title: "List URL",
      dataIndex: "url",
      key: "url",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        console.log(record);
        return (
          <Space size="middle">
            <div className="flex">
              <button
                className="bg-cyan-400 p-2 rounded m-4"
                onClick={() => {}}
              >
                Save
              </button>
              <button
                className="bg-cyan-400 p-2 rounded m-4"
                onClick={() => {}}
              >
                Delete
              </button>
            </div>
          </Space>
        );
      },
    },
  ];

  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataFromURL = async () => {
    setIsLoading(true);
    try {
      const resPathType = await axios
        .create({ baseURL: "http://localhost:8000/" })
        .get(`/api/task5(path_type)/${url}`);
      const resQueryType = await axios
        .create({ baseURL: "http://localhost:8000/" })
        .get(`/api/task5(query_type)/${url}`);

      let filterArr: any = [];
      resPathType.data.result.forEach((link: any) => {
        if (!filterArr.includes(link.trim())) {
          filterArr.push(link.trim());
        }
      });
      console.log("resQueryType: ", resQueryType);
      resQueryType.data.result.forEach((link: any) => {
        if (!filterArr.includes(link.trim())) {
          filterArr.push(link.trim());
        }
      });
      let extracPath: any = [];
      filterArr.forEach((link: any) => {
        extracPath.push({
          url: link,
        });
      });
      setData(extracPath);
      // console.log("resQueryType: ", resQueryType);
    } catch (err) {
      console.log("err: ", err);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    getDataFromURL();
  };

  return (
    <div className="bg-[#f5f5f5]">
      <div className="bg-white border-grey-200 px-4 lg:px-6 py-2.5 border-b-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a className="flex items-center" href="/admin/database">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Admin
            </span>
          </a>
          <div className="flex">
            <button
              className="bg-green-400 p-2.5 rounded mx-2"
              onClick={() => navigate("/admin/database")}
            >
              Database
            </button>
            <button
              className="bg-green-400 p-2.5 rounded mx-2"
              onClick={() => navigate("/admin/api")}
            >
              API
            </button>
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl m-4">Get data</h2>
      <div className="my-4 flex justify-center ">
        <div className="w-[1000px]">
          <form className="w-full">
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
                placeholder="Get Data..."
                required
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spin tip="Loading" size="large" />
        </div>
      )}
      {!isLoading && (
        <div className="p-2.5 my-10">
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default ApiPage;

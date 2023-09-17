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
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import SuccessMessage from "src/components/successMessage/SuccessMessage";
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

const NewDBPage = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        if (text === 1) {
          return <p>Học bổng hỗ trợ khó khăn</p>;
        } else if (text === 2) {
          return <p>Học bổng doanh nghiệp</p>;
        } else if (text === 3) {
          return <p>Học bổng đại học/du học</p>;
        }
        return text;
      },
    },
    {
      title: "Benefits/value",
      dataIndex: "benefits/value",
      key: "benefits/value",
    },
    {
      title: "Education Level",
      dataIndex: "education_level",
      key: "education_level",
      render: (text) => {
        let edu_levels = text.trim().split(",");
        for (let i = 0; i < edu_levels.length; i++) {
          edu_levels[i] = educationLevelData[parseInt(edu_levels[i])];
        }
        return <p>{edu_levels.join(", ")}</p>;
      },
    },
    {
      title: "Majors",
      dataIndex: "majors",
      key: "majors",
      render: (text) => {
        let majors = text.trim().split(",");
        for (let i = 0; i < majors.length; i++) {
          majors[i] = majorsData[parseInt(majors[i])];
        }
        return <p>{majors.join(", ")}</p>;
      },
    },
    // {
    //   title: "Link",
    //   dataIndex: "link",
    //   key: "link",
    // },
    {
      title: "Requirements",
      dataIndex: "requirements",
      key: "requirements",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <button
              className="bg-cyan-400 p-2 rounded"
              onClick={() => {
                console.log("record: ", record);
                showModal();
                setRecordSelect(record);
                setValueFromRecord(record);
              }}
            >
              Edit
            </button>
          </Space>
        );
      },
    },
  ];

  const navigate = useNavigate();
  const [allScholarshipData, setAllScholarshipData] = useState([]);
  const [data, setData] = useState<Array<DataType>>([]);
  const [scholarshipPageData, setScholarshipPageData] = useState<
    Array<Scholarship>
  >([]);
  const [recordSelect, setRecordSelect] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [titleSelect, setTitleSelect] = useState("");
  const [organizationSelect, setOrganizationSelect] = useState("");
  const [deadlineSelect, setDeadlineSelect] = useState(new Date());
  const [typeSelect, setTypeSelect] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [linkSelect, setLinkSelect] = useState("");
  const [requireSelect, setRequireSelect] = useState("");

  const [majorArrFilter, setMajorArrFilter] = useState<Array<string>>([]);
  const [educationArrFilter, setEducationArrLevel] = useState<Array<string>>(
    [],
  );
  const [showAddNewMajor, setShowAddNewMajor] = useState(false);
  const [showAddNewEducation, setShowAddNewEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeFilterTodayStatus = (e: CheckboxChangeEvent) => {
    const checkedValue = e.target.checked;
    if (checkedValue) {
      setData([
        allScholarshipData[0],
        allScholarshipData[1],
        allScholarshipData[2],
      ]);
    } else {
      setData(scholarshipPageData);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      setIsModalOpen(false);
      let finalEduVal: any = [];
      educationArrFilter.forEach((edu: any) =>
        finalEduVal.push(educationLevelData.indexOf(edu)),
      );
      let finalMajorVal: any = [];
      majorArrFilter.forEach((major: any) => {
        finalMajorVal.push(majorsData.indexOf(major));
      });

      const originalDate = new Date(deadlineSelect);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(originalDate.getDate()).padStart(2, "0");

      // Create the formatted string
      const formattedDate = `${year}-${month}-${day}T00:00:00`;

      const res = await ScholarshipServices.updateScholarshipInfo(idSelect, {
        title: titleSelect,
        organization: organizationSelect,
        deadline: formattedDate,
        type: typeData.indexOf(typeSelect),
        "benefits/value": valueSelect,
        education_level: finalEduVal.join(","),
        majors: finalMajorVal.join(","),
        link: linkSelect,
        requirements: requireSelect,
      });

      const newDataShow = data.map((d: any, idx: any) => {
        if (d._id === idSelect)
          return {
            _id: idSelect,
            title: titleSelect,
            organization: organizationSelect,
            deadline: formattedDate,
            type: typeData.indexOf(typeSelect),
            "benefits/value": valueSelect,
            education_level: finalEduVal.join(","),
            majors: finalMajorVal.join(","),
            link: linkSelect,
            requirements: requireSelect,
          };
        return d;
      });
      SuccessMessage("Success", "Update Successfull");
      console.log("newDataShow[0]: ", newDataShow[0]);
      setData(newDataShow);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValueFromRecord(recordSelect);
  };

  const changeType = (value: any) => {
    setTypeSelect(value);
  };

  const setValueFromRecord = (record: any) => {
    setIdSelect(record._id);
    setTitleSelect(record.title);
    setOrganizationSelect(record.organization);
    setDeadlineSelect(new Date(record.deadline));
    setValueSelect(record["benefits/value"]);
    setLinkSelect(record.link);
    setRequireSelect(record.requirements);
    setTypeSelect(record.type);
    let eduArr = record.education_level.trim().split(",");
    for (let i = 0; i < eduArr.length; i++) {
      eduArr[i] = educationLevelData[parseInt(eduArr[i])];
    }
    setEducationArrLevel(eduArr);
    let majorArr = record.majors.trim().split(",");
    for (let i = 0; i < majorArr.length; i++) {
      majorArr[i] = majorsData[parseInt(majorArr[i])];
    }
    setMajorArrFilter(majorArr);
  };

  const addNewValueToArr = (
    value: any,
    allData: any,
    setValue: any,
    close: any,
  ) => {
    if (!allData.includes(value)) {
      setValue([...allData, value]);
      close(false);
    }
  };

  const getScholarshipDataByPage = async (pageNumber: number) => {
    setIsLoading(true);

    try {
      const res = await ScholarshipServices.getAllScholarByPage(pageNumber);
      console.log("res: ", res);
      const newTableData: Array<DataType> = [];
      setScholarshipPageData(res.data.scholarship);
      res.data.scholarship.forEach((scholarshipData: Scholarship) => {
        const arr: DataType = {
          _id: scholarshipData._id,
          title: scholarshipData.title,
          organization: scholarshipData.organization,
          deadline: scholarshipData.deadline,
          type: scholarshipData.type,
          "benefits/value": scholarshipData["benefits/value"],
          education_level: scholarshipData.education_level,
          majors: scholarshipData.majors,
          link: scholarshipData.link,
          requirements: scholarshipData.requirements,
        };
        newTableData.push(arr);
      });
      let newAllPageNumber = [];
      for (var i = 1; i <= res.data.total_page; i++) {
        newAllPageNumber.push(i);
      }
      setData(newTableData);
    } catch (err) {
      console.log("err: ", err);
    }
    setIsLoading(false);
  };

  const getAllScholarshipData = async () => {
    try {
      const res = await ScholarshipServices.getAllScholar();
      setAllScholarshipData(res.data.scholarship);
      console.log("res: ", res);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    getScholarshipDataByPage(1);
    getAllScholarshipData();
  }, []);
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
      <h2 className="font-bold text-xl m-4">Modify Database</h2>
      <div className="my-4 flex justify-center ">
        <div className="w-[500px]">
          <Search
            setShowingData={setData}
            scholarshipDataAll={allScholarshipData}
            setIsSearchingResult={(value: any) => console.log("Value: ", value)}
          ></Search>
        </div>
      </div>
      <div className="m-10">
        <Checkbox onChange={changeFilterTodayStatus}>
          <span className="font-bold text-xl">Show new data</span>
        </Checkbox>
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
      <Modal
        title="Change Scholarship Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        width={1000}
        okButtonProps={{ type: "link" }}
      >
        <div className="flex-col">
          <div className="flex flex-col my-6">
            <label className="font-bold pb-2 flex">Title:</label>
            <input
              type="text"
              className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
              placeholder="Title"
              value={titleSelect}
              onChange={(e) => setTitleSelect(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col my-6">
            <label className="font-bold pb-2 flex">Organization:</label>
            <input
              type="text"
              className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
              placeholder="Organization"
              value={organizationSelect}
              onChange={(e) => setOrganizationSelect(e.currentTarget.value)}
            />
          </div>

          <div className="flex">
            <div className="flex flex-col my-6 mx-4">
              <label className="font-bold pb-2 flex">Deadline:</label>
              <div className="font-normal mx-2 ">
                <div className="border-[1px] border-gray-200 p-1 rounded">
                  <DatePicker
                    selected={deadlineSelect}
                    onChange={(date) => {
                      if (date !== null) setDeadlineSelect(date);
                    }}
                    placeholderText="Select a date"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col my-6 mx-4">
              <label className="font-bold pb-2 flex">Scholarship type:</label>
              <Select
                value={
                  /\d/.test(typeSelect)
                    ? typeData[parseInt(typeSelect)]
                    : typeSelect
                }
                style={{ width: 300 }}
                onChange={changeType}
                options={typeData.map((data) => ({ label: data, value: data }))}
              />
            </div>
          </div>

          <div className="w-full flex-col my-4 bg-white">
            <div className="flex-col my-2">
              <h2 className="mb-2 font-bold">Education Level</h2>
              <div className="flex flex-wrap">
                {educationArrFilter.length > 0 &&
                  educationArrFilter.map((edu: any, idx: number) => {
                    return (
                      <div
                        className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                        key={idx}
                      >
                        <span>{edu}</span>
                        <button
                          onClick={() => {
                            const newArr = educationArrFilter.filter(
                              (eduF: any) => {
                                if (eduF !== edu) return eduF;
                                return null;
                              },
                            );
                            console.log("newArr: ", newArr);
                            setEducationArrLevel(newArr);
                          }}
                        >
                          <IoMdRemoveCircleOutline className="ml-2" />
                        </button>
                      </div>
                    );
                  })}
                {!showAddNewEducation && (
                  <button
                    className="text-blue-500 bg-white rounded-full flex p-1.5 m-2 items-center border-[1px] border-blue-500"
                    onClick={() => {
                      setShowAddNewEducation(true);
                    }}
                  >
                    <AiOutlinePlus className="mr-2" />
                    <span>Add Education Level</span>
                  </button>
                )}
              </div>
              {showAddNewEducation && (
                <div className="w-1/2">
                  <Select
                    style={{ width: 300 }}
                    onChange={(v) =>
                      addNewValueToArr(
                        v,
                        educationArrFilter,
                        setEducationArrLevel,
                        setShowAddNewEducation,
                      )
                    }
                    options={educationLevelData.map((data) => ({
                      label: data,
                      value: data,
                    }))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex-col my-4 bg-white">
            <div className="flex-col my-2">
              <h2 className="mb-2 font-bold">Majors</h2>
              <div className="flex flex-wrap">
                {majorArrFilter.length > 0 &&
                  majorArrFilter.map((major: any, idx: number) => {
                    return (
                      <div
                        className="text-white bg-green-500 rounded-full flex p-1.5 m-2 items-center border-[1px] border-green-500"
                        key={idx}
                      >
                        <span>{major}</span>
                        <button
                          onClick={() => {
                            const newArr = majorArrFilter.filter(
                              (majorF: any) => {
                                if (majorF !== major) return majorF;
                                return null;
                              },
                            );
                            setMajorArrFilter(newArr);
                          }}
                        >
                          <IoMdRemoveCircleOutline className="ml-2" />
                        </button>
                      </div>
                    );
                  })}
                {!showAddNewMajor && (
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
                  <Select
                    style={{ width: 300 }}
                    onChange={(v) => {
                      console.log("value: ", v);
                      addNewValueToArr(
                        v,
                        majorArrFilter,
                        setMajorArrFilter,
                        setShowAddNewMajor,
                      );
                    }}
                    options={majorsData.map((data) => ({
                      label: data,
                      value: data,
                    }))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col my-6">
            <label className="font-bold pb-2 flex">
              Link Register Scholarship:
            </label>
            <input
              type="text"
              className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
              placeholder="Link"
              value={linkSelect}
              onChange={(e) => setLinkSelect(e.currentTarget.value)}
            />
          </div>

          <div className="flex flex-col my-6">
            <label className="font-bold pb-2 flex">Requiments:</label>
            <TextArea
              rows={4}
              placeholder="Requiments"
              value={requireSelect}
              onChange={(e) => setRequireSelect(e.currentTarget.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewDBPage;

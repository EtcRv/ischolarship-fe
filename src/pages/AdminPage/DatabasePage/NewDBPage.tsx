import { Space, Table, Tag, Button, Modal, Select } from "antd";
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
  "Học bổng doanh nghiệp",
  "Học bổng đại học/ du học",
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
  " Luật - nhân văn",
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
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    let finalEduVal: any = [];
    educationArrFilter.forEach((edu: any) =>
      finalEduVal.push(educationLevelData.indexOf(edu)),
    );
    let finalMajorVal: any = [];
    educationArrFilter.forEach((major: any) =>
      finalMajorVal.push(majorsData.indexOf(major)),
    );
    const res = await ScholarshipServices.updateScholarshipInfo(idSelect, {
      title: titleSelect,
      organization: organizationSelect,
      deadline: deadlineSelect,
      type: typeSelect,
      "benefits/value": valueSelect,
      education_level: finalEduVal.join(","),
      majors: educationArrFilter.join(","),
      link: linkSelect,
      requirements: requireSelect,
    });

    console.log("res: ", res);
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
    setTypeSelect(typeData[parseInt(record.type)]);
    let eduArr = record.education_level.trim().split(",");
    for (let i = 0; i < eduArr.length; i++) {
      eduArr[i] = educationLevelData[parseInt(eduArr[i])];
    }
    setEducationArrLevel(eduArr);
    let majorArr = record.majors.trim().split(",");
    for (let i = 0; i < majorArr.length; i++) {
      majorArr[i] = educationLevelData[parseInt(majorArr[i])];
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
    const res = await ScholarshipServices.getAllScholarByPage(pageNumber);
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
  };

  useEffect(() => {
    getScholarshipDataByPage(1);
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
            <button className="bg-green-400 p-2.5 rounded mx-2">
              Database
            </button>
            <button className="bg-green-400 p-2.5 rounded mx-2">API</button>
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-center ">
        <div className="w-[500px]">
          <Search
            setShowingData={setData}
            scholarshipDataAll={scholarshipPageData}
            setIsSearchingResult={(value: any) => console.log("Value: ", value)}
          ></Search>
        </div>
      </div>
      <div className="p-2.5 my-10">
        <Table columns={columns} dataSource={data} />
      </div>
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
                defaultValue={typeSelect}
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
                    defaultValue={""}
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
                    defaultValue={""}
                    style={{ width: 300 }}
                    onChange={(v) =>
                      addNewValueToArr(
                        v,
                        majorArrFilter,
                        setMajorArrFilter,
                        setShowAddNewMajor,
                      )
                    }
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

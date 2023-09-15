import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";
import { DegreeType, Scholarship, ScholarshipType } from "src/models";
import { useEffect, useState } from "react";
import ScholarshipComponent from "src/components/scholarshipComponent/ScholarshipComponent";
import { useSelector } from "react-redux";
import ScholarshipUserServices from "src/services/ScholarshipUserServices/ScholarshipUserServices";
import ScholarshipInShortlisted from "./components/ScholarshipInShortlisted";
import { Spin } from "antd";

const sampleShortlisted: Array<Scholarship> = [];

const ShortlistedPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortlisted, setShortlisted] = useState([]);
  const token = useSelector((state: any) => state.user.token);

  const removeScholarship = (id: string) => {
    const newArr = shortlisted.filter((scholarship: any) => {
      if (scholarship.data._id !== id) return scholarship;
    });
    setShortlisted(newArr);
  };

  const getShortlistedData = async () => {
    setIsLoading(true);
    try {
      const res = await ScholarshipUserServices.getAllShortlist(token);
      console.log("res: ", res);
      setShortlisted(res.data);
    } catch (err) {
      console.log("error: ", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getShortlistedData();
  }, []);
  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="w-72 mx-4">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">Shortlisted</div>
            <div className="text-base">Danh sách học bổng mà bạn quan tâm</div>
          </div>
          <div className="flex-col p-6 text-start items-center">
            {isLoading && (
              <div className="flex justify-center my-8">
                <Spin tip="Loading" size="large" />
              </div>
            )}
            {shortlisted.length > 0 &&
              !isLoading &&
              shortlisted.map((scholarship: any, idx: any) => {
                return (
                  <div
                    className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
                    key={idx}
                  >
                    <ScholarshipInShortlisted
                      token={token}
                      data={scholarship.data}
                      removeScholarship={removeScholarship}
                      isShorlisted={scholarship.status}
                    ></ScholarshipInShortlisted>
                    {/* <ScholarshipComponent
                    data={scholarship}
                    removeScholarship={removeScholarship}
                    isShorlisted={true}
                  ></ScholarshipComponent> */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ShortlistedPage;

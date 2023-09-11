import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import ProfilePageSideBar from "src/components/userPageSideBar/ProfilePageSideBar";
import { DegreeType, Scholarship, ScholarshipType } from "src/models";
import { useState } from "react";
import ScholarshipComponent from "src/components/scholarshipComponent/ScholarshipComponent";

const sampleShortlisted: Array<Scholarship> = [];

const ShortlistedPage = () => {
  const [shortlisted, setShortlisted] = useState(sampleShortlisted);

  const removeScholarship = (id: string) => {
    const newArr = shortlisted.filter((scholarship: Scholarship) => {
      if (scholarship._id !== id) return scholarship;
    });
    setShortlisted(newArr);
  };
  return (
    <DefaultLayout>
      <div className="flex px-20 h-full w-full my-10">
        <div className="w-72 mx-4">
          <ProfilePageSideBar></ProfilePageSideBar>
        </div>
        <div className="w-9/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0  py-6  border-slate-200">
            <div className="font-bold text-lg text-green-500 ">Shortlisted</div>
            <div className="text-base">Add information about yourself</div>
          </div>
          <div className="flex-col p-6 text-start items-center">
            {shortlisted.map((scholarship: Scholarship, idx: any) => {
              return (
                <div
                  className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
                  key={idx}
                >
                  <ScholarshipComponent
                    data={scholarship}
                    removeScholarship={removeScholarship}
                    isShorlisted={true}
                  ></ScholarshipComponent>
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

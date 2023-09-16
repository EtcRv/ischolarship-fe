import { Scholarship } from "src/models";
import ScholarshipComponent from "src/components/scholarshipComponent/ScholarshipComponent";
import { useSelector } from "react-redux";
import { useState } from "react";

const ListScholarship = (props: any) => {
  const token = useSelector((state: any) => state.user.token);
  const [shortlisted, setShortlisted] = useState(
    props.shortlisted.length > 0
      ? props.shortlisted.map((ele: any, idx: number) => ele.data)
      : [],
  );

  return (
    <div className="">
      {props.scholarships.map((scholarship: Scholarship, idx: any) => {
        return (
          <div
            className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
            key={idx}
          >
            <ScholarshipComponent
              data={scholarship}
              isShorlisted={shortlisted.some(
                (item: any) => item._id === scholarship._id,
              )}
              removeScholarship={(id: string) => {}}
              token={token}
            ></ScholarshipComponent>
          </div>
        );
      })}
    </div>
  );
};

export default ListScholarship;

import { Scholarship } from "src/models";
import ScholarshipComponent from "./ScholarshipComponent";

const ListScholarship = (props: any) => {
  return (
    <div className="">
      {props.scholarships.map((scholarship: Scholarship, idx: any) => {
        return (
          <div
            className="my-4 bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100"
            key={idx}
          >
            <ScholarshipComponent data={scholarship}></ScholarshipComponent>
          </div>
        );
      })}
    </div>
  );
};

export default ListScholarship;

import { Scholarship } from "src/models";
import ScholarshipComponent from "./ScholarshipComponent";

const ListScholarship = (props: any) => {
  return (
    <div>
      {props.scholarships.map((scholarship: Scholarship, idx: any) => {
        return (
          <div className="my-4" key={idx}>
            <ScholarshipComponent data={scholarship}></ScholarshipComponent>
          </div>
        );
      })}
    </div>
  );
};

export default ListScholarship;

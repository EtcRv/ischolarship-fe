import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ArchievementForm from "./ArchievementForm";
import { useSelector } from "react-redux";

const Archievement = (props: any) => {
  const userId = useSelector((state: any) => state.user.user.id);
  const [title, setTitle] = useState(props.data.title);
  const [role, setRole] = useState(props.data.role);
  const [description, setDescription] = useState(props.data.description);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex-col border-b-[1px] border-grey-100 py-4">
      {!isEdit && (
        <div className="flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold my-2">{title}</h2>
            <div className="flex justify-center">
              <button className="mx-2" onClick={() => setIsEdit(true)}>
                <AiOutlineEdit className="text-red-600 text-xl" />
              </button>
              <button className="mx-2">
                <BsTrash className="text-gray-600 text-xl" />
              </button>
            </div>
          </div>
          <div className="my-2">
            <span>{role}</span>
          </div>
          <div className="my-2 ">
            <span className="text-gray-400">{description}</span>
          </div>
        </div>
      )}
      {isEdit && (
        <ArchievementForm
          data={{
            id: props.data.id,
            title: title,
            role: role,
            description: description,
          }}
          changeEdit={(value: boolean) => setIsEdit(value)}
          changeTitle={(value: string) => setTitle(value)}
          changeRole={(value: string) => setRole(value)}
          changeDescription={(value: string) => setDescription(value)}
          changeAllArchievement={(value: any) => {}}
        ></ArchievementForm>
      )}
    </div>
  );
};

export default Archievement;

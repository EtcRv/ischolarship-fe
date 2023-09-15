import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AchievementServices from "src/services/AchievementServices/AchievementServices";

const ArchievementForm = (props: any) => {
  const token = useSelector((state: any) => state.user.token);
  const [title, setTitle] = useState(props.data.title);
  const [role, setRole] = useState(props.data.role);
  const [description, setDescription] = useState(props.data.description);

  const navigate = useNavigate();

  const handleCreateAchievement = async () => {
    if (props.data.id === "") {
      props.changeTitle("");
      props.changeRole("");
      props.changeDescription("");
      const data = {
        title,
        role,
        description,
      };
      try {
        const res = await AchievementServices.createAchievement(token, data);
        console.log("res: ", res);
      } catch (err) {
        console.log("err: ", err);
      }
      const minNum = 100000000;
      const maxNum = 999999999;
      props.changeAllArchievement({
        id: Math.floor(Math.random() * (maxNum - minNum + 1) + minNum),
        title,
        role,
        description,
      });
    } else {
      props.changeTitle(title);
      props.changeRole(role);
      props.changeDescription(description);
      const data = {
        achievement_id: props.data.id,
        title,
        role,
        description,
      };
      console.log(data);
      try {
        const res = await AchievementServices.updateAchievement(token, data);
        console.log("res: ", res);
      } catch (err) {
        console.log("err: ", err);
      }
    }
    props.changeEdit(false);
    navigate(0);
  };
  return (
    <div className="flex-col">
      <div className="flex flex-col w-9/12  my-6">
        <label className="font-bold pb-2 flex">
          Tên chứng chỉ, tên dự án, tên công ty *:
        </label>
        <input
          type="text"
          className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
          placeholder="Tên chứng chỉ, tên dự án, tên công ty"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col w-9/12  my-6">
        <label className="font-bold pb-2 flex">
          Chức vụ trong công ty/ team, vị thế đối với chứng chỉ (thí sinh, cố
          vấn, …) *:
        </label>
        <input
          type="text"
          className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
          placeholder="chức vụ trong công ty/ team, vị thế đối với chứng chỉ (thí sinh, cố vấn, …)"
          value={role}
          onChange={(e) => setRole(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col w-9/12  my-6">
        <label className="font-bold pb-2 flex">Mô tả về thành tựu *:</label>
        <input
          type="text"
          className="px-3 py-3 bg-white border-2 border-slate-600 w-full"
          placeholder="Mô tả về thành tựu"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <div className="flex justify-end my-2">
        <button
          className="w-20 mx-2 rounded bg-red-400 text-white p-2.5 items-center pointer border-[1px]  border-grey-200 hover:bg-red-500"
          onClick={() => {
            setTitle(props.data.title);
            setRole(props.data.role);
            setDescription(props.data.description);
            props.changeEdit(false);
          }}
        >
          Hủy
        </button>
        <button
          className="w-20 mx-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-[1px]  border-grey-200 hover:bg-green-500"
          onClick={handleCreateAchievement}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default ArchievementForm;

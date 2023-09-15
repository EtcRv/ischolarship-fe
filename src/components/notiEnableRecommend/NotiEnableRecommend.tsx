import { warning } from "src/assets";

const NotiEnableRecommend = () => {
  return (
    <div className="flex-col justify-center items-center w-[450px] bg-white p-2.5">
      <img src={warning} className="mx-auto my-2" />
      <p className="text-base text-center ">
        Xin hãy bật chức năng gợi ý học bổng
      </p>
    </div>
  );
};

export default NotiEnableRecommend;

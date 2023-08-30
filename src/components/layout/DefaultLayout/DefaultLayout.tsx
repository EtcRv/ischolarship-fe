import DefaultLayoutHeader from "./Header/DefaultLayoutHeader";

const DefaultLayout = ({ children }: any) => {
  return (
    <div className="w-full h-full bg-[#f5f5f5] flex-col justify-center items-center">
      <DefaultLayoutHeader />

      <div className="h-full w-full ">{children}</div>
    </div>
  );
};

export default DefaultLayout;

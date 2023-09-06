import DefaultLayout from "src/components/layout/DefaultLayout/DefaultLayout";
import { scholarship1 } from "src/assets";
import { Scholarship, ScholarshipType, DegreeType } from "src/models";
import { useNavigate } from "react-router-dom";

const dummyScholarshipDetail: Scholarship = {
  id: "1",
  name: "Chương trình học bổng Nữ sinh Công nghệ BOSCH năm 2023",
  image: scholarship1,
  organization: "Công Ty TNHH Bosch Global Software Technologies",
  location: "HUST",
  deadline: "20/07/2023",
  type: ScholarshipType.ORGANIZATIONS,
  value: "Từ 11 triệu - 3 triệu đồng/suất",
  level: DegreeType.COLLEGE,
  field: "Kỹ thuật máy tính, Điện từ - viễn thông, Vật lý kỹ thuật.",
  link: "https://sv-ctt.hust.edu.vn/#/hoc-bong/100/chi-tiet",
  requirement: {
    score: {
      CPA: 3.0,
    },
    competitions: true,
    experience: true,
    activities: "Điểm rèn luyện kì 2022.1 từ 65/100 trở lên",
  },
  description: `
    Căn cứ Thỏa thuận tài trợ học bổng giữa Chi nhánh Công Ty TNHH Bosch Global Software Technologies tại Hà Nội và Đại học Bách khoa Hà Nội về việc triển khai chương trình học bổng Nữ sinh Công nghệ BOSCH năm 2023; Nhà trường xin thông báo Chương trình học bổng với các nội dung sau:

Đối tượng xét chọn:
Nữ sinh viên các khóa K64, 65, 66 các ngành: Kỹ thuật máy tính, Điện từ - viễn thông, Vật lý kỹ thuật.

- Kết quả học tập CPA từ 3.0/4 trở lên.

- Điểm rèn luyện kì 2022.1 từ 65/100 trở lên.

- Không xét học bổng đối với các sinh viên đã nhận được học bổng tài trợ doanh nghiệp trong năm học 2022-2023.

Giá trị và số lượng học bổng: 
- Giải nhất: 11,000,00 VND – Số lượng: 1 suất

- Giải nhì: 9,000,000 VND – Số lượng: 2 suất

- Giải ba: 6,000,000 VND – Số lượng: 2 suất

- Giải khuyến khích: 3,000,000 VND – Số lượng: 3 suất.

Sinh viên đăng ký học bổng theo các bước sau:
- Bước 1: Sinh viên đăng ký online tại đây trước ngày 20/07/2023. Sinh viên điền thông tin theo yêu cầu và tải lên các minh chứng về việc tham gia thực hiện đề tài NCKH hoặc hoạt động ngoại khóa (chụp ảnh chứng nhận và tập hợp thành 1 file pdf).

- Bước 2: Sau khi Nhà trường thông báo kết quả sơ loại, những sinh viên đủ điều kiện sẽ nộp hồ sơ bản cứng. 

Hồ sơ bản cứng gồm:
- Đơn xin cấp học bổng (in ra từ hệ thống, không cần xin xác nhận của địa phương trừ khi thuộc diện hoàn cảnh gia đình khó khăn).

- Bảng điểm CPA đến hết kì 2022.1 có xác nhận của Phòng ĐT hoặc Viện chuyên ngành.

- Bằng chứng về việc tham gia thực hiện đề tài Nghiên cứu khoa học (nếu có).

- Bằng chứng về việc tham gia các hoạt động ngoại khóa (nếu có)
    `,
};

const ScholarshipDetailPage = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="flex px-20 justify-evenly my-10">
        <div className="flex-col bg-white border-2 border-grey-200 drop-shadow-md shadow-stone-100 p-2.5 w-96 h-fit">
          <img
            src={dummyScholarshipDetail.image}
            className="mx-auto my-2"
          ></img>
          <div className="flex mx-auto text-[25px] text-green-400 my-2 justify-center">
            <span>
              {dummyScholarshipDetail.type === ScholarshipType.ORGANIZATIONS
                ? "Học bổng doanh nghiệp"
                : "Học bổng trường"}
            </span>
          </div>
          <div className="flex w-full">
            <span className="font-bold w-32">Giá trị:</span>
            <span>{dummyScholarshipDetail.value}</span>
          </div>
          <div className="flex w-full">
            <span className="font-bold w-32">Mô tả:</span>
            <span>{dummyScholarshipDetail.level}</span>
          </div>
          <div className="flex w-full">
            <span className="font-bold w-32">Hạn đăng ký:</span>
            <span>{dummyScholarshipDetail.deadline}</span>
          </div>
          <div className="w-full justify-end flex my-4">
            <button
              className="flex mt-2 rounded bg-green-400 text-white p-2.5 items-center pointer border-grey-200 hover:bg-green-500"
              onClick={() =>
                (window.location.href = dummyScholarshipDetail.link)
              }
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
        <div className="w-8/12 text-center border-2 border-slate-200 bg-white">
          <div className="border-2 border-l-0 border-t-0 border-r-0 py-6 border-slate-200">
            <div className="font-bold text-lg text-green-500 ">
              {dummyScholarshipDetail.name}
            </div>
          </div>
          <div className="whitespace-pre-line text-start px-10">
            {dummyScholarshipDetail.description}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ScholarshipDetailPage;

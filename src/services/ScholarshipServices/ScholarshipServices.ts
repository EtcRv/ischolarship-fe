import API from "../Api";

const ScholarshipServices = {
  getAllScholar() {
    return API().get("/api/get_all_scholarship");
  },
  getAllScholarByPage(pageNumber: number) {
    return API().get(`/api/get_scholarship/${pageNumber}`);
  },
  getScholarshipInformation(scholarshipId: string) {
    return API().get(`/api/get_scholarship_info/${scholarshipId}`);
  },
  getAllScholarshipType() {
    return API().get("/api/get_all_type");
  },
  getAllScholarshipEducationLevel() {
    return API().get("/api/get_all_educationlevel");
  },
};

export default ScholarshipServices;

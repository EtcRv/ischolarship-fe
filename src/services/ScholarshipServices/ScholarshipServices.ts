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
  getRecommendation(data: any) {
    return API().post('/api/get_recommendation', {...data})
  },
  updateScholarshipInfo(scholarshipId: string ,data: any) {
    return API().put('/api/update_scholarship_info', {...data}, {
      params: {
        scholarship_id: scholarshipId
      }
    })
  }
};

export default ScholarshipServices;

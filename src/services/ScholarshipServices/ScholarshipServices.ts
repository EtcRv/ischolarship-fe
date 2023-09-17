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
  },
  getScholarshipDataFromUrl(url: string, type: string) {
    return API().get(`/api/task5(${type})/${url}`);
  },
  getRecommendationByUser(token: string) {
    const headers = { authorization: token };
    return API().get('/api/recommend',{
      headers,
      params: {
        model: "BPR",
        type_model: "general",
        k: 10,
        method: "BM25",
      }
    })
  }
};

export default ScholarshipServices;

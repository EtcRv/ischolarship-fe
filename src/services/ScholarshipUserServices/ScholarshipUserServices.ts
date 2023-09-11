import API from "../Api";

const ScholarshipUserServices = {
   getAllShortlist(userId: string) {
    return API().get(`/api/get_all_shortlist/${userId}`)
   },
   
}

export default ScholarshipUserServices;
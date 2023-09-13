import API from "../Api";

const ScholarshipUserServices = {
   getAllShortlist(token: string) {
      const headers = { authorization: token};
    return API().get(`/api/get_all_shortlist`, {headers})
   },
   addToShortlist(token: string,scholarshipID: string, data: any) {
      const headers = { authorization: token};
      return API().post(`/api/user_save_scholarship`,data, {
         params: {
         scholarship_id: scholarshipID
         },
         headers }
      )
   },
   deleteFromShortlist(token: string, scholarshipID: string) {
      const headers = { authorization: token};
      return API().delete('/api/user_delete_scholarship', {
         params: {
            scholarship_id:scholarshipID
         },
         headers
      })
   },
   updateScholarshipInShortlist(token: string, scholarshipID: string, data: any) {
      const headers = { authorization: token};
      return API().put('/api/user_update_saved_scholarship',data, {
         params: {
            scholarship_id: scholarshipID
         },
         headers
      })
   },
   discardFromShortlist(token: string, scholarshipID: string, data: any) {
      const headers = { authorization: token};

      return API().post('/api/user_discard_scholarship',data, {
         params: {
            scholarship_id: scholarshipID
         },
         headers
      })
   }
   
}

export default ScholarshipUserServices;
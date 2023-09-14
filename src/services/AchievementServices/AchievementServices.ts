import API from "../Api";

const AchievementServices = {
  createAchievement(token: string, data: any) {
    const headers = { authorization: `${token}` };
    return API().post("/api/create_achievement", { ...data }, { headers });
  },
  getAllAchievement(token: string) {
    const headers = { authorization: token };
    return API().get(`/api/get_all_achievement`, { headers });
  },
  updateAchievement(token: string, data: any) {
    const headers = { authorization: token };
    return API().put("/api/update_achievement", { ...data }, { headers });
  },
  deleteAchievement(token: string, data: any) {
    const headers = { authorization: token };
    return API().delete("/api/delete_achievement", {
      params: { ...data },
      headers,
    });
  },
};

export default AchievementServices;

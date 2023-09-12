import API from "../Api";

const AchievementServices = {
    createAchievement(userId: string, data: any) {
        return API().post('/api/create_achievement', {user_id: userId, achievement: data})
    },
    getAllAchievement(userId: string) {
        return API().get(`/api/get_all_achievement/${userId}`)
    },
    
}

export default AchievementServices
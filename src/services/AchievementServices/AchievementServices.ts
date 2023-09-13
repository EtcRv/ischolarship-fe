import API from "../Api";

const AchievementServices = {
    createAchievement(token: string, data: any) {
        const headers = { authorization: `${token}` };
        return API().post('/api/create_achievement', {
            data
        }, {headers})
    },
    getAllAchievement(token: string) {
        const headers = { authorization: token};
        return API().get(`/api/get_all_achievement`, {headers})
    },
    deleteAchievement(token: string, achievement_id: string) {
        const headers = { authorization: token};

        return API().delete('/api/delete_achievement',{headers} )
    }

    
}

export default AchievementServices
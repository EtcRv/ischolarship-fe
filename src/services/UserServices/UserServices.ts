import API from "../Api";

const UserServices = {
    getUserInfo(token: string){
        const headers = { authorization: token};
        return API().get('/api/get_user_info',{headers})
    },
    updateUserInfo(token: string, data: any) {
        const headers = { authorization: token};
        return API().put('/api/update_user_info', {data}, {headers})
    }
}

export default UserServices;
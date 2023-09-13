import API from "../Api";

const UserServices = {
    getUserInfo(token: string){
        const headers = { authorization: token};

        return API().get('/api/get_user_info',{headers})
    }
}

export default UserServices;
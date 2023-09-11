import API from "../Api";

const AuthenticationServices = {
    register(data:any) {
        return API().post('/api/register', data);
    },
    login(data: any) {
        return API().post('/api/login', data);
    },
    loginGoogle(data: any) {
        return API().post('/api/login-google', data)
    }

}

export default AuthenticationServices;
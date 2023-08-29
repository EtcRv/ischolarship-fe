import AuthenticationHeader from "./AuthenticationHeader/AuthenticationHeader"

const AuthenticationLayout = ({children}: any) => {
    return (
        <div className="w-full h-screen bg-white flex-col justify-center items-center ">
            <AuthenticationHeader></AuthenticationHeader>
            <div className="h-4/5 justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default AuthenticationLayout
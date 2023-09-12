import { Divider, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { formItemLayout } from "../../utils";
import { auth, provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthenticationLayout from "src/components/layout/AuthenticationLayout/AuthenticationLayout";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { updateLoginStatus, updateUser } from "src/store/userSlice";
import { useCallback, useState } from "react";
import AuthenticationServices from "src/services/AuthenticationServices/AuthenticationServices";
import SuccessMessage from "src/components/successMessage/SuccessMessage";
import "./LoginPage.css";
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const wrapperColLogin = useCallback(() => {
    const data = formItemLayout;
    data.wrapperCol.xs.span = 24;
    return data;
  }, [formItemLayout]);

  const onFinish = async (values: any) => {
    try {
      console.log(values.email, values.password);
      const res = await AuthenticationServices.login({
        email: values.email,
        password: values.password,
      });

      dispatch(updateLoginStatus());
      dispatch(
        updateUser({
          user: {
            user_id: res.data.user.id,
            user_name: res.data.user.user_name,
            gender: "Male",
            dob: new Date("2023-05-08"),
            nationality: "Vietnam",
            location: "Vietnam",
            phone: "123456",
            email: res.data.user.email,
          },
        }),
      );
      console.log("res: ", res);
      SuccessMessage("Success", "Login successfull");
      navigate("/");
    } catch (err: any) {
      setError(err.response.data.detail);
      console.log("err: ", err);
    }
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        console.log("token:", token);
        // The signed-in user info.
        const user = result.user;
        console.log("user:", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <AuthenticationLayout>
      <div className="justify-center items-center flex">
        <div className="bg-white px-3 pt-9 rounded-lg drop-shadow-md shadow-stone-100 max-w-md">
          <div style={{ padding: "10px" }}>
            <div className="mb-8">
              <p
                style={{ color: "#333", fontSize: "48px", fontWeight: "bold" }}
              >
                Login
              </p>
            </div>
            <Form {...wrapperColLogin} onFinish={onFinish} form={form}>
              <Form.Item
                className="mb-6"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
                name="email"
              >
                <Input className="text-base" placeholder="Email" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                name="password"
              >
                <Input.Password className="text-base " placeholder="Password" />
              </Form.Item>
              <div className="my-2 flex justify-center">
                {error.length > 0 && (
                  <span className="text-red-600">{error}</span>
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button className="rounded-lg  bg-sky-500 px-[20px] py-3 pointer w-full text-white text-base">
                  Login
                </button>
              </div>
            </Form>
            <Divider
              style={{
                color: "#333",
                fontSize: "14px",
              }}
            >
              Or
            </Divider>
            <div>
              <button
                onClick={loginWithGoogle}
                className="rounded-lg border-[1px] bg-white py-2 pointer border-grey-200 flex w-full flex justify-center"
              >
                <FcGoogle className="w-6 h-6 mr-4"></FcGoogle>
                Google
              </button>
            </div>
            <div className="flex items-center mt-8">
              <p style={{ color: "#333", fontSize: "12px" }} className="pe-4">
                Don't have a IScholarship account?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/register")}
                  className="rounded-lg border-[1px] bg-white px-5 py-2 pointer border-grey-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;

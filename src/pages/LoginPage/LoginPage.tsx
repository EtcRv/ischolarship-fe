import { Col, Divider, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { formItemLayout } from "../../utils";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import AuthenticationLayout from "src/components/layout/AuthenticationLayout/AuthenticationLayout";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      console.log("res: ", res);
    } catch (err) {
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
      <div className="h-full justify-center items-center flex">
        <div className="bg-white px-[10px] py-[30px] rounded-lg drop-shadow-md shadow-stone-100 max-w-md">
          <div style={{ padding: "10px" }}>
            <Form {...formItemLayout} onFinish={onFinish} form={form}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label={"Email"}
                labelAlign="left"
                name="email"
              >
                <Input placeholder="Please input email" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                label={"Password"}
                labelAlign="left"
                name="password"
              >
                <Input.Password placeholder="Please input password" />
              </Form.Item>
              <div className="flex justify-center">
                <button className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200">
                  Login
                </button>
              </div>
            </Form>
            <Divider style={{ color: "grey", fontSize: "14px" }}>
              Log in to your account with one of these services.
            </Divider>
            <div className="flex justify-center">
              <button
                onClick={loginWithGoogle}
                className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200 flex"
              >
                <FcGoogle className="w-6 h-6 mr-4"></FcGoogle>
                Google
              </button>
            </div>
            <Divider style={{ color: "grey", fontSize: "14px" }}>
              Don't have a IScholarship account?
            </Divider>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;

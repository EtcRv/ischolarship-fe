import { Col, Divider, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { formItemLayout, REGEX } from "../../utils";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthenticationLayout from "../../components/layout/AuthenticationLayout/AuthenticationLayout";
import AuthenticationServices from "src/services/AuthenticationServices/AuthenticationServices";
import { useState } from "react";
import SuccessMessage from "src/components/successMessage/SuccessMessage";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    try {
      // await createUserWithEmailAndPassword(
      //   auth,
      //   values.email,
      //   values.password,
      // );

      const res = await AuthenticationServices.register({
        user_name: values.name,
        email: values.email,
        password: values.password,
      });

      SuccessMessage("Success", "Register successfull");
      navigate("/login");
    } catch (err: any) {
      console.log("err: ", err.response);
      setError(err.response.data.detail);
    }
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
                label={"User name"}
                labelAlign="left"
                name="name"
              >
                <Input placeholder="Please input user name" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        let regex_email = new RegExp(REGEX.REGEX_EMAIL);
                        if (regex_email.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error("Please enter a valid email!"),
                          );
                        }
                      } else {
                        return Promise.reject(
                          new Error("Please input your email!"),
                        );
                      }
                    },
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
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!",
                      );
                    },
                  }),
                ]}
                label={"Confirm password"}
                labelAlign="left"
                name="confirm_password"
              >
                <Input.Password placeholder="Please input password" />
              </Form.Item>
              <div className="my-2 flex justify-center">
                {error.length > 0 && (
                  <span className="text-red-600">{error}</span>
                )}
              </div>
              <div className="flex justify-center">
                <button className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200">
                  Register
                </button>
              </div>
            </Form>
            <Divider style={{ color: "grey", fontSize: "14px" }}>
              Already have a IScholarship account?
            </Divider>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg border-[1px] bg-white px-[20px] py-2 pointer border-grey-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterPage;

import { useState, useCallback } from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { formItemLayout, REGEX } from "../../utils";
import AuthenticationLayout from "../../components/layout/AuthenticationLayout/AuthenticationLayout";
import AuthenticationServices from "src/services/AuthenticationServices/AuthenticationServices";
import SuccessMessage from "src/components/successMessage/SuccessMessage";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const wrapperColLogin = useCallback(() => {
    const data = formItemLayout;
    data.wrapperCol.xs.span = 24;
    return data;
  }, []);

  const onFinish = async (values: any) => {
    try {
      await AuthenticationServices.register({
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
        <div className="bg-white px-3 pt-9 rounded-lg drop-shadow-md shadow-stone-100 max-w-md">
          <div style={{ padding: "10px" }}>
            <div className="mb-8">
              <p
                style={{ color: "#333", fontSize: "48px", fontWeight: "bold" }}
              >
                Register
              </p>
            </div>
            <Form {...wrapperColLogin} onFinish={onFinish} form={form}>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
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
                <button className="rounded-lg  bg-sky-500 px-[20px] py-3 pointer w-full text-white text-base">
                  Register
                </button>
              </div>
            </Form>
            <div className="flex items-center mt-8">
              <p style={{ color: "#333", fontSize: "12px" }} className="pe-6">
                Already have a IScholarship account?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-lg border-[1px] bg-white px-5 py-2 pointer border-grey-200"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterPage;

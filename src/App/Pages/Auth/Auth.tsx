import s from "./Auth.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useCheckUserAuthQuery } from "../../Api";
import { UsersType } from "../../Api/types";

export const Auth = () => {
  const { data: checkUsersAuth = [] } = useCheckUserAuthQuery({});
  const onFinishFailed = (errorInfo: string) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values: UsersType) => {
    if (
      checkUsersAuth.map((item) => item.nickname).includes(values.username) &&
      checkUsersAuth.map((item) => item.password).includes(values.password)// тут всегда тру
    ) {
      console.log("Successful: user is detected");
    } else {
      onFinishFailed("user not detected");
    }
  };
  return (
    <div className={s.wrapper}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: false,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <br />
          Or <Link to="registration"> register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};


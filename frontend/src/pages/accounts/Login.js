import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useAppContext, setToken } from 'Store';

export default function Login() {
    const { dispatch } = useAppContext();
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    // const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', ''); // key, initialvalue
    const onFinish = values => {
        async function axios() {
            const { username, password } = values;
            setFieldErrors({});
            const data = { username, password };
            try {
                const response = await Axios.post('http://localhost:8000/accounts/token/', data);
                const { data: { token: jwtToken } } = response;
                dispatch(setToken(jwtToken));
                //const jwtToken = response.data.token
                //const {data : token} = response; <=> const token = response.data;
                //const {data:{token}} = response; <=> const token = response.data.token;
                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                })
                //history.push('/accounts/login/');
            }
            catch (error) {
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디나 암호를 확인해주세요",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    })
                    const { data: fieldsErrorMessages } = error.response;
                    console.log(error.response);
                    // fieldsErrorMessages => {username: "m1 m2", password:[]}
                    //python dict.items()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                //errors :["m1", "m2"].join(" ")=> "m1" "m2"
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                                }
                                console.log(acc);
                                return acc;
                            }, {})
                    )
                }
            }

        }
        axios();
    }
    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' },
                    { min: 5, message: '5글자 이상 입력해주세요.' }
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

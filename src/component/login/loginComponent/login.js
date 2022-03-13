import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
// import Notification from '../../../comon/notification';
import { AuthContext } from '../../../contexts/AuthCtrolAll';
import CreateNotification from '../../notification/notification';
// import ReactNotification from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
// import { store } from 'react-notifications-component';
// import 'animate.min.css';


export default function LoginPage() {
    const initialValue = {
        useName: '',
        passWord: '',
        confirmPass: ''
    }

    const history = useHistory()
    // const userLogin = useSelector((state) => state.user)
    // console.log(userLogin, 'userLogin');
    // const dispatch = useDispatch()
    const { login, register } = useContext(AuthContext)
    // const { register } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState()
    const [registerForm, setRegisterForm] = useState(initialValue)
    const { useName, passWord, confirmPass } = registerForm

    const handleLogin = (field, value) => setLoginForm({
        ...loginForm,
        [field]: value
    })

    // console.log(loginForm, 566);
    const handleRegis = (field, value) => setRegisterForm({
        ...registerForm,
        [field]: value
    })

    const handleRegister = async () => {
        if (passWord !== confirmPass) {
            CreateNotification.error('Tài khoản hoặc mật khẩu không đúng')
            // setTimeout(() => history.push('/login'), 2000)
            return
        }
        try {
            const registerData = await register(registerForm)
            // console.log(registerData, 7778877);
            if (!registerData.success) {
                CreateNotification.error('Đăng ký thất bại')

                return



            } else {
                CreateNotification.success('Đăng ký thành công')


            }
            setTimeout(() => history.push('/login'), 2000)
        } catch (error) {
            console.log(error);
        }

    }
    // const handleSubmitLogin = async () => {
    //     console.log('ok');

    //     // try {

    //     //     // dispatch(loginData)
    //     //     // if (loginData.success) {
    //     //     //     CreateNotification.success('Đăng nhập thành công', 'Đang chuyển hướng đến trang chủ')

    //     //     //     setTimeout(() => window.location.href = "/", 2000)



    //     //     // } else {
    //     //     //     // createNotification('Error')
    //     //     //     CreateNotification.error('Đăng nhập thất bại', 'vui lòng kiểm tra lại tài khoản hoặc mật khẩu')

    //     //     // }
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }

    // }

    const handleSubmitLogin = async () => {

        try {
            const loginData = await login(loginForm)
            if (loginData.success) {
                CreateNotification.success('Đăng nhập thành công', 'Đang chuyển hướng đến trang chủ')

                setTimeout(() => window.location.href = "/", 2000)



            } else {
                // createNotification('Error')
                CreateNotification.error('Đăng nhập thất bại', 'vui lòng kiểm tra lại tài khoản hoặc mật khẩu')

            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>

            <section id="form">
                {/* <ReactNotification /> */}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1">
                            <div className="login-form">
                                <h2>Đăng nhập vào Eshop</h2>
                                <Form >
                                    <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
                                        <Form.Label>Tài khoản</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập tài khoản" onChange={(e) => handleLogin('userName', e.target.value)} />

                                    </Form.Group>

                                    <Form.Group className="mb-3 " controlId="formBasicPassword">
                                        <Form.Label>mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" onChange={(e) => handleLogin('passWord', e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSubmitLogin}>
                                        Đăng nhập
                                    </Button>
                                </Form>

                            </div>
                        </div>
                        <div className="col-sm-1">
                            <h2 className="or">Hoặc</h2>
                        </div>
                        <div className="col-sm-4">
                            <div className="signup-form">
                                <h2>Bạn chưa có tài khoản!</h2>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Tên tài khoản</Form.Label>
                                        <Form.Control type="text" placeholder="Tạo tài khoản" onChange={(e) => handleRegis('userName', e.target.value)} />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Tạo mật khẩu" onChange={(e) => handleRegis('passWord', e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Xác nhận mật khẩu" onChange={(e) => handleRegis('confirmPass', e.target.value)} />
                                    </Form.Group>

                                    <Button variant="primary" onClick={handleRegister}>
                                        Đăng ký
                                    </Button>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

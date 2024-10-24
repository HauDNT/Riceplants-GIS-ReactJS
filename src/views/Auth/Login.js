import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveObjectDataToLocalStorage } from '../../utils/LocalStorage';
import axiosInstance from '../../common/AxiosInstance';
import backgroundImg from '../../assets/images/wave.png';
import backgroundElement from '../../assets/images/element.png';
import avatarIcon from '../../assets/images/avatar.png';

function Login() {
    let navigator = useNavigate();

    const initValues = {
        username: '',
        password: '',
    };

    const validSchema = Yup.object().shape({
        username: Yup
            .string()
            .min(5, 'Tên tài khoản phải có ít nhất 5 ký tự')
            .max(50, 'Tên tài khoản phải tối đa 50 ký tự')
            .required('Bạn phải nhập vào tên tài khoản!'),
        password: Yup
            .string()
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự!')
            .max(16, 'Mật khẩu phải có tối đa 16 ký tự!')
            .required('Bạn phải nhập vào mật khẩu!'),
    });

    const handleLogin = async (data) => {
        if (!data || !data.username || !data.password) {
            toast.error('Bạn phải điền đầy đủ thông tin đăng nhập');
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/login', data);
            
            if (response.data.accessToken) {
                // Save data to local storage
                saveObjectDataToLocalStorage(response.data);
                navigator('/dashboard');
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại!");
        }
    };

    // Apply JS for login form
    useEffect(() => {
        const inputs = document.querySelectorAll('input');

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add('focus');
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === '') {
                parent.classList.remove('focus');
            }
        }

        inputs.forEach((input) => {
            input.addEventListener('focus', addcl);
            input.addEventListener('blur', remcl);
        });

        // Cleanup function to remove event listeners
        return () => {
            inputs.forEach((input) => {
                input.removeEventListener('focus', addcl);
                input.removeEventListener('blur', remcl);
            });
        };
    }, []);

    return (
        <div className="login-page">
            <img class="wave" src={backgroundImg} alt='' />
            <div class="container">
                <div class="img">
                    <img src={backgroundElement} alt='' />
                </div>
                <div class="login-content">
                    <Formik
                        initialValues={initValues}
                        validationSchema={validSchema}
                        onSubmit={handleLogin}
                    >
                            <Form>
                                <img src={avatarIcon} className="mb-3" alt='avatar icon' />
                                <h3 class="title mb-3">Hệ thống quản lý kho lúa</h3>

                                <div className="input-div one">
                                    <div class="i">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="div mt-3">
                                        <h5>Tài khoản</h5>
                                        <Field
                                            className="input"
                                            autoComplete="off"
                                            id="loginFormInput"
                                            name="username"
                                        />
                                    </div>
                                </div>

                                <div className='error-message'>
                                    <ErrorMessage name="username" component="span" />
                                </div>

                                <div class="input-div pass">
                                    <div class="i">
                                        <i class="fas fa-lock"></i>
                                    </div>
                                    <div class="div">
                                        <h5>Mật khẩu</h5>
                                        <Field
                                            className="input"
                                            autoComplete="off"
                                            id="loginFormInput"
                                            name="password"
                                        />
                                    </div>
                                </div>

                                <div className='error-message'>
                                    <ErrorMessage name="password" component="span" />
                                </div>

                                <button className="btn-login" type="submit">
                                    Đăng nhập
                                </button>
                            </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
import React, { useContext, useState,useEffect } from 'react';

import Cookies from "js-cookie"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { MediaContext } from '../context/MediaContext';




const LoginForm = () => {
    const { loginData, setLoginData, error, isSubmitting, loginUser } = useContext(MediaContext);
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(2, 'Username must be at least 2 characters long'),
        password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 6 characters long'),
    });

    // Initial form values
    const initialValues = {
        username: loginData.username,
        password: loginData.password,
    };


    
    // Form submission handler
    const handleSubmit = async (values) => {
        console.log('Form data:', values);
        setLoginData(values);
        await loginUser(values, navigate);
    };



  // Check if the user is already authenticated
  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      // If authenticated, redirect to the home page
      navigate('/');
    }
  }, [navigate]);
  

    

    return (
        <div className="flex  bg-custom-gradient justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 space-y-3 bg-form-gradient rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 ">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

                            <div>
                                <span className="text-black text-sm underline hover:cursor-pointer mr-5">Don't have an account <span onClick={() => navigate("/register")} className="text-blue-900 font-bold text-md">Sign up</span></span>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-[150px] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;

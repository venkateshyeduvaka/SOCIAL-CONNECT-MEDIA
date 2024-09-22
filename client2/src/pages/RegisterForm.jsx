import React, { useContext, useState,useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from "js-cookie"
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { MediaContext } from '../context/MediaContext';


const RegisterForm = () => {
  const navigate = useNavigate();




  const { registerUser, error, isSubmitting } = useContext(MediaContext);

 ///const [error,seterror]=useState(false)
 

  // Validation schema using Yup
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters long'),
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters long'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    gender: Yup.string()
      .required('Gender is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Initial form values
  const initialValues = {
    fullname: '',
    username: '',
    password: '',
    gender: '',
    email: '',
  };

  // Form submission handler
  const handleSubmit = (values, { setSubmitting }) => {
    registerUser(values, navigate, toast);
    setSubmitting(false);
  };


  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      // If authenticated, redirect to the home page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex bg-custom-gradient justify-center items-center h-screen">
      <div className="w-full h-[90vh] max-w-md p-8 space-y-3 bg-form-gradient rounded-lg shadow-md ">
        <h1 className="text-2xl font-bold mb-3 text-center">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-1">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Field
                  type="text"
                  name="fullname"
                  className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none "
                />
                <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm " />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-1 py-1  border rounded-md shadow-sm focus:outline-none"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm " />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm " />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-1 py-1 border rounded-md shadow-sm focus:outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm " />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <span className="text-black text-sm underline hover:cursor-pointer mr-5">
                  Already have an account? <span onClick={() => navigate("/login")} className='text-blue-900 font-bold text-md'>LogIn</span>
                </span>
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

export default RegisterForm;
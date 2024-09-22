import React, { useState, useRef, useContext } from 'react';
import Modal from 'react-modal';
import uploadImageToCloudinary from './uploadImageToCloudinary';
import { RxCross2 } from "react-icons/rx";
import { MediaContext } from '../context/MediaContext';

const ProfileModal = ({ modalOpened, setModalOpened }) => {
  const { updateUserDetails, user } = useContext(MediaContext);

  const profileimageRef = useRef();
  const coverimageRef = useRef();

  const [formValues, setFormValues] = useState({
    fullname: "", 
    username: "", 
    password: "", 
    gender: "", 
    email: "", 
    cover_pic: "", 
    profile_pic: ""
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.fullname) {
      errors.fullname = 'Full Name is required';
    }
    if (!values.username) {
      errors.username = 'User Name is required';
    }
    if (!values.gender) {
      errors.gender = 'Gender is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleUploadImage = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const cloudinaryImage = await uploadImageToCloudinary(file);
      if (cloudinaryImage && cloudinaryImage.url) {
        setFormValues(prevValues => ({
          ...prevValues,
          [fieldName]: cloudinaryImage.url
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const updateData = { ...formValues, _id: user?.user?._id };
        await updateUserDetails(updateData, user?.user?._id);
        setModalOpened(false);
      } catch (error) {
        console.error('Failed to update user details:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Modal
      isOpen={modalOpened}
      onRequestClose={() => setModalOpened(false)}
      className=""
      contentLabel="Profile Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '60%',
          height: '80%',
          margin: 'auto',
          top: '15%',
          left: '15%',
          position: 'absolute',
          borderRadius: '15px',
        },
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className='flex justify-between'>
          <h3 className='self-center text-lg text-gray-800 font-bold hover:cursor-pointer'>Your info</h3>
          <RxCross2 onClick={() => setModalOpened(false)} className='h-5 w-5 text-lg text-gray-800 font-bold' />
        </div>
        <div className='flex gap-2'>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formValues.fullname}
            onChange={handleChange}
            className="border-none outline-none bg-slate-200 rounded-lg p-2 flex-1"
          />
          {errors.fullname && <div className="text-red-500 text-sm mt-1">{errors.fullname}</div>}

          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formValues.username}
            onChange={handleChange}
            className="border-none outline-none bg-slate-200 rounded-lg p-2 flex-1"
          />
          {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
        </div>

        <div className='flex gap-2'>
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            className="border-none outline-none bg-slate-200 rounded-lg p-2 flex-1"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
        </div>

        <div className='flex gap-2'>
          <input
            type="text"
            name="email"
            placeholder="email@gmail.com"
            value={formValues.email}
            onChange={handleChange}
            className="border-none outline-none bg-slate-200 rounded-lg p-2 flex-1"
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border-none outline-none bg-slate-200 rounded-lg p-2 flex-1"
          />
          {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
        </div>

        <div className='flex gap-2'>
          <label className="flex flex-col items-start">
            Profile Image
            <input
              type="file"
              name="profile_pic"
              ref={profileimageRef}
              onChange={(e) => handleUploadImage(e, 'profile_pic')}
              className="mt-1"
            />
          </label>
          <label className="flex flex-col items-start">
            Cover Image
            <input
              type="file"
              name="cover_pic"
              ref={coverimageRef}
              onChange={(e) => handleUploadImage(e, 'cover_pic')}
              className="mt-1"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center bg-orange-500 justify-center text-white border-none rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-16 pl-8 pr-8 ml-3 self-end"
        >
          Update
        </button>

      </form>
    </Modal>
  );
};

export default ProfileModal;

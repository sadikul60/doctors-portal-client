import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const {register, handleSubmit, resetField, formState: {errors}} = useForm();
    
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    const [AddDoctorError, setAddDoctorError] = useState('');

    const navigate = useNavigate()

    const {data : specialties = [], isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async() => {
            const res = await fetch('https://doctors-portal-server-ten-zeta.vercel.app/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = data => {

        // upload image with imagebb
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData => {
            if(imageData.success){
                const image = imageData.data.url;

                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: image,
                }

                // save doctor information to the database
                fetch('https://doctors-portal-server-ten-zeta.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor),
                })
                .then(res => res.json())
                .then(data => {
                    toast.success('Doctor Uploaded successfully.');
                    navigate('/dashboard/manageDoctors')
                })
            }
        })
        
    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-4/12'>
            <h2 className='text-3xl'>Add A Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)} className='grid grid-cols-1 gap-4'>
                <div className="form-control">
                <p className='text-red-600'>{AddDoctorError}</p>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: "Name is required"})} placeholder="your name" className="input input-bordered" />
                    {errors.name && <p role="alert" className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: "Email is required"})} placeholder="email address" className="input input-bordered" />
                    {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-bordered w-full">
                        <option disabled selected>Please select a Specialty</option>
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                        
                    </select>
                </div>
                <div className="form-control">
                <p className='text-red-600'>{AddDoctorError}</p>
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("image", { required: "image is required"})} placeholder="Select photo" className="input input-bordered" />
                    {errors.image && <p role="alert" className='text-red-600'>{errors.image?.message}</p>}
                </div>
                <input className='btn btn-primary text-white font-bold mt-4' type="submit" value="Add Doctor" />
            </form>
        </div>
    );
};

export default AddDoctor;
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const SignUp = () => {
    const {register, handleSubmit} = useForm();
    const {createUser} = useContext(AuthContext);

    const handleSignUp = data => {

        const inputData = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        console.log(inputData);

        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(err => console.log(err.message));
    }
    return (
        <div className='h-[800px] justify-center flex items-center'>
            <div className='p-5 border rounded-xl w-9/12 md:w-1/2 lg:w-4/12 mx-auto'>
            <form onSubmit={handleSubmit(handleSignUp)} className='grid grid-cols-1 gap-5'>
                <h1 className='text-4xl text-center font-bold'>Sign Up</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true})} placeholder="your name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true})} placeholder="email address" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true})} placeholder="password" className="input input-bordered" />
                </div>
                <p className='font-bold'>Already have an account? please <Link to='/login' className='link link-hover text-red-600'>Login Now</Link></p>
                <input className='btn btn-primary text-white font-bold mt-4' type="submit" value="Sign Up" />
            </form>
            <div className="divider my-8"><span className='font-bold'>OR</span></div>
            <div><button className='btn btn-neutral text-white font-bold w-full'>Continue with Google</button></div>
            </div>
        </div>
    );
};

export default SignUp;
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/UseToken';

const SignUp = () => {
    const {register, handleSubmit, resetField, formState: {errors}} = useForm();
    const {createUser, updateUser, signInWithGoogle} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail);

    const navigate = useNavigate();

    if(token){
        navigate('/');
    }

    const googleProvider = new GoogleAuthProvider();

    

    const handleSignUp = data => {
 
        const inputData = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            setSignUpError('');
            toast.success('User Created successfully.');
            resetField('name');
            resetField('email');
            resetField('password');

            const profile = {
                displayName: data.name,
            }

            updateUser(profile)
            .then(() => {
                saveUser(data.name, data.email);
            })
            .catch(err => setSignUpError(err.message))
            
            // console.log(user);
        })
        .catch(err => setSignUpError(err.message));
    };

    // set user database (mongodb)
    const saveUser = (name, email) => {
        const user = {name, email};

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCreateUserEmail(email);
        })
    };



    // handle login with google
    const handleLoginWithGoogle = () => {
        signInWithGoogle(googleProvider)
        .then(result => {
            const user = result.user;
            toast.success('SignUp successfully.');
            const name = user?.displayName;
            const email = user?.email
            saveUser(name, email)
            navigate('/');
            console.log(user);
        })
        .catch(err => console.error(err.message))
    }
    return (
        <div className='h-[800px] justify-center flex items-center'>
            <div className='p-5 border rounded-xl w-9/12 md:w-1/2 lg:w-4/12 mx-auto'>
            <form onSubmit={handleSubmit(handleSignUp)} className='grid grid-cols-1 gap-4'>
                <h1 className='text-4xl text-center font-bold'>Sign Up</h1>
                <div className="form-control">
                <p className='text-red-600'>{signUpError}</p>
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
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: "Password is required"})} placeholder="password" className="input input-bordered" />
                    {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                </div>
                <input className='btn btn-primary text-white font-bold mt-4' type="submit" value="Sign Up" />
            </form>
            <p className='font-bold mt-3 text-center'>Already have an account? <Link to='/login' className='link link-hover text-red-600'>Login Now</Link></p>
            <div className="divider my-8"><span className='font-bold'>OR</span></div>
            <div><button onClick={handleLoginWithGoogle} className='btn btn-neutral text-white font-bold w-full'>Continue with Google</button></div>
            </div>
        </div>
    );
};

export default SignUp;
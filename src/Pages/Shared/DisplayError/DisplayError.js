import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const DisplayError = () => {
    const {LogOut} = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        LogOut()
        .then( () => {
            toast.success('Log Out successfully.');
            navigate('/');
        })
        .catch(err => toast.warn(err.message));
    }
    return (
        <div className='text-center mt-36'>
            <p className='text-red-500 text-2xl'>Something went wrong!!!</p>
            <p>{error.statusText || error.message}</p>
            <p className='text-3xl'>Please <button onClick={handleLogOut} className='btn btn-outline rounded-xl ml-4'>Log Out</button> and log back in</p>
        </div>
    );
};

export default DisplayError;
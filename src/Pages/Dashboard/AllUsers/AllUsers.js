import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await fetch('https://doctors-portal-server-ten-zeta.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = id =>{
        fetch(`https://doctors-portal-server-ten-zeta.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success('Make admin successful');
                refetch();
            }
            console.log(data)
        })
    }
    return (
        <div>
            <h1 className="text-3xl mb-5">All Users</h1>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      users.map((user, index) => <tr key={user._id}>
                          <th>{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Add Admin</button>}</td>
                          <td><button className='btn btn-xs btn-secondary'>Delete</button></td>
                        </tr>)
                  }
                </tbody>
              </table>
          </div>
        </div>
    );
};

export default AllUsers;
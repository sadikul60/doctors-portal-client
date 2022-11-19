import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    
    const closeModal = () => {
        setDeletingDoctor(null);
    }

    

    const {data: doctors = [], refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try{
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                });
                const data = await res.json();
                return data;
            }
            catch(error){

            }
        }
    });

    // handle delete doctor
    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`${doctor.name} deleted successfully.`)
            }
        })
    };

    return (
        <div>
            <h2 className='text-3xl'>Manage Doctors: {doctors.length}</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      doctors.map((doctor, index) => <tr key={doctor._id}>
                          <th>{index + 1}</th>
                          <th><img className='w-20 h-20 rounded-full' src={doctor.image} alt="" /></th>
                          <td>{doctor.name}</td>
                          <td>{doctor.email}</td>
                          <td>{doctor.specialty}</td>
                          <td>
                            <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmationModal" className="btn btn-xs btn-error">Delete</label>
                            </td>
                        </tr>)
                  }
                </tbody>
              </table>
          </div>
          {
            deletingDoctor && <ConfirmationModal
                title = {`Are you sure you want to delete?`}
                message = {`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                handleDeleteDoctor = {handleDeleteDoctor}
                modalData = {deletingDoctor}
                closeModal = {closeModal}
            ></ConfirmationModal>
          }
        </div>
    );
};

export default ManageDoctors;
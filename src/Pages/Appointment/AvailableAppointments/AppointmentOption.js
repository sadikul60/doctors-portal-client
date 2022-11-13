import React from "react";

const AppointmentOption = ({ appointments, setTreatment }) => {
  const { name, slots } = appointments;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body  text-center">
        <h2 className="text-2xl text-center text-primary font-bold">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
        <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
        <div className="card-actions justify-center">
          <label 
          disabled = {slots.length === 0}
          onClick={() => setTreatment(appointments)}
          htmlFor="booking-modal" className="btn btn-accent text-white mt-3">Book Appointment</label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;

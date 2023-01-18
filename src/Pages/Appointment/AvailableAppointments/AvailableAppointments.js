import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, 'PP');

  const {data: appointmentOptions = [], refetch, isLoading} = useQuery({
    queryKey: ['appointmentOptions', date],
    queryFn: async() => {
      const res = await fetch(`https://doctors-portal-server-ten-zeta.vercel.app/v2/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data;
    }
  });

  // spinner
  if(isLoading){
    return <Loading></Loading>
  }

 
  return (
    <section className="my-20">
      <div>
        <p className="text-primary text-center font-bold lg:text-xl">
          Available Appointments on {format(selectedDate, "PP")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {appointmentOptions.map((appointment) => (
          <AppointmentOption
            key={appointment._id}
            appointments={appointment}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
          refetch = {refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
